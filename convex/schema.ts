import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    role: v.union(
      v.literal("user"),
      v.literal("shop_owner"),
      v.literal("mechanic"),
      v.literal("admin")
    ),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  shops: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    zipCode: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    operatingHours: v.optional(
      v.object({
        monday: v.optional(v.object({ open: v.string(), close: v.string() })),
        tuesday: v.optional(v.object({ open: v.string(), close: v.string() })),
        wednesday: v.optional(
          v.object({ open: v.string(), close: v.string() })
        ),
        thursday: v.optional(
          v.object({ open: v.string(), close: v.string() })
        ),
        friday: v.optional(v.object({ open: v.string(), close: v.string() })),
        saturday: v.optional(
          v.object({ open: v.string(), close: v.string() })
        ),
        sunday: v.optional(v.object({ open: v.string(), close: v.string() })),
      })
    ),
    isActive: v.boolean(),
    ownerId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_ownerId", ["ownerId"]),

  shop_users: defineTable({
    shopId: v.id("shops"),
    userId: v.id("users"),
    role: v.union(v.literal("owner"), v.literal("mechanic")),
    invitedByUserId: v.optional(v.id("users")),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_shopId", ["shopId"])
    .index("by_userId", ["userId"])
    .index("by_shopId_userId", ["shopId", "userId"]),

  time_slots: defineTable({
    shopId: v.id("shops"),
    mechanicId: v.id("users"),
    date: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    isAvailable: v.boolean(),
    isBooked: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_shopId", ["shopId"])
    .index("by_mechanicId", ["mechanicId"])
    .index("by_shopId_date", ["shopId", "date"]),

  jobs: defineTable({
    shopId: v.id("shops"),
    customerId: v.optional(v.id("users")),
    mechanicId: v.optional(v.id("users")),
    timeSlotId: v.optional(v.id("time_slots")),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    estimatedPrice: v.optional(v.number()),
    actualPrice: v.optional(v.number()),
    vehicleMake: v.optional(v.string()),
    vehicleModel: v.optional(v.string()),
    vehicleYear: v.optional(v.number()),
    vehicleVin: v.optional(v.string()),
    notes: v.optional(v.string()),
    completedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_shopId", ["shopId"])
    .index("by_customerId", ["customerId"])
    .index("by_mechanicId", ["mechanicId"])
    .index("by_status", ["status"])
    .index("by_shopId_status", ["shopId", "status"]),
});
