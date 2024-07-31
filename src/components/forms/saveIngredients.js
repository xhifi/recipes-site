"use server";

import pool from "@/utils/pg";

const saveIngredients = async (ingredients) => {
  const updated = ingredients.map(async (ingredient) => {
    const exists = await pool.query(`SELECT * FROM ingredients WHERE id = $1`, [ingredient.id]);

    if (!ingredient.ingredient_name) return;
    if (ingredient.new) {
      const q = await pool.query(`INSERT INTO ingredients (name, unit, quantity, recipe_id) VALUES ($1, $2, $3, $4) RETURNING *`, [
        ingredient.ingredient_name || null,
        ingredient.unit || null,
        ingredient.quantity || null,
        ingredient.recipe_id || null,
      ]);
      return q.rows[0];
    }
    if (exists && ingredient.changed) {
      const q = await pool.query(`UPDATE ingredients SET name = $1, unit = $2, quantity = $3 WHERE id = $4 RETURNING *`, [
        ingredient.ingredient_name || null,
        ingredient.unit || null,
        ingredient.quantity || null,
        ingredient.id || null,
      ]);
      return q.rows[0];
    }
    return;
  });

  return structuredClone(await Promise.all(updated));
};

export default saveIngredients;
