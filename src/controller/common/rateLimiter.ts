import { NextFunction, Request, Response } from "express";

import { RateLimit } from "../../models/rateLimit";

export const rateLimiter = async (
  key: string,
  limit: number,
  windowMinutes: number
): Promise<boolean> => {
  try {
    const windowMs = windowMinutes * 60 * 1000;
    const now = Date.now();

    let attempt = await RateLimit.findOne({ ip: key });

    if (!attempt) {
      await RateLimit.create({ ip: key, count: 1, timestamp: now });
      return false;
    }

    const timeElapsed = now - attempt.timestamp.getTime();

    if (timeElapsed > windowMs) {
      attempt.count = 1;
      attempt.timestamp = new Date();
      await attempt.save();
      return false;
    }

    if (attempt.count >= limit) {
      return true;
    }

    attempt.count++;
    await attempt.save();
    return false;
  } catch (error) {
    console.error("Rate limiting error:", error);
    return false;
  }
};
