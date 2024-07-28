import { cache } from "react";
import Image from "next/image";

import Link from "@/components/primitives/Link";
import pool from "@/utils/pg";

import SereneMountain from "@/static/images/serene_mountain.jpg";
import AddedOn from "@/static/icons/added-on.svg";
import CookingClock from "@/static/icons/cooking-clock.svg";
import PreparationClock from "@/static/icons/preparation-clock.svg";

const dynamic = "force-dynamic";

export const fetchRecipes = cache(async () => {
  try {
    const data = await pool.query(`SELECT * FROM recipe_with_ingredients;`);
    if (data.rowCount === 0) return null;
    return data.rows;
  } catch (error) {
    return null;
  }
});

const Badge = ({ icon, children }) => {
  return (
    <div className="inline-block w-auto">
      <div className="text-sm space-x-2 bg-secondary/85 border-secondary border-2 px-2 pe-3 py-1 rounded-full flex items-center group-hover:bg-secondary transition-all">
        <Image src={icon} className="h-5 w-5 p-1 bg-primary rounded-3xl" alt="" />
        <span className="text-sm">{children}</span>
      </div>
    </div>
  );
};

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group h-full rounded-2xl overflow-hidden bg-primary text-neutral-100 shadow-lg shadow-black/35 hover:shadow-transparent transition-all"
    >
      <div className="w-full relative">
        <Image
          src={SereneMountain}
          className="w-full h-full rounded-2xl p-2 object-cover"
          alt={recipe.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-4 left-4 space-y-1 flex flex-wrap gap-x-2 items-center">
          <Badge icon={AddedOn}>
            {new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "numeric" }).format(recipe.created_at)}
          </Badge>
          <Badge icon={CookingClock}>{recipe?.cooking_time?.minutes}</Badge>
          <Badge icon={PreparationClock}>{recipe?.preparing_time.minutes}</Badge>
        </div>
      </div>
      <div className="space-y-2 p-4 pt-1">
        <h1 className="text-2xl font-bold text-balance">{recipe.name}</h1>
      </div>
    </Link>
  );
};

export default async function Home() {
  const data = await fetchRecipes();

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
