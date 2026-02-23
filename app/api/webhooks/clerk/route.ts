import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url, public_metadata } = evt.data;

      const primaryEmail = email_addresses?.[0]?.email_address;
      if (!primaryEmail) {
        return new Response("No email address found", { status: 400 });
      }

      const role = (public_metadata as { role?: string })?.role as
        | "user"
        | "shop_owner"
        | "mechanic"
        | "admin"
        | undefined;

      await fetchMutation(api.users.upsertFromClerk, {
        clerkId: id,
        email: primaryEmail,
        firstName: first_name ?? undefined,
        lastName: last_name ?? undefined,
        imageUrl: image_url ?? undefined,
        role: role,
      });
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;
      if (id) {
        await fetchMutation(api.users.deleteFromClerk, {
          clerkId: id,
        });
      }
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }
}
