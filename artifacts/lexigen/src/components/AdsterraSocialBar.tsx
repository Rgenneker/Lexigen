import { useEffect, useRef } from "react";

const SOCIAL_BAR_SRC = "https://contributionhobblenewlywed.com/28/25/96/28259667b9ee71a7c6ca1b8e6b8cdc64.js";

export default function AdsterraSocialBar() {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    if (document.querySelector(`script[src="${SOCIAL_BAR_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SOCIAL_BAR_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
