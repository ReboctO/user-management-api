import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import { connectDB, sequelize } from "./config/db";
import User from "./models/users.model";

dotenv.config();

const app = express();

// Connect to MySQL
connectDB();

// Middleware
app.use(bodyParser.json());

// User routes
app.use("/api/users", userRoutes);

// Sync models with database
sequelize.sync().then(() => {
  console.log("✅ Database synchronized successfully.");
});

export default app;
