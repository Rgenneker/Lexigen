import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();
const DEFAULT_USER_ID = 1;

const PREMIUM_FEATURES = [
  "Unlimited sentence builder",
  "Advanced monthly report",
  "No ads",
  "Exclusive themes",
  "Access to unlimited word games",
  "Priority word recommendations",
  "Extended word journal",
  "Export journal to PDF",
];

// ── PayPal helpers ───────────────────────────────────────
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

// ── Existing routes ──────────────────────────────────────
router.get("/premium/status", async (req, res) => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, DEFAULT_USER_ID));
  const freeFeatures = ["Daily word delivery", "Birth archetype profile", "Streak tracking", "Word journal (5 entries)"];
  return res.json({
    isPremium: user?.isPremium ?? false,
    plan: user?.premiumPlan ?? null,
    expiresAt: user?.premiumExpiresAt?.toISOString() ?? null,
    features: user?.isPremium ? PREMIUM_FEATURES : freeFeatures,
  });
});

// ── PayPal config (public client ID for SDK) ─────────────
router.get("/premium/paypal-config", (_req, res) => {
  res.json({
    clientId: process.env.PAYPAL_CLIENT_ID ?? "",
    mode: process.env.PAYPAL_MODE ?? "sandbox",
  });
});

// ── Create PayPal order ──────────────────────────────────
router.post("/premium/create-order", async (req, res) => {
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
            amount: { currency_code: "USD", value: "8.00" },
            description: "Lexigen Premium — Lifetime Access",
            ...(process.env.PAYPAL_PAYEE_EMAIL
              ? { payee: { email_address: process.env.PAYPAL_PAYEE_EMAIL } }
              : {}),
          },
        ],
        application_context: {
          brand_name: "Lexigen",
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
        },
      }),
    });

    if (!orderRes.ok) {
      const text = await orderRes.text();
      req.log.error({ status: orderRes.status, body: text }, "PayPal create-order failed");
      return res.status(502).json({ error: "PayPal order creation failed" });
    }

    const order = (await orderRes.json()) as { id: string; status: string };
    return res.json({ orderID: order.id });
  } catch (err) {
    req.log.error({ err }, "create-order exception");
    return res.status(500).json({ error: "Internal error creating order" });
  }
});

// ── Capture PayPal order ─────────────────────────────────
router.post("/premium/capture-order", async (req, res) => {
  const { orderID, userEmail, firstName, lastName } = req.body as {
    orderID?: string;
    userEmail?: string;
    firstName?: string;
    lastName?: string;
  };

  if (!orderID) return res.status(400).json({ error: "orderID is required" });
  if (!userEmail?.trim()) return res.status(400).json({ error: "userEmail is required" });

  try {
    const token = await getPayPalToken();
    const base = getPayPalBase();

    const captureRes = await fetch(`${base}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!captureRes.ok) {
      const text = await captureRes.text();
      req.log.error({ status: captureRes.status, body: text }, "PayPal capture failed");
      return res.status(502).json({ error: "PayPal capture failed" });
    }

    const capture = (await captureRes.json()) as {
      id: string;
      status: string;
      purchase_units?: Array<{
        payments?: { captures?: Array<{ id: string; status: string }> };
      }>;
    };

    if (capture.status !== "COMPLETED") {
      return res.status(400).json({ error: "Payment not completed", status: capture.status });
    }

    // Mark user as premium by email (lifetime — no expiry)
    const normalizedEmail = userEmail!.trim().toLowerCase();
    await db
      .update(usersTable)
      .set({
        isPremium: true,
        premiumPlan: "lifetime",
        premiumExpiresAt: null,
      })
      .where(eq(usersTable.email, normalizedEmail));

    req.log.info(
      { orderID, userEmail: normalizedEmail, captureStatus: capture.status, firstName, lastName },
      "Premium upgrade successful"
    );

    return res.json({
      success: true,
      status: "COMPLETED",
      features: PREMIUM_FEATURES,
    });
  } catch (err) {
    req.log.error({ err }, "capture-order exception");
    return res.status(500).json({ error: "Internal error capturing order" });
  }
});

// ── Legacy upgrade (kept for compatibility) ──────────────
router.post("/premium/upgrade", async (req, res) => {
  const { plan } = req.body as { plan?: string };
  if (!plan) return res.status(400).json({ error: "plan is required" });
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await db
    .update(usersTable)
    .set({ isPremium: true, premiumPlan: plan, premiumExpiresAt: expiresAt })
    .where(eq(usersTable.id, DEFAULT_USER_ID));
  return res.json({ isPremium: true, plan, expiresAt: expiresAt.toISOString(), features: PREMIUM_FEATURES });
});

export default router;
