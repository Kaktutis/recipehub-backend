// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  getMe,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);

// router.post("/login", loginUser);

router.get("/me", getMe);

export default router;
