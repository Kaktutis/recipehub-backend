import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: String, // e.g., "2 cups", "1 tsp", etc.
      required: true,
    },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Ingredient", ingredientSchema);