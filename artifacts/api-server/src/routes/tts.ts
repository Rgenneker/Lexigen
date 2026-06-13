import { Router } from "express";

const router = Router();

// Proxy Google Translate TTS so the browser can play it as a plain Audio element.
// This avoids CORS issues and mobile speechSynthesis unreliability.
// The audio is cached for 24 hours — words don't change pronunciation.
router.get("/tts", async (req, res) => {
  const word = (req.query["word"] as string | undefined)?.trim();
  if (!word) return res.status(400).json({ error: "word query param required" });

  const lang = (req.query["lang"] as string | undefined) ?? "en";
  const ttsUrl =
    `https://translate.google.com/translate_tts` +
    `?ie=UTF-8&q=${encodeURIComponent(word.toLowerCase())}&tl=${encodeURIComponent(lang)}&client=tw-ob`;

  try {
    const upstream = await fetch(ttsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://translate.google.com/",
      },
    });

    if (!upstream.ok) {
      req.log.warn({ status: upstream.status, word }, "TTS upstream failed");
      return res.status(502).json({ error: "TTS upstream failed" });
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Content-Length", String(buffer.byteLength));
    return res.send(buffer);
  } catch (err) {
    req.log.error({ err, word }, "TTS proxy error");
    return res.status(500).json({ error: "TTS proxy error" });
  }
});

export default router;
