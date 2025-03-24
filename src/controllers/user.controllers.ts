import { Request, Response } from "express";
import User from "../models/users.model"; // Correct path to your model


// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return; // ✅ Return after sending response
  }
  res.json(user);
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, age, password } = req.body;
  try {
    // ✅ Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const user = await User.create({ name, email, age, password });
    res.status(201).json(user);
    return;
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(400).json({ message: "Error creating user", error });
    return;
  }
};

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

// Delete user by ID
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  await user.destroy();
  res.json({ message: "User deleted successfully" });
  return;
};
