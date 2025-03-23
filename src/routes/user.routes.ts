import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers";
import { validateUserRequest } from "../middleware/validateRequest";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateUserRequest, createUser);
router.put("/:id", validateUserRequest, updateUser);
router.delete("/:id", deleteUser);

export default router;
