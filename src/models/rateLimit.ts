import mongoose from "mongoose";

const RateLimitSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 1 },
  timestamp: { type: Date, required: true, default: Date.now },
});

export const RateLimit = mongoose.model(
  "RateLimit",
  RateLimitSchema,
  "rateLimit"
);
