import { Request, Response } from "express";

import { Token } from "../../models/token";

export const kickoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.body;
    if (!username) {
      res.status(400).json({ message: "Username is required" });
      return;
    }

    const result = await Token.updateMany(
      { emailOrPhone: username },
      { $set: { blacklisted: true } }
    );

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "No active tokens found for this user" });
      return;
    }

    res.status(200).json({ message: `User ${username} has been kicked out` });
  } catch (error) {
    console.error("Error kicking out user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
