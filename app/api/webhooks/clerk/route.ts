import { NextRequest } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type ShopInviteMetadata = {
  role?: string;
  otopair_role?: string;
  shop_id?: string;
  invitation_token?: string;
  mechanic_id?: string;
};

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url, public_metadata } = evt.data;

      const primaryEmail = email_addresses?.[0]?.email_address;
      if (!primaryEmail) {
        return new Response("No email address found", { status: 400 });
      }

      // Extract shop invite metadata copied from Clerk invitation onto the user
      const meta = (public_metadata ?? {}) as ShopInviteMetadata;

      // otopair_role is set by invitation metadata; fall back to generic role for regular users
      const role = meta.otopair_role ?? meta.role;

      await fetchMutation(api.users.upsertFromClerk, {
        clerkUserId: id,
        email: primaryEmail,
        first_name: first_name ?? undefined,
        last_name: last_name ?? undefined,
        profile_photo_url: image_url ?? undefined,
        role,
      });

      // If this event has shop invite metadata (new mechanic OR existing user invited),
      // attempt to create the shop_users record. Idempotent — safe to call on user.updated too.
      if (meta.otopair_role) {
        await fetchMutation(api.invitations.acceptIfInvited, {
          clerkUserId: id,
          email: primaryEmail,
          invitationToken: meta.invitation_token ?? undefined,
          mechanicId: meta.mechanic_id
            ? (meta.mechanic_id as Id<"mechanics">)
            : undefined,
        });
      } else if (eventType === "user.created") {
        // For regular signups (no invite metadata), still check by email in case there's
        // a pending invitation that wasn't reflected in Clerk metadata.
        await fetchMutation(api.invitations.acceptIfInvited, {
          clerkUserId: id,
          email: primaryEmail,
        });
      }
    }

    // invitation.accepted fires after user.created/updated when a Clerk invitation is accepted.
    // Acts as a safety-net to ensure shop_users is created even if user.created processing failed.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const evtAny = evt as any;
    if (evtAny.type === "invitation.accepted") {
      const data = evtAny.data as { id?: string; email_address?: string };
      if (data.id && data.email_address) {
        await fetchMutation(api.invitations.acceptByClerkInvitationId, {
          clerkInvitationId: data.id,
          email: data.email_address,
        });
      }
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;
      if (id) {
        await fetchMutation(api.users.deleteFromClerk, { clerkUserId: id });
      }
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }
}
