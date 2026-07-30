#!/usr/bin/env node
/**
 * Incremental translation: saves progress after EACH batch so timeouts don't lose work.
 * Usage: node scripts/translate-batch.mjs af ar de
 */
import { readFileSync, writeFileSync } from "fs";
import { GoogleGenAI } from "/home/runner/workspace/node_modules/.pnpm/@google+genai@2.13.0/node_modules/@google/genai/dist/index.mjs";

const LOCALES_DIR = "artifacts/lexigen/src/i18n/locales";
const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: { apiVersion: "", baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL },
});

const LANG_NAMES = {
  af:"Afrikaans",ar:"Arabic",de:"German",es:"Spanish",fa:"Persian",
  fr:"French",it:"Italian",ja:"Japanese",ms:"Malay",nl:"Dutch",
  pt:"Portuguese",ru:"Russian",tl:"Tagalog",vi:"Vietnamese",
  xh:"Xhosa",yue:"Cantonese",zh:"Simplified Chinese",zu:"Zulu",
};

function flatten(obj, pfx="") {
  const r={};
  for(const[k,v]of Object.entries(obj)){
    const key=pfx?`${pfx}.${k}`:k;
    if(v&&typeof v==="object"&&!Array.isArray(v))Object.assign(r,flatten(v,key));
    else r[key]=Array.isArray(v)?JSON.stringify(v):String(v??"");
  }
  return r;
}
function unflatten(flat){
  const r={};
  for(const[key,val]of Object.entries(flat)){
    const parts=key.split(".");let n=r;
    for(let i=0;i<parts.length-1;i++){if(!n[parts[i]])n[parts[i]]={};n=n[parts[i]];}
    try{n[parts[parts.length-1]]=JSON.parse(val);}catch{n[parts[parts.length-1]]=val;}
  }
  return r;
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function translateBatch(lang, langName, kvObj, attempt=1){
  const prompt=`Translate the values of this JSON from English to ${langName}. Return ONLY valid JSON with exactly these keys and translated values. Keep {{placeholders}} and emoji unchanged. No markdown fences.\n\n${JSON.stringify(kvObj,null,2)}`;
  try{
    const resp=await ai.models.generateContent({
      model:"gemini-3-flash-preview",
      contents:[{role:"user",parts:[{text:prompt}]}],
      config:{maxOutputTokens:8192,temperature:0.1},
    });
    const text=resp.text??"";
    const s=text.indexOf("{"),e=text.lastIndexOf("}");
    if(s<0||e<0)return{};
    try{return JSON.parse(text.slice(s,e+1));}catch{return{};}
  }catch(err){
    const msg=String(err?.message??err);
    if(attempt<=5&&(msg.includes("429")||msg.includes("503")||msg.includes("overload"))){
      await sleep(attempt*10000);
      return translateBatch(lang,langName,kvObj,attempt+1);
    }
    console.error(`  [${lang}] err(${attempt}): ${msg.slice(0,80)}`);
    return{};
  }
}

async function processLang(langCode){
  const langName=LANG_NAMES[langCode];
  if(!langName){console.error(`Unknown: ${langCode}`);return;}
  
  const en=JSON.parse(readFileSync(`${LOCALES_DIR}/en.json`,"utf8"));
  const enFlat=flatten(en);
  
  // Reload fresh each iteration to pick up inter-language progress
  const loc=JSON.parse(readFileSync(`${LOCALES_DIR}/${langCode}.json`,"utf8"));
  const locFlat=flatten(loc);
  
  const missing={};
  for(const k of Object.keys(enFlat))if(!(k in locFlat))missing[k]=enFlat[k];
  const keys=Object.keys(missing);
  if(!keys.length){console.log(`${langCode}: complete`);return;}
  console.log(`${langCode} (${langName}): ${keys.length} missing`);

  const BATCH=100;
  let merged={...locFlat};

  for(let i=0;i<keys.length;i+=BATCH){
    const chunk=keys.slice(i,i+BATCH);
    const obj=Object.fromEntries(chunk.map(k=>[k,missing[k]]));
    process.stdout.write(`  ${langCode} ${Math.floor(i/BATCH)+1}/${Math.ceil(keys.length/BATCH)}... `);
    
    const result=await translateBatch(langCode,langName,obj);
    let added=0;
    for(const[k,v]of Object.entries(result)){
      if(k in missing){merged[k]=v;added++;}
    }
    // English fallback for this batch's keys that didn't come back
    for(const k of chunk)if(!(k in merged))merged[k]=enFlat[k];
    console.log(`${added}/${chunk.length}`);
    
    // *** Save after every batch so timeouts don't lose work ***
    writeFileSync(`${LOCALES_DIR}/${langCode}.json`,JSON.stringify(unflatten(merged),null,2)+"\n");
  }
  
  // Final verification
  const final=JSON.parse(readFileSync(`${LOCALES_DIR}/${langCode}.json`,"utf8"));
  const finalFlat=flatten(final);
  const stillMissing=Object.keys(enFlat).filter(k=>!(k in finalFlat));
  console.log(`  ${langCode}: done. ${stillMissing.length} still missing (will be EN fallback)`);
}

const langs=process.argv.slice(2);
if(!langs.length){console.error("Usage: node translate-batch.mjs fa fr it ...");process.exit(1);}
for(const lang of langs)await processLang(lang);
console.log("All done.");
