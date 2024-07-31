"use server";

const { default: fetchRecipes } = require("./fetchRecipes");

const getRecipe = async (slug) => {
  const recipes = await fetchRecipes();
  const recipe = recipes.find((recipe) => recipe.slug === slug);

  return recipe;
};

export default getRecipe;
