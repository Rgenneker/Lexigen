import { Router } from "express";

const router = Router();

router.post("/invite", async (req, res) => {
  const { recipientEmail, message, challengeGame } = req.body;
  if (!recipientEmail) {
    return res.status(400).json({ error: "recipientEmail is required" });
  }
  // In a real app, this would send an email
  return res.json({
    success: true,
    message: `Invite sent to ${recipientEmail}! Your friend will receive a challenge to join Lexigen.`,
  });
});

export default router;
