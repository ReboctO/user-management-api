import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { connectDB, sequelize } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import { validateUserRequest } from "./middleware/validateRequest";

dotenv.config();

const app = express();

// ✅ Connect to MySQL
connectDB();

// ✅ Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// ✅ Apply validation middleware to POST and PUT routes
app.use("/api/users", (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    validateUserRequest(req, res, next);
  } else {
    next();
  }
});

// ✅ User routes
app.use("/api/users", userRoutes);

// ✅ Error handling middleware
app.use(errorHandler);

// ✅ Sync models with database
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
  });

export default app;
