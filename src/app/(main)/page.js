import fetchRecipes from "@/actions/fetchRecipes";
import RecipeCard from "@/components/recipe-card/RecipeCard";

const dynamic = "force-dynamic";

export default async function Home() {
  const { data, status } = await fetchRecipes();
  if (status !== 200) {
    throw new "Failed to fetch recipes"();
  }
  return (
    <main className="">
      <div className="p-4 md:px-8 md:py-8 lg:px-10 grid gap-y-5 grid-cols-1 md:grid-cols-3 md:gap-x-6 lg:grid-cols-5">
        {data.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
      </div>
    </main>
  );
}
