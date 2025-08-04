import express from "express";
import {
  addIngredient,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredientController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:recipeId", protect, addIngredient);
router.put("/:id", protect, updateIngredient);
router.delete("/:id", protect, deleteIngredient);

export default router;
