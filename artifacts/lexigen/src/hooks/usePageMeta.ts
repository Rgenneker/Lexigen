import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  schema?: object;
}

const BASE_URL = "https://lexigenz.com";
const DEFAULT_IMAGE = `${BASE_URL}/opengraph.jpg`;

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setSchema(id: string, data: object) {
  let el = document.querySelector<HTMLScriptElement>(`script[data-schema="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-schema", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeSchema(id: string) {
  document.querySelector(`script[data-schema="${id}"]`)?.remove();
}

export function usePageMeta({ title, description, canonical, ogType = "website", ogImage = DEFAULT_IMAGE, keywords, schema }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "";
    const prevCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "";
    const prevOgTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content ?? "";
    const prevOgDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content ?? "";
    const prevOgUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content ?? "";
    const prevOgType = document.querySelector<HTMLMetaElement>('meta[property="og:type"]')?.content ?? "";
    const prevOgImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content ?? "";
    const prevTwTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.content ?? "";
    const prevTwDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.content ?? "";
    const prevTwImage = document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.content ?? "";

    const url = canonical ? (canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`) : `${BASE_URL}${window.location.pathname}`;

    document.title = title;
    setMeta("description", description);
    setLink("canonical", url);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
    if (keywords) setMeta("keywords", keywords);
    if (schema) setSchema("page-schema", schema);

    return () => {
      document.title = prevTitle;
      setMeta("description", prevDesc);
      setLink("canonical", prevCanonical);
      setMeta("og:title", prevOgTitle, "property");
      setMeta("og:description", prevOgDesc, "property");
      setMeta("og:url", prevOgUrl, "property");
      setMeta("og:type", prevOgType, "property");
      setMeta("og:image", prevOgImage, "property");
      setMeta("twitter:title", prevTwTitle);
      setMeta("twitter:description", prevTwDesc);
      setMeta("twitter:image", prevTwImage);
      if (schema) removeSchema("page-schema");
    };
  }, [title, description, canonical, ogType, ogImage, keywords, schema]);
}
