"use server";

const { revalidatePath } = require("next/cache");

const revalidateRecipe = (slug) => {
  revalidatePath(`/recipes/${slug}/edit`, "layout");
};

export default revalidateRecipe;
