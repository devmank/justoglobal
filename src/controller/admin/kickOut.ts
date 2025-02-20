import { Request, Response } from "express";

import { Token } from "../../models/token";

export const kickoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { usernames } = req.body;
    if (!Array.isArray(usernames) || usernames.length === 0) {
      res.status(400).json({ message: "Usernames array is required" });
      return;
    }

    const result = await Token.updateMany(
      { emailOrPhone: { $in: usernames } },
      { $set: { blacklisted: true } }
    );

    if (result.modifiedCount === 0) {
      res
        .status(404)
        .json({ message: "No active tokens found for the provided users" });
      return;
    }

    res
      .status(200)
      .json({ message: `Users have been kicked out successfully` });
  } catch (error) {
    console.error("Error kicking out users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
