import { useEffect, useRef } from "react";

const AD_ID = "41d4aabb3588a1d80140791be9b04f74";
const AD_SRC = `https://contributionhobblenewlywed.com/${AD_ID}/invoke.js`;

export default function AdsterraAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;

    const existing = document.querySelector(`script[src="${AD_SRC}"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.src = AD_SRC;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full flex justify-center py-2 bg-background">
      <div id={`container-${AD_ID}`} ref={containerRef} />
    </div>
  );
}
