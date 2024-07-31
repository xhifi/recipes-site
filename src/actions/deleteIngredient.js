"use server";

import pool from "@/utils/pg";

const deleteIngredient = async (id) => {
  const q = await pool.query(`DELETE FROM ingredients WHERE id = $1 RETURNING *`, [id]);
  return structuredClone(q.rows[0]);
};

export default deleteIngredient;
