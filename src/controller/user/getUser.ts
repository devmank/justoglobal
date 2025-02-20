import { Request, Response } from "express";

import { User } from "../../models/users";
import dotenv from "dotenv";

dotenv.config();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, "_id username name role");
    res.status(200).json({ message: "successful", users });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
