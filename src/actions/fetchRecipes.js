"use server";

import pool from "@/utils/pg";

const { cache } = require("react");

const fetchRecipes = cache(async () => {
  try {
    const data = await pool.query(`SELECT * FROM recipe_with_ingredients;`);

    if (data.rowCount === 0) return null;
    return { data: data.rows, status: 200 };
  } catch (error) {
    return { data: null, error: error.message };
  }
});

export default fetchRecipes;
