import mongoose from "mongoose";

const AppConfigSchema = new mongoose.Schema({
  lockAttempt: { type: Number, required: true, default: 5 },
  windowMinutes: { type: Number, required: true, default: 15 },
  loginLimit: { type: Number, required: true, default: 5 },
});

export const AppConfig = mongoose.model(
  "AppConfig",
  AppConfigSchema,
  "appConfiguration"
);
