"use server";

import pool from "@/utils/pg";

const createRecipe = async (name) => {
  const q = await pool.query(`INSERT INTO recipes (name) VALUES ($1) RETURNING slug;`, [name]);
  return structuredClone(q.rows[0]);
};

export default createRecipe;
