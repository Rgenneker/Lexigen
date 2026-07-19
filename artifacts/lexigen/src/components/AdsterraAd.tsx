import { useEffect, useRef } from "react";

const AD_ID = "41d4aabb3588a1d80140791be9b04f74";
const AD_SRC = `https://contributionhobblenewlywed.com/${AD_ID}/invoke.js`;

export default function AdsterraAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always remove any stale copy of the script so it re-executes
    // AFTER this container div is already in the DOM
    const existing = document.querySelector(`script[src="${AD_SRC}"]`);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.src = AD_SRC;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.head.appendChild(script);

    return () => {
      const s = document.querySelector(`script[src="${AD_SRC}"]`);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="w-full flex justify-center py-2 bg-background">
      <div id={`container-${AD_ID}`} ref={containerRef} />
    </div>
  );
}
