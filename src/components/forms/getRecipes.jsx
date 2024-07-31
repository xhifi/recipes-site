"use server";

import pool from "@/utils/pg";

const getRecipes = async () => {
  const q = await pool.query(`SELECT * FROM recipe_with_ingredients;`);
  const recipes = q.rows;
  return JSON.stringify(recipes);
};

export default getRecipes;
