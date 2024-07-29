"use server";

const pool = require("@/utils/pg");

const saveEditedRecipe = async ({ content, id }) => {
  const query = `
    UPDATE recipes SET instructions = $1 WHERE id = $2 RETURNING *;
    `;
  const req = await pool.query(query, [content, id]);
  return req.rows[0];
};

export default saveEditedRecipe;
