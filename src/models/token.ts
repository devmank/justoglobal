import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  emailOrPhone: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  blackListed: { type: Boolean, default: false },
});

export const Token = mongoose.model("Token", TokenSchema, "token");
