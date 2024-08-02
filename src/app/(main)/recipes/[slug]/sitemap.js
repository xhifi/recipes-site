import fetchRecipes from "@/actions/fetchRecipes";

export default async function sitemap() {
  const recipes = await fetchRecipes();
  console.log(`METADATA`, recipes);

  return recipes.map((recipe) => ({
    url: `https://recipes-site.vercel.app/recipes/${recipe.slug}`,
    lastModified: new Date(recipe.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
