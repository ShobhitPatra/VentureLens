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

  sessions: defineTable({
    userId: v.string(),
    sessionToken: v.string(),
    expires_at: v.number(),
    created_at: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_sessionToken", ["sessionToken"]),

  accounts: defineTable({
    userId: v.string(),
    type: v.string(),
    provider: v.string(),
    providerAccountId: v.string(),
    refresh_token: v.optional(v.string()),
    access_token: v.optional(v.string()),
    expires_at: v.optional(v.number()),
    token_type: v.optional(v.string()),
    scope: v.optional(v.string()),
    id_token: v.optional(v.string()),
  })
    .index("by_provider", ["provider", "providerAccountId"])
    .index("by_userId", ["userId"]),

  reports: defineTable({
    userId: v.string(),
    reportData: v.any(),
    created_at: v.number(),
  }).index("by_userId", ["userId"]),
});
