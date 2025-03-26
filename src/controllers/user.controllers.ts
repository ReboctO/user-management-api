import { Request, Response } from "express";
import User from "../models/users.model"; // Correct path to your model


// Update user by ID
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  await user.update(req.body);
  res.json(user);
  return;
};

