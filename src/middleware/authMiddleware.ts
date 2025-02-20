import { NextFunction, Request, Response } from "express";

import { Token } from "../models/token";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { validateJWT } from "../utils/jwtValidator";

dotenv.config();

export interface AuthRequest extends Request {
  user?: any; // Attach decoded user data
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Unauthorized: Token missing" });
    }
    const decoded = validateJWT(req);
    if (!decoded) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
      return;
    }
    const tokenRecord = await Token.findOne({ emailOrPhone: decoded.username });
    if (!tokenRecord || tokenRecord.blackListed) {
      res.status(401).json({ error: "Token is invalid or blacklisted" });
      return;
    }

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
