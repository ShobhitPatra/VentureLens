import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createReport = mutation({
  args: {
    userEmail: v.string(),
    originalUrl: v.string(),
    reportData: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.userEmail))
      .first();

    if (!user) {
      throw new Error("User not found. Please sign in first.");
    }

    return await ctx.db.insert("reports", {
      userId: user._id,
      originalUrl: args.originalUrl,
      reportData: args.reportData,
      created_at: Date.now(),
    });
  },
});

export const getUserReports = query({
  args: { userEmail: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.userEmail))
      .first();

    if (!user) return [];

    return await ctx.db
      .query("reports")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});
