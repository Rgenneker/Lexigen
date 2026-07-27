import { useEffect, useRef } from "react";

const AD_ID = "41d4aabb3588a1d80140791be9b04f74";
const AD_SRC = `https://contributionhobblenewlywed.com/${AD_ID}/invoke.js`;
const AD_HOST = "contributionhobblenewlywed.com";

export default function AdsterraAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Suppress any uncaught exception thrown by the ad script (it throws
    // strings/objects on 403 / blocked requests, not Error instances).
    const handleWindowError = (event: ErrorEvent): boolean | undefined => {
      if (
        event.filename?.includes(AD_HOST) ||
        String(event.message).includes(AD_HOST) ||
        // non-Error throws arrive with message "(unknown)" or similar
        !event.error
      ) {
        event.preventDefault();
        return true;
      }
      return undefined;
    };
    window.addEventListener("error", handleWindowError);

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = String(event.reason ?? "");
      if (reason.includes(AD_HOST) || !event.reason) {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    // Remove any stale copy so the script re-executes after the container
    // div is already in the DOM.
    const existing = document.querySelector(`script[src="${AD_SRC}"]`);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.src = AD_SRC;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    // Silently swallow 403 / network failures from the ad network.
    script.onerror = () => {};
    document.head.appendChild(script);

    return () => {
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
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
