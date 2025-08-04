// controllers/ingredientController.js
import Ingredient from "../models/Ingredient.js";

// POST /api/ingredients/:recipeId
export const addIngredient = async (req, res) => {
  const { name, quantity } = req.body;
  const { recipeId } = req.params;

  const ingredient = await Ingredient.create({
    name,
    quantity,
    recipe: recipeId,
  });

  res.status(201).json(ingredient);
};

// PUT /api/ingredients/:id
export const updateIngredient = async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);

  if (!ingredient) {
    return res.status(404).json({ message: "Ingredient not found" });
  }

  ingredient.name = req.body.name || ingredient.name;
  ingredient.quantity = req.body.quantity || ingredient.quantity;

  const updated = await ingredient.save();
  res.json(updated);
};

// DELETE /api/ingredients/:id
export const deleteIngredient = async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);

  if (!ingredient) {
    return res.status(404).json({ message: "Ingredient not found" });
  }

  await ingredient.remove();
  res.json({ message: "Ingredient deleted" });
};
