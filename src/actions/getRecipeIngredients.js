"use server";

const pool = require("@/utils/pg");

const getRecipeIngredients = async (id) => {
  const q = await pool.query(
    `SELECT 
    r.id AS recipe_id,
    r.name AS recipe_name,
    r.slug,
    i.id AS ingredient_id,
    i.name AS ingredient_name,
    i.quantity,
    i.unit
FROM 
    recipes r
LEFT JOIN 
    ingredients i ON r.id = i.recipe_id
WHERE 
    r.id = $1;`,
    [id]
  );
  return structuredClone(q.rows);
};

export default getRecipeIngredients;
