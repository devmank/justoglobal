import { Request, Response } from "express";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { validateJWT } from "../../utils/jwtValidator";

dotenv.config();
interface AuthRequest extends Request {
  user?: any;
}
export const getTime = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({
      message: "Token verified successfully",
      serverTime: new Date().toISOString(),
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
