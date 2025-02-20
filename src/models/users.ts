import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lockAttempt: { type: Number, default: 0 },
  lockUser: { type: Number, default: 0 },
});

export const User = mongoose.model("User", UserSchema, "user");
