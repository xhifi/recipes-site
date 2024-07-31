"use server";

import pool from "@/utils/pg";

const updateIngredients = async (ingredients, recipeId) => {
  const updated = Promise.all(
    ingredients.map(async (ingredient) => {
      if (!ingredient.ingredient_name) return;
      if (ingredient.create) {
        const q = await pool.query(`INSERT INTO ingredients (name, unit, quantity, recipe_id) VALUES ($1, $2, $3, $4) RETURNING *`, [
          ingredient.ingredient_name,
          ingredient.unit || null,
          ingredient.quantity || null,
          recipeId,
        ]);
        const newIngredient = {
          ingredient_name: q.rows[0].name,
          ingredient_id: q.rows[0].id,
          quantity: q.rows[0].quantity,
          unit: q.rows[0].unit,
          create: false,
          update: true,
        };
        return newIngredient;
      }
      if (ingredient.update) {
        const q = await pool.query(`UPDATE ingredients SET name = $1, unit = $2, quantity = $3 WHERE id = $4 RETURNING *`, [
          ingredient.ingredient_name,
          ingredient.unit || null,
          ingredient.quantity || null,
          ingredient.ingredient_id,
        ]);
        const newIngredient = {
          ingredient_name: q.rows[0].name,
          ingredient_id: q.rows[0].id,
          quantity: q.rows[0].quantity,
          unit: q.rows[0].unit,
          create: false,
          update: true,
        };
        console.log(newIngredient);
        return newIngredient;
      }
      return;
    })
  );
  return updated;
};

export default updateIngredients;
