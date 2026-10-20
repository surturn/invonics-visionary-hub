import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Receives a service discovery form and forwards it to a Lark Base automation
// that starts with "When a webhook is received". The webhook address and its
// bearer token live in Cloudflare secrets, never in the page, so nobody can
// find them and post junk straight into the Base.
//
// Secrets (runtime, Settings > Variables and Secrets):
//   LARK_WEBHOOK_URL    the webhook address Lark shows on the trigger
//   LARK_WEBHOOK_TOKEN  the bearer token from the trigger's Security settings

const schema = z.object({
  service: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).default(""),
  organisation: z.string().trim().max(160).default(""),
  brief: z.string().trim().min(1).max(6000),
  // Honeypot. Real visitors never see or fill this.
  website: z.string().max(200).optional(),
});

export type IntakeInput = z.input<typeof schema>;
export type IntakeResult =
  | { ok: true }
  | { ok: false; reason: "unavailable" | "invalid" | "failed" };

export const submitIntake = createServerFn({ method: "POST" })
  .inputValidator((data: IntakeInput) => data)
  .handler(async ({ data }): Promise<IntakeResult> => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) return { ok: false, reason: "invalid" };

    // A filled honeypot is a bot. Pretend it worked and drop it.
    if (parsed.data.website) return { ok: true };

    const url = process.env.LARK_WEBHOOK_URL;
    const token = process.env.LARK_WEBHOOK_TOKEN;
    if (!url || !token) return { ok: false, reason: "unavailable" };

    const { service, name, email, phone, organisation, brief } = parsed.data;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // Lark ignores a repeat of the same value for 3 hours, so a double click
          // cannot create two rows.
          "Client-Token": crypto.randomUUID(),
        },
        body: JSON.stringify({ service, name, email, phone, organisation, brief }),
        signal: AbortSignal.timeout(8000),
      });

      const result = (await response.json().catch(() => null)) as { code?: number } | null;
      if (!response.ok || !result || result.code !== 0) {
        // Log only the status and Lark's error code, never the visitor's details.
        console.error("Lark intake webhook rejected the request", response.status, result?.code);
        return { ok: false, reason: "failed" };
      }
      return { ok: true };
    } catch {
      console.error("Lark intake webhook was unreachable");
      return { ok: false, reason: "failed" };
    }
  });
