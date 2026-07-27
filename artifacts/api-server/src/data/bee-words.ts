export interface BeeWord {
  word: string;
  pronunciation: string;
  origin: string;
  sentence: string;
}

export interface LevelConfig {
  displayName: string;
  wordCount: number;
  timeoutSec: number;
  words: BeeWord[];
}

export const BEE_LEVELS: Record<string, LevelConfig> = {
  beginner: {
    displayName: "Beginner",
    wordCount: 10,
    timeoutSec: 20,
    words: [
      { word: "light", pronunciation: "LYT", origin: "Old English: lēoht", sentence: "Please turn on the light." },
      { word: "dream", pronunciation: "DREEM", origin: "Old English: drēam", sentence: "I had a vivid dream last night." },
      { word: "storm", pronunciation: "STORM", origin: "Old English: storm", sentence: "A great storm hit the coast." },
      { word: "flame", pronunciation: "FLAYM", origin: "Old French: flamme", sentence: "The flame danced in the wind." },
      { word: "crisp", pronunciation: "KRISP", origin: "Latin: crispus", sentence: "The air was crisp on the winter morning." },
      { word: "brave", pronunciation: "BRAYV", origin: "Italian: bravo", sentence: "She was brave enough to speak first." },
      { word: "clock", pronunciation: "KLOK", origin: "Dutch: clocke", sentence: "The clock struck twelve at noon." },
      { word: "frost", pronunciation: "FROST", origin: "Old English: forst", sentence: "Frost covered the grass overnight." },
      { word: "globe", pronunciation: "GLOHB", origin: "Latin: globus", sentence: "They spun the globe to pick a country." },
      { word: "judge", pronunciation: "JUJ", origin: "Latin: judex", sentence: "The judge delivered the verdict." },
      { word: "kneel", pronunciation: "NEEL", origin: "Old English: cnēowan", sentence: "They asked her to kneel before the throne." },
      { word: "lemon", pronunciation: "LEM-un", origin: "Arabic: laymūn", sentence: "She squeezed a lemon over the salad." },
      { word: "march", pronunciation: "MARCH", origin: "Latin: Martius", sentence: "The soldiers began to march at dawn." },
      { word: "ocean", pronunciation: "OH-shun", origin: "Greek: ōkeanós", sentence: "The ocean stretched beyond the horizon." },
      { word: "peace", pronunciation: "PEES", origin: "Latin: pax", sentence: "The treaty brought peace to the region." },
      { word: "queen", pronunciation: "KWEEN", origin: "Old English: cwēn", sentence: "The queen addressed her people." },
      { word: "river", pronunciation: "RIV-er", origin: "Latin: ripa", sentence: "They crossed the river by boat." },
      { word: "smile", pronunciation: "SMY-ul", origin: "Scandinavian origin", sentence: "Her smile lit up the room." },
      { word: "tiger", pronunciation: "TY-ger", origin: "Greek: tígris", sentence: "The tiger padded silently through the jungle." },
      { word: "wheat", pronunciation: "WEET", origin: "Old English: hwǣte", sentence: "The fields of wheat swayed in the breeze." },
      { word: "yacht", pronunciation: "YOT", origin: "Dutch: jacht", sentence: "The yacht sailed into the harbour." },
      { word: "zebra", pronunciation: "ZEE-bruh", origin: "Italian: zebra", sentence: "The zebra grazed near the watering hole." },
      { word: "swift", pronunciation: "SWIFT", origin: "Old English: swift", sentence: "The swift bird dived towards the water." },
      { word: "prose", pronunciation: "PROHZ", origin: "Latin: prosa", sentence: "She wrote in beautiful, flowing prose." },
      { word: "valid", pronunciation: "VAL-id", origin: "Latin: validus", sentence: "The ticket was still valid for entry." },
    ],
  },

  lower_intermediate: {
    displayName: "Lower Intermediate",
    wordCount: 15,
    timeoutSec: 18,
    words: [
      { word: "absence", pronunciation: "AB-suns", origin: "Latin: absentia", sentence: "His absence from the meeting was noted." },
      { word: "balance", pronunciation: "BAL-uns", origin: "Latin: bilanx", sentence: "She struggled to maintain her balance on the beam." },
      { word: "captain", pronunciation: "KAP-tin", origin: "Latin: caput (head)", sentence: "The captain steered the ship through the storm." },
      { word: "courage", pronunciation: "KUR-ij", origin: "Old French: corage", sentence: "It takes courage to stand up for what is right." },
      { word: "declare", pronunciation: "dih-KLAIR", origin: "Latin: declarare", sentence: "She stood up to declare her decision." },
      { word: "earnest", pronunciation: "UR-nist", origin: "Old English: eornost", sentence: "He made an earnest effort to improve." },
      { word: "fashion", pronunciation: "FASH-un", origin: "Latin: factio", sentence: "She followed the latest fashion trends." },
      { word: "harvest", pronunciation: "HAR-vust", origin: "Old English: hærfest", sentence: "The harvest was plentiful after the rains." },
      { word: "improve", pronunciation: "im-PROOV", origin: "Latin: improbare", sentence: "Practice every day to improve your skills." },
      { word: "justice", pronunciation: "JUS-tis", origin: "Latin: justitia", sentence: "They fought for justice in the courts." },
      { word: "kingdom", pronunciation: "KING-dum", origin: "Old English: cyningdōm", sentence: "The kingdom prospered under wise leadership." },
      { word: "lantern", pronunciation: "LAN-turn", origin: "Greek: lampter", sentence: "He carried a lantern through the dark cave." },
      { word: "mention", pronunciation: "MEN-shun", origin: "Latin: mentio", sentence: "Did you mention the meeting to everyone?" },
      { word: "natural", pronunciation: "NACH-ur-ul", origin: "Latin: naturalis", sentence: "She has a natural talent for music." },
      { word: "organic", pronunciation: "or-GAN-ik", origin: "Greek: organikos", sentence: "They buy organic vegetables from the market." },
      { word: "pattern", pronunciation: "PAT-urn", origin: "Latin: patronus", sentence: "The wallpaper had a floral pattern." },
      { word: "quarter", pronunciation: "KWOR-ter", origin: "Latin: quartarius", sentence: "She arrived in the first quarter of the hour." },
      { word: "reality", pronunciation: "ree-AL-ih-tee", origin: "Latin: realitas", sentence: "The documentary explored the reality of poverty." },
      { word: "service", pronunciation: "SUR-vis", origin: "Latin: servitium", sentence: "The restaurant offered excellent service." },
      { word: "triumph", pronunciation: "TRY-umf", origin: "Latin: triumphus", sentence: "The team's triumph was celebrated across the city." },
      { word: "village", pronunciation: "VIL-ij", origin: "Latin: villa", sentence: "The village fair was held every summer." },
      { word: "welcome", pronunciation: "WEL-kum", origin: "Old English: wilcuma", sentence: "A warm welcome awaited the visitors." },
      { word: "example", pronunciation: "ig-ZAM-pul", origin: "Latin: exemplum", sentence: "She set a fine example for her students." },
      { word: "freedom", pronunciation: "FREE-dum", origin: "Old English: frēodōm", sentence: "Freedom of speech is a fundamental right." },
      { word: "general", pronunciation: "JEN-ur-ul", origin: "Latin: generalis", sentence: "As a general rule, arrive five minutes early." },
    ],
  },

  upper_intermediate: {
    displayName: "Upper Intermediate",
    wordCount: 20,
    timeoutSec: 15,
    words: [
      { word: "acquaint", pronunciation: "uh-KWAYNT", origin: "Latin: accognoscere", sentence: "Allow me to acquaint you with our procedures." },
      { word: "bachelor", pronunciation: "BACH-uh-lur", origin: "Medieval Latin: baccalarius", sentence: "He completed his bachelor's degree in three years." },
      { word: "calendar", pronunciation: "KAL-un-dur", origin: "Latin: calendarium", sentence: "Mark the date on the calendar before you forget." },
      { word: "definite", pronunciation: "DEF-uh-nit", origin: "Latin: definitus", sentence: "There is no definite answer to that question." },
      { word: "embarrass", pronunciation: "im-BAIR-us", origin: "Spanish: embarazar", sentence: "The error was enough to embarrass the whole department." },
      { word: "fascinate", pronunciation: "FAS-ih-nayt", origin: "Latin: fascinare", sentence: "Ancient civilisations continue to fascinate historians." },
      { word: "guarantee", pronunciation: "GAIR-un-tee", origin: "Spanish: garantía", sentence: "The manufacturer will guarantee the product for two years." },
      { word: "hierarchy", pronunciation: "HY-ur-ar-kee", origin: "Greek: hierarkhia", sentence: "The company had a strict hierarchy of command." },
      { word: "illiterate", pronunciation: "ih-LIT-ur-it", origin: "Latin: illiteratus", sentence: "Millions of people worldwide remain illiterate." },
      { word: "lieutenant", pronunciation: "lef-TEN-unt", origin: "French: lieu-tenant", sentence: "The lieutenant led the patrol through the forest." },
      { word: "maintenance", pronunciation: "MAYN-tuh-nuns", origin: "Latin: manutenere", sentence: "Regular maintenance keeps the machinery running well." },
      { word: "necessary", pronunciation: "NES-uh-sair-ee", origin: "Latin: necessarius", sentence: "It is necessary to review the report before publishing." },
      { word: "occurring", pronunciation: "uh-KUR-ing", origin: "Latin: occurrere", sentence: "Strange events were occurring throughout the town." },
      { word: "parliament", pronunciation: "PAR-luh-munt", origin: "Old French: parlement", sentence: "The bill was debated in parliament for weeks." },
      { word: "privilege", pronunciation: "PRIV-uh-lij", origin: "Latin: privilegium", sentence: "Education is both a right and a privilege." },
      { word: "recommend", pronunciation: "rek-uh-MEND", origin: "Latin: recommendare", sentence: "I would recommend the grilled fish at this restaurant." },
      { word: "sergeant", pronunciation: "SAR-junt", origin: "Old French: sergent", sentence: "The sergeant briefed the troops before the mission." },
      { word: "threshold", pronunciation: "THRESH-ohld", origin: "Old English: þrescold", sentence: "She stood on the threshold of a new chapter in life." },
      { word: "questionnaire", pronunciation: "kwes-chun-AIR", origin: "French: questionnaire", sentence: "Please complete the questionnaire before your appointment." },
      { word: "independent", pronunciation: "in-dih-PEN-dunt", origin: "Latin: independens", sentence: "She became a fully independent researcher." },
      { word: "perseverance", pronunciation: "pur-suh-VEER-uns", origin: "Latin: perseverantia", sentence: "Her perseverance eventually led to success." },
      { word: "benevolent", pronunciation: "buh-NEV-uh-lunt", origin: "Latin: benevolens", sentence: "The benevolent founder donated to many charities." },
      { word: "conscientious", pronunciation: "kon-shee-EN-shus", origin: "Latin: conscientia", sentence: "She was a conscientious student who never missed a class." },
      { word: "entrepreneur", pronunciation: "on-truh-pruh-NUR", origin: "French: entreprendre", sentence: "He became a successful entrepreneur at age twenty-five." },
      { word: "surveillance", pronunciation: "sur-VAY-luns", origin: "French: surveiller", sentence: "The surveillance cameras covered every entrance." },
    ],
  },

  proficient: {
    displayName: "Proficient",
    wordCount: 25,
    timeoutSec: 12,
    words: [
      { word: "abbreviation", pronunciation: "uh-bree-vee-AY-shun", origin: "Latin: abbreviare", sentence: "GPS is an abbreviation for Global Positioning System." },
      { word: "accommodate", pronunciation: "uh-KOM-uh-dayt", origin: "Latin: accommodare", sentence: "The hall can accommodate up to three hundred guests." },
      { word: "bureaucracy", pronunciation: "byoo-ROK-ruh-see", origin: "French: bureau + Greek: kratia", sentence: "The project was delayed by government bureaucracy." },
      { word: "camouflage", pronunciation: "KAM-uh-flahzh", origin: "French: camoufler", sentence: "The soldiers used camouflage to blend into the forest." },
      { word: "catechism", pronunciation: "KAT-ih-kiz-um", origin: "Greek: katēkhismos", sentence: "Students memorised the catechism before confirmation." },
      { word: "deteriorate", pronunciation: "dih-TEER-ee-uh-rayt", origin: "Latin: deteriorare", sentence: "The patient's condition began to deteriorate overnight." },
      { word: "discrepancy", pronunciation: "dis-KREP-un-see", origin: "Latin: discrepantia", sentence: "There was a discrepancy between the two reports." },
      { word: "exhilarate", pronunciation: "ig-ZIL-uh-rayt", origin: "Latin: exhilarare", sentence: "The roller coaster ride was enough to exhilarate anyone." },
      { word: "fluorescent", pronunciation: "floo-RES-unt", origin: "Latin: fluor + -escent", sentence: "Fluorescent lights hummed softly overhead." },
      { word: "garrulous", pronunciation: "GAIR-uh-lus", origin: "Latin: garrulus", sentence: "The garrulous host talked without pause all evening." },
      { word: "idiosyncrasy", pronunciation: "id-ee-oh-SINK-ruh-see", origin: "Greek: idiosynkrasia", sentence: "Wearing mismatched socks was his favourite idiosyncrasy." },
      { word: "juxtaposition", pronunciation: "juk-stuh-puh-ZI-shun", origin: "Latin: juxta + positio", sentence: "The painting used juxtaposition of light and shadow brilliantly." },
      { word: "kaleidoscope", pronunciation: "kuh-LY-duh-skohp", origin: "Greek: kalos + eidos + skopein", sentence: "The carnival was a kaleidoscope of colour and sound." },
      { word: "labyrinthine", pronunciation: "lab-uh-RIN-thin", origin: "Greek: labyrinthos", sentence: "The castle's labyrinthine corridors confused every visitor." },
      { word: "Mediterranean", pronunciation: "med-ih-tuh-RAY-nee-un", origin: "Latin: mediterraneus", sentence: "They sailed across the Mediterranean in summer." },
      { word: "miscellaneous", pronunciation: "mis-uh-LAY-nee-us", origin: "Latin: miscellaneus", sentence: "The drawer was full of miscellaneous items." },
      { word: "onomatopoeia", pronunciation: "on-uh-mat-uh-PEE-uh", origin: "Greek: onomatopoiia", sentence: "Words like 'buzz' and 'crash' are examples of onomatopoeia." },
      { word: "pharmaceutical", pronunciation: "far-muh-SOO-tih-kul", origin: "Greek: pharmakeutikos", sentence: "The pharmaceutical company invested heavily in research." },
      { word: "rhododendron", pronunciation: "roh-duh-DEN-drun", origin: "Greek: rhodon + dendron", sentence: "A magnificent rhododendron grew outside the cottage." },
      { word: "subterranean", pronunciation: "sub-tuh-RAY-nee-un", origin: "Latin: subterraneus", sentence: "The explorers discovered a subterranean lake." },
      { word: "tyrannical", pronunciation: "tih-RAN-ih-kul", origin: "Greek: tyrannikos", sentence: "The tyrannical ruler was eventually overthrown." },
      { word: "unequivocal", pronunciation: "un-ih-KWIV-uh-kul", origin: "Latin: univocus", sentence: "The committee gave an unequivocal rejection of the plan." },
      { word: "verisimilitude", pronunciation: "vair-ih-sih-MIL-ih-tyood", origin: "Latin: verisimilis", sentence: "The novel's verisimilitude drew readers into its world." },
      { word: "worcestershire", pronunciation: "WOOS-tur-sheer", origin: "Place name: Worcester, England", sentence: "She added a dash of Worcestershire sauce to the stew." },
      { word: "acquiescence", pronunciation: "ak-wee-ES-uns", origin: "Latin: acquiescere", sentence: "His silence was taken as acquiescence to the plan." },
    ],
  },
};

export function getWordsForContest(level: string, count: number): BeeWord[] {
  const config = BEE_LEVELS[level];
  if (!config) return [];
  const shuffled = [...config.words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getLevelConfig(level: string): LevelConfig | undefined {
  return BEE_LEVELS[level];
}
