import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const now = Date.now();

    const shopId = await ctx.db.insert("shops", {
      ...args,
      isActive: true,
      ownerId: user._id,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("shop_users", {
      shopId,
      userId: user._id,
      role: "owner",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return shopId;
  },
});

export const getByOwner = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    return await ctx.db
      .query("shops")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
      .collect();
  },
});

export const getById = query({
  args: { shopId: v.id("shops") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.shopId);
  },
});

export const getMyShops = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const shopUsers = await ctx.db
      .query("shop_users")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const shops = await Promise.all(
      shopUsers.map(async (su) => {
        const shop = await ctx.db.get(su.shopId);
        return shop ? { ...shop, memberRole: su.role } : null;
      })
    );

    return shops.filter(Boolean);
  },
});
