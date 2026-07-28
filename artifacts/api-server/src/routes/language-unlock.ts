import { Router } from "express";
import { db } from "@workspace/db";
import { languageUnlocksTable } from "@workspace/db";
import { eq, and, gt } from "drizzle-orm";

const router = Router();
const DEFAULT_USER_ID = 1;
const UNLOCK_PRICE = "2.00";
const UNLOCK_DAYS = 60;

function getPayPalBase(): string {
  return process.env.PAYPAL_MODE === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";
}

async function getPayPalToken(): Promise<string> {
  const base = getPayPalBase();
  const clientId = process.env.PAYPAL_CLIENT_ID ?? "";
  const secret = process.env.PAYPAL_CLIENT_SECRET ?? "";
  const credentials = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal token error: ${res.status} ${text}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

// ── GET /api/language-unlock/status ──────────────────────
// Returns unlock status for every language the user has purchased
router.get("/language-unlock/status", async (req, res) => {
  const userId = parseInt((req.query.userId as string) ?? String(DEFAULT_USER_ID), 10);
  const now = new Date();
  const unlocks = await db
    .select()
    .from(languageUnlocksTable)
    .where(eq(languageUnlocksTable.userId, userId));

  const result = unlocks.map((u) => {
    const expired = u.expiresAt <= now;
    const msLeft = u.expiresAt.getTime() - now.getTime();
    const daysRemaining = expired ? 0 : Math.ceil(msLeft / (1000 * 60 * 60 * 24));
    return {
      language: u.language,
      expiresAt: u.expiresAt.toISOString(),
      expired,
      daysRemaining,
    };
  });

  return res.json({ unlocks: result });
});

// ── POST /api/language-unlock/create-order ───────────────
router.post("/language-unlock/create-order", async (req, res) => {
  const { language } = req.body as { language?: string };
  if (!language?.trim()) {
    return res.status(400).json({ error: "language is required" });
  }

  try {
    const token = await getPayPalToken();
    const base = getPayPalBase();

    const orderRes = await fetch(`${base}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: "USD", value: UNLOCK_PRICE },
            description: `Lexigenz — ${language} (${UNLOCK_DAYS}-day access)`,
          },
        ],
        application_context: {
          brand_name: "Lexigenz",
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
        },
      }),
    });

    if (!orderRes.ok) {
      const text = await orderRes.text();
      req.log.error({ status: orderRes.status, body: text }, "PayPal create-order failed (language unlock)");
      return res.status(502).json({ error: "PayPal order creation failed" });
    }

    const order = (await orderRes.json()) as { id: string };
    return res.json({ orderID: order.id });
  } catch (err) {
    req.log.error({ err }, "language-unlock create-order exception");
    return res.status(500).json({ error: "Internal error creating order" });
  }
});

// ── POST /api/language-unlock/capture-order ──────────────
router.post("/language-unlock/capture-order", async (req, res) => {
  const { orderID, language } = req.body as { orderID?: string; language?: string };
  if (!orderID || !language?.trim()) {
    return res.status(400).json({ error: "orderID and language are required" });
  }

  try {
    const token = await getPayPalToken();
    const base = getPayPalBase();

    const captureRes = await fetch(`${base}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    if (!captureRes.ok) {
      const text = await captureRes.text();
      req.log.error({ status: captureRes.status, body: text }, "PayPal capture failed (language unlock)");
      return res.status(502).json({ error: "PayPal capture failed" });
    }

    const capture = (await captureRes.json()) as { id: string; status: string };
    if (capture.status !== "COMPLETED") {
      return res.status(400).json({ error: "Payment not completed", status: capture.status });
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + UNLOCK_DAYS * 24 * 60 * 60 * 1000);

    // Remove any previous (expired) unlock for this language, then insert fresh
    await db
      .delete(languageUnlocksTable)
      .where(
        and(
          eq(languageUnlocksTable.userId, DEFAULT_USER_ID),
          eq(languageUnlocksTable.language, language),
        ),
      );

    await db.insert(languageUnlocksTable).values({
      userId: DEFAULT_USER_ID,
      language,
      orderId: orderID,
      purchasedAt: now,
      expiresAt,
    });

    req.log.info({ language, orderID, expiresAt }, "Language unlock successful");
    return res.json({
      success: true,
      language,
      expiresAt: expiresAt.toISOString(),
      daysRemaining: UNLOCK_DAYS,
    });
  } catch (err) {
    req.log.error({ err }, "language-unlock capture-order exception");
    return res.status(500).json({ error: "Internal error capturing order" });
  }
});

export default router;
