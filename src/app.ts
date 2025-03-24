import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import { connectDB, sequelize } from "./config/db";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();

// Connect to MySQL
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// User routes
app.use("/api/users", userRoutes);

// Sync models with database
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synchronized successfully.");
});

// Error handling middleware
app.use(errorHandler);

export default app;
