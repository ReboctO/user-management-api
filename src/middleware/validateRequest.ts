import { Request, Response, NextFunction } from "express";

// Validate user request body
export const validateUserRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, age } = req.body;

  // Check if all required fields are provided
  if (!name || !email || age === undefined) {
    res.status(400).json({
      message: "All fields (name, email, age) are required.",
    });
  }

  // Validate name (should be a non-empty string)
  if (typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({
      message: "Name must be a non-empty string.",
    });
  }

  // Validate email (basic email pattern)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || !emailRegex.test(email)) {
    res.status(400).json({
      message: "Invalid email format.",
    });
  }

  // Validate age (should be a number greater than 0)
  if (typeof age !== "number" || age <= 0) {
    res.status(400).json({
      message: "Age must be a valid number greater than 0.",
    });
  }

  next(); // Proceed if validation is successful
};
