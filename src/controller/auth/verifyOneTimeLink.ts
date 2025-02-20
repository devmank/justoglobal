import { Request, Response } from "express";

import { Token } from "../../models/token";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params;
    if (!token) {
      res.status(400).json({ message: "Invalid or missing token" });
      return;
    }

    const tokenData = await Token.findOne({ token });
    if (!tokenData) {
      res.status(404).json({ message: "Token not found or invalid" });
      return;
    }

    if (tokenData.expiresAt < new Date()) {
      res.status(400).json({ message: "Token expired" });
      return;
    }

    if (tokenData.used) {
      res.status(400).json({ message: "Token already used" });
      return;
    }

    const jwtToken = jwt.sign(
      { emailOrPhone: tokenData.emailOrPhone },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    tokenData.used = true;
    await tokenData.save();

    res.status(200).json({ message: "Token verified", accessToken: jwtToken });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
