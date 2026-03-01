import { query } from "./_generated/server";
import { v } from "convex/values";

/** Format "HH:MM" → "10:00 AM" */
function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

/** Resolve the vehicle display label ("2018 Ford F-150") from a canonical VIN. */
async function resolveVehicleLabel(
  ctx: { db: { query: Function; get: Function } },
  vin: string
): Promise<string> {
  const vehicle = await ctx.db
    .query("vehicles")
    .withIndex("by_vin", (q: any) => q.eq("vin", vin))
    .first();

  if (!vehicle) return vin;

  let makeName = "";
  let modelName = "";

  if (vehicle.trim_id) {
    const trim = await ctx.db.get(vehicle.trim_id);
    if (trim) {
      const model = await ctx.db.get(trim.model_id);
      if (model) {
        modelName = model.name;
        const make = await ctx.db.get(model.make_id);
        if (make) makeName = make.name;
      }
    }
  }

  // Fall back to metadata.make / metadata.model for vehicles seeded without a trim hierarchy
  if (!makeName && vehicle.metadata?.make) makeName = String(vehicle.metadata.make);
  if (!modelName && vehicle.metadata?.model) modelName = String(vehicle.metadata.model);

  return [vehicle.year, makeName, modelName].filter(Boolean).join(" ") || vin;
}

/**
 * Returns all in_progress bookings for a shop, with joined customer, vehicle,
 * service, and mechanic data for the Active Jobs dashboard card.
 */
export const getActiveJobsByShop = query({
  args: { shopId: v.id("shops") },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_shop_and_status", (q) =>
        q.eq("shop_id", args.shopId).eq("status", "in_progress")
      )
      .order("desc")
      .collect();

    return await Promise.all(
      bookings.map(async (booking) => {
        // Customer
        const user = await ctx.db.get(booking.user_id);
        const firstName = user?.first_name ?? "";
        const lastName = user?.last_name ?? "";
        const customerName =
          `${firstName} ${lastName}`.trim() || user?.email || "Unknown";

        // Vehicle
        const vehicleLabel = await resolveVehicleLabel(ctx, booking.vin);

        // First service name (+ overflow count)
        let serviceName = "";
        if (booking.service_ids && booking.service_ids.length > 0) {
          const svc = await ctx.db.get(booking.service_ids[0]);
          if (svc) serviceName = svc.name;
          if (booking.service_ids.length > 1)
            serviceName += ` +${booking.service_ids.length - 1}`;
        }

        // Assigned mechanic (short name)
        let mechanicName: string | null = null;
        if (booking.mechanic_id) {
          const mech = await ctx.db.get(booking.mechanic_id);
          if (mech) {
            mechanicName =
              `${mech.first_name} ${mech.last_name[0]}.`.trim();
          }
        }

        return {
          _id: booking._id,
          customerName,
          vehicle: vehicleLabel,
          service: serviceName,
          liveStage: booking.live_stage ?? null,
          mechanicName,
        };
      })
    );
  },
});

/**
 * Returns all confirmed bookings scheduled for today for a shop, with joined
 * customer, vehicle, and service data for the Today's Bookings dashboard card.
 */
export const getTodaysBookingsByShop = query({
  args: { shopId: v.id("shops") },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_shop_and_date", (q) =>
        q.eq("shop_id", args.shopId).eq("scheduled_date", today)
      )
      .filter((q) => q.eq(q.field("status"), "confirmed"))
      .collect();

    // Sort by scheduled_time ascending (HH:MM string sort is correct)
    bookings.sort((a, b) => a.scheduled_time.localeCompare(b.scheduled_time));

    return await Promise.all(
      bookings.map(async (booking) => {
        // Customer
        const user = await ctx.db.get(booking.user_id);
        const firstName = user?.first_name ?? "";
        const lastName = user?.last_name ?? "";
        const fullName =
          `${firstName} ${lastName}`.trim() || user?.email || "Unknown";
        const initials =
          `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";

        // Vehicle
        const vehicleLabel = await resolveVehicleLabel(ctx, booking.vin);

        // First service name (+ overflow count)
        let serviceName = "";
        if (booking.service_ids && booking.service_ids.length > 0) {
          const svc = await ctx.db.get(booking.service_ids[0]);
          if (svc) serviceName = svc.name;
          if (booking.service_ids.length > 1)
            serviceName += ` +${booking.service_ids.length - 1}`;
        }

        return {
          _id: booking._id,
          customerName: fullName,
          initials,
          vehicle: vehicleLabel,
          service: serviceName,
          scheduledTime: formatTime(booking.scheduled_time),
        };
      })
    );
  },
});
