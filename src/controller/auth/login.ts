import { Request, Response } from "express";

import { AppConfig } from "../../models/appConfig";
import { User } from "../../models/users";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { rateLimiter } from "../common/rateLimiter";

dotenv.config();

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, ipAddress } = req.body;
    const IP = ipAddress;
    const config = await AppConfig.findOne();
    const maxLockAttempts = config?.lockAttempt || 5;

    const LOGIN_LIMIT = config?.loginLimit || 5;
    const WINDOW_MINUTES = config?.windowMinutes || 15;

    const key = `${IP}`;
    const isBlocked = await rateLimiter(key, LOGIN_LIMIT, WINDOW_MINUTES);
    if (isBlocked) {
      res
        .status(429)
        .json({ message: "Too many login attempts. Try again later." });
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    if (user.lockUser === 1) {
      res
        .status(403)
        .json({ message: "Account is locked. Please contact JustoGlobal." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      user.lockAttempt = (user.lockAttempt || 0) + 1;
      if (user.lockAttempt >= maxLockAttempts) {
        user.lockUser = 1;
      }
      await user.save();
      res.status(401).json({ message: "Invalid username or password" });
    }
    user.lockAttempt = 0;
    await user.save();

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const payload = {
      userId: user.id,
      username: user.username,
      accessToken: token,
    };

    res.status(200).json({ message: "Login successful", payload });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
