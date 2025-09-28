import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    provider: v.union(v.literal("github"), v.literal("google")),
    providerId: v.string(),
    created_at: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_provider", ["provider"]),

  reports: defineTable({
    userId: v.string(),
    reportData: v.string(),
    created_at: v.number(),
  }).index("by_userId", ["userId"]),
});
