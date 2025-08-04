import express from "express";

const router = express.Router();

// Static categories
const categories = [
  "Beef",
  "Chicken",
  "Dessert",
  "Lamb",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
  "Breakfast",
  "Goat",
];

router.get("/", (req, res) => {
  res.json(categories);
});

export default router;
