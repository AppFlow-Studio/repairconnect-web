import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Seeds the bookings table with realistic dashboard demo data for a given shop.
 *
 * Usage:
 *   npx convex run seed:seedDashboardBookings '{"shopId":"<shops_id>"}'
 *   npx convex run seed:seedDashboardBookings '{"shopId":"<shops_id>","clearExisting":true}'
 *
 * Produces:
 *   - 2 active jobs (status: "in_progress") — one mid-service, one nearly done
 *   - 3 confirmed bookings scheduled later today
 *   - 2 pending bookings (status: "pending") — awaiting shop approval
 *
 * Prerequisites: the shop must already exist. Mechanics are re-used from the shop
 * if any exist; otherwise a placeholder mechanic is created. Demo users, vehicles,
 * time slots, and services are created as needed and cleaned up on clear.
 */
export const seedDashboardBookings = mutation({
  args: {
    shopId: v.id("shops"),
    clearExisting: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const shop = await ctx.db.get(args.shopId);
    if (!shop) throw new Error(`Shop ${args.shopId} not found.`);

    const now = Date.now();
    const today = new Date(now).toISOString().split("T")[0]; // "YYYY-MM-DD"

    // ── Optional clear ────────────────────────────────────────────────────────
    if (args.clearExisting ?? false) {
      const existing = await ctx.db
        .query("bookings")
        .withIndex("by_shop_id", (q) => q.eq("shop_id", args.shopId))
        .collect();
      for (const b of existing) {
        // Clean up the time slot we created for it
        const slot = await ctx.db.get(b.time_slot_id);
        if (slot && slot.date === today) {
          await ctx.db.delete(b.time_slot_id);
        }
        await ctx.db.delete(b._id);
      }
      // Clean up demo users and vehicles created by a previous seed run
      const seedUsers = await ctx.db
        .query("users")
        .collect();
      for (const u of seedUsers) {
        if (u.clerkUserId.startsWith("seed-dashboard-")) {
          // Remove vehicle owners
          const owners = await ctx.db
            .query("vehicle_owners")
            .withIndex("by_user_id", (q) => q.eq("user_id", u._id))
            .collect();
          for (const o of owners) await ctx.db.delete(o._id);
          await ctx.db.delete(u._id);
        }
      }
    }

    // ── Demo services ─────────────────────────────────────────────────────────
    // Re-use existing services if present, otherwise create lightweight stubs.
    const ensureService = async (
      slug: string,
      name: string,
      categoryName: string,
    ) => {
      const services = await ctx.db.query("services").collect();
      const existing = services.find((s) => s.slug === slug);
      if (existing) return existing._id;

      let catId: any;
      const cats = await ctx.db.query("service_categories").collect();
      const existingCat = cats.find((c) => c.name === categoryName);
      if (existingCat) {
        catId = existingCat._id;
      } else {
        catId = await ctx.db.insert("service_categories", {
          name: categoryName,
          icon_name: "wrench",
          display_order: 99,
        });
      }
      return await ctx.db.insert("services", {
        name,
        slug,
        description: name,
        service_category_id: catId,
        default_labor_hours: 1,
        is_labor_only: false,
        has_options: false,
        display_order: 99,
      });
    };

    const oilChangeId    = await ensureService("oil-change",        "Oil Change",           "Maintenance");
    const brakePadsId    = await ensureService("brake-pads",        "Brake Pad Replacement","Brakes");
    const tireRotationId = await ensureService("tire-rotation",     "Tire Rotation",        "Maintenance");
    const alignmentId    = await ensureService("wheel-alignment",   "Wheel Alignment",      "Maintenance");
    const acServiceId    = await ensureService("ac-service",        "AC System Service",    "Maintenance");

    // ── Mechanics ─────────────────────────────────────────────────────────────
    // Use existing mechanics for this shop. If none, create two demo ones.
    let shopMechanics = await ctx.db
      .query("mechanics")
      .withIndex("by_shop_id", (q) => q.eq("shop_id", args.shopId))
      .collect();

    if (shopMechanics.length === 0) {
      const m1Id = await ctx.db.insert("mechanics", {
        shop_id: args.shopId,
        first_name: "Mike",
        last_name: "Turner",
        is_active: true,
        rating: 4.8,
        review_count: 42,
      });
      const m2Id = await ctx.db.insert("mechanics", {
        shop_id: args.shopId,
        first_name: "Sarah",
        last_name: "Jenkins",
        is_active: true,
        rating: 4.7,
        review_count: 31,
      });
      shopMechanics = [
        (await ctx.db.get(m1Id))!,
        (await ctx.db.get(m2Id))!,
      ];
    }

    const mech0 = shopMechanics[0];
    const mech1 = shopMechanics[1] ?? shopMechanics[0];

    // ── Demo users + vehicles ─────────────────────────────────────────────────
    const demoVehicles = [
      { clerkId: "seed-dashboard-user-1", firstName: "James",  lastName: "Sullivan",  vin: "SEED1VIN000001", year: 2018, make: "Ford",   model: "F-150" },
      { clerkId: "seed-dashboard-user-2", firstName: "Maria",  lastName: "Rodriguez", vin: "SEED1VIN000002", year: 2021, make: "Toyota", model: "RAV4" },
      { clerkId: "seed-dashboard-user-3", firstName: "Alex",   lastName: "Lee",       vin: "SEED1VIN000003", year: 2015, make: "Honda",  model: "Civic" },
      { clerkId: "seed-dashboard-user-4", firstName: "Jordan", lastName: "Park",      vin: "SEED1VIN000004", year: 2020, make: "Chevy",  model: "Silverado" },
      { clerkId: "seed-dashboard-user-5", firstName: "Casey",  lastName: "Morgan",    vin: "SEED1VIN000005", year: 2019, make: "Subaru", model: "Outback" },
      { clerkId: "seed-dashboard-user-6", firstName: "Taylor", lastName: "Brooks",    vin: "SEED1VIN000006", year: 2022, make: "Jeep",   model: "Wrangler" },
      { clerkId: "seed-dashboard-user-7", firstName: "Riley",  lastName: "Quinn",     vin: "SEED1VIN000007", year: 2017, make: "BMW",    model: "X5" },
    ];

    // Upsert each demo user + vehicle
    const userIds: any[] = [];
    for (const dv of demoVehicles) {
      const existing = await ctx.db
        .query("users")
        .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", dv.clerkId))
        .first();
      let userId: any;
      if (existing) {
        userId = existing._id;
      } else {
        userId = await ctx.db.insert("users", {
          clerkUserId: dv.clerkId,
          onboardingCompleted: true,
          createdAt: now,
          email: `${dv.firstName.toLowerCase()}.${dv.lastName.toLowerCase()}@demo.otopair.com`,
          first_name: dv.firstName,
          last_name: dv.lastName,
        });
      }
      userIds.push(userId);

      // Ensure vehicle exists in vehicles table
      const vehicleRows = await ctx.db
        .query("vehicles")
        .withIndex("by_vin", (q) => q.eq("vin", dv.vin))
        .collect();
      if (vehicleRows.length === 0) {
        await ctx.db.insert("vehicles", {
          vin: dv.vin,
          year: dv.year,
          created_at: now,
          updated_at: now,
          metadata: { make: dv.make, model: dv.model },
        });
      }
      // Ensure ownership
      const ownerRows = await ctx.db
        .query("vehicle_owners")
        .withIndex("by_vin_user", (q) => q.eq("vin", dv.vin).eq("user_id", userId))
        .collect();
      if (ownerRows.length === 0) {
        await ctx.db.insert("vehicle_owners", {
          vin: dv.vin,
          user_id: userId,
          status: "active",
          is_primary: true,
          added_at: now,
        });
      }
    }

    // ── Helper: create a time slot + booking ──────────────────────────────────
    const createBooking = async ({
      userIdx,
      vinIdx,
      serviceId,
      mechanicId,
      scheduledTime,
      status,
      liveStage,
      laborCost,
      partsCost,
      key,
    }: {
      userIdx: number;
      vinIdx: number;
      serviceId: any;
      mechanicId: any;
      scheduledTime: string;   // "HH:MM"
      status: string;
      liveStage?: string;
      laborCost: number;
      partsCost: number;
      key: string;
    }) => {
      const [startHour] = scheduledTime.split(":").map(Number);
      const endTime = `${String(startHour + 1).padStart(2, "0")}:00`;

      const timeSlotId = await ctx.db.insert("time_slots", {
        shop_id: args.shopId,
        mechanic_id: mechanicId,
        date: today,
        start_time: scheduledTime,
        end_time: endTime,
        is_available: false,
      });

      const totalCost = laborCost + partsCost;
      const bookingId = await ctx.db.insert("bookings", {
        user_id: userIds[userIdx],
        vin: demoVehicles[vinIdx].vin,
        shop_id: args.shopId,
        mechanic_id: mechanicId,
        service_ids: [serviceId],
        time_slot_id: timeSlotId,
        scheduled_date: today,
        scheduled_time: scheduledTime,
        labor_cost: laborCost,
        parts_cost: partsCost,
        total_cost: totalCost,
        status,
        ...(liveStage ? { live_stage: liveStage } : {}),
        created_at: now,
        updated_at: now,
      });

      await ctx.db.insert("booking_status_history", {
        booking_id: bookingId,
        old_status: "confirmed",
        new_status: status,
        reason: `seed_dashboard_${key}`,
        changed_at: now,
      });

      return bookingId;
    };

    // ── Active Jobs — status: "in_progress" ───────────────────────────────────
    // These appear in the Active Jobs card.
    await createBooking({
      userIdx: 3,     // Jordan Park
      vinIdx: 3,      // 2020 Chevy Silverado
      serviceId: brakePadsId,
      mechanicId: mech0._id,
      scheduledTime: "09:00",
      status: "in_progress",
      liveStage: "service_in_progress",
      laborCost: 95,
      partsCost: 60,
      key: "active_1",
    });

    await createBooking({
      userIdx: 6,     // Riley Quinn
      vinIdx: 6,      // 2017 BMW X5
      serviceId: alignmentId,
      mechanicId: mech1._id,
      scheduledTime: "09:00",
      status: "in_progress",
      liveStage: "vehicle_ready",
      laborCost: 89,
      partsCost: 0,
      key: "active_2",
    });

    // ── Today's Confirmed Bookings — later in the day ─────────────────────────
    // These appear in the Today's Bookings card.
    await createBooking({
      userIdx: 0,     // James Sullivan
      vinIdx: 0,      // 2018 Ford F-150
      serviceId: oilChangeId,
      mechanicId: mech0._id,
      scheduledTime: "11:00",
      status: "confirmed",
      laborCost: 47.5,
      partsCost: 45,
      key: "today_1",
    });

    await createBooking({
      userIdx: 1,     // Maria Rodriguez
      vinIdx: 1,      // 2021 Toyota RAV4
      serviceId: brakePadsId,
      mechanicId: mech1._id,
      scheduledTime: "13:30",
      status: "confirmed",
      laborCost: 95,
      partsCost: 70,
      key: "today_2",
    });

    await createBooking({
      userIdx: 2,     // Alex Lee
      vinIdx: 2,      // 2015 Honda Civic
      serviceId: tireRotationId,
      mechanicId: mech0._id,
      scheduledTime: "15:00",
      status: "confirmed",
      laborCost: 30,
      partsCost: 0,
      key: "today_3",
    });

    // ── Pending Jobs — status: "pending" ─────────────────────────────────────
    // These appear in the Pending card (awaiting shop approval).
    await createBooking({
      userIdx: 4,     // Casey Morgan
      vinIdx: 4,      // 2019 Subaru Outback
      serviceId: brakePadsId,
      mechanicId: mech0._id,
      scheduledTime: "14:00",
      status: "pending",
      laborCost: 95,
      partsCost: 65,
      key: "pending_1",
    });

    await createBooking({
      userIdx: 5,     // Taylor Brooks
      vinIdx: 5,      // 2022 Jeep Wrangler
      serviceId: acServiceId,
      mechanicId: mech1._id,
      scheduledTime: "16:00",
      status: "pending",
      laborCost: 95,
      partsCost: 35,
      key: "pending_2",
    });

    return {
      success: true,
      shopId: args.shopId,
      date: today,
      created: {
        activeJobs: 2,
        todayBookings: 3,
        pendingJobs: 2,
      },
    };
  },
});
