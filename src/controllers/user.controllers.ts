import { Request, Response } from "express";
import User from "../models/users.model"; // Correct path to your model

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.findAll();
  res.json(users); // ✅ No return here
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
};

// Create a new user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, age } = req.body;
  try {
    const user = await User.create({ name, email, age });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
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
};
