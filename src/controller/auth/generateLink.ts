import { Request, Response } from "express";

import { Token } from "../../models/token";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const generateLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const EXPIRY_TIME_MINUTES_ENV = process.env.LINK_EXPIRY || 10;
    const { emailOrPhone } = req.body;
    if (!emailOrPhone) {
      res.status(400).json({ message: "Email or phone is required" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const EXPIRY_TIME_MINUTES = Number(EXPIRY_TIME_MINUTES_ENV) || 15; // Default to 15 mins if not set

    const expiresAt = new Date(Date.now() + EXPIRY_TIME_MINUTES * 60000);

    await Token.create({ emailOrPhone, token, expiresAt, used: false });

    const link = `${process.env.BASE_URL}/auth/verifyToken/${token}`;

    res.status(200).json({ message: "One-time link generated", link });
  } catch (error) {
    console.error("Error generating link:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
