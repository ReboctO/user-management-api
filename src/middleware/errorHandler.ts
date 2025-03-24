import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error:", err.message || err);

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    res.status(400).json({
      message: "Validation error",
      errors: err.errors.map((error: any) => error.message),
    });
    return; // ✅ Return added here
  }

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message || "Something went wrong!",
  });
  return; // ✅ Return added here
};

export default errorHandler;
