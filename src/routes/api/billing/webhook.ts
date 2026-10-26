import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/billing/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.BILLING_WEBHOOK_SECRET;
        if (!secret) {
          return Response.json(
            { error: "Billing provider is not configured." },
            { status: 501 },
          );
        }
        const signature = request.headers.get("x-trex-signature");
        if (signature !== secret) {
          return Response.json({ error: "Invalid signature." }, { status: 401 });
        }
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON." }, { status: 400 });
        }
        if (!body || typeof body !== "object") {
          return Response.json({ error: "Invalid payload." }, { status: 400 });
        }
        const raw = body as Record<string, unknown>;
        const userId = typeof raw.userId === "string" ? raw.userId.trim() : "";
        const plan = typeof raw.plan === "string" ? raw.plan.trim() : "";
        const status = typeof raw.status === "string" ? raw.status.trim() : "";
        const expiresAt = typeof raw.expiresAt === "string" ? raw.expiresAt : null;
        if (!/^[A-Za-z0-9_-]{1,80}$/.test(userId)) {
          return Response.json({ error: "Invalid user." }, { status: 400 });
        }
        if (plan !== "pro-monthly") {
          return Response.json({ error: "Unknown plan." }, { status: 400 });
        }
        if (status !== "pro" && status !== "expired" && status !== "free") {
          return Response.json({ error: "Unknown status." }, { status: 400 });
        }
        if (expiresAt && Number.isNaN(new Date(expiresAt).getTime())) {
          return Response.json({ error: "Invalid expiry." }, { status: 400 });
        }
        const { applySubscription } = await import("@/lib/training-queries.server");
        await applySubscription({
          userId,
          plan,
          status,
          expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        });
        return Response.json({ ok: true });
      },
    },
  },
});
