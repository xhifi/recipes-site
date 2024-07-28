import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

import { fetchRecipes } from "../../page";
import SereneMountain from "@/static/images/serene_mountain.jpg";

export async function generateMetadata({ params }) {
  const recipes = await fetchRecipes();
  const recipe = recipes.find((recipe) => params.id === recipe.id.toString());

  return {
    title: recipe.name,
    description: recipe.description,
    image: recipe.image,
  };
}

const Page = async ({ params }) => {
  const recipes = await fetchRecipes();
  const recipe = recipes.find((recipe) => params.id === recipe.id.toString());

  return (
    <main className="">
      <div className="image relative h-96">
        <Image
          src={SereneMountain}
          alt={recipe.name}
          className="absolute object-cover object-center"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-0 left-0 p-4 md:p-8 lg:p-14">
          <h1 className="font-bold text-3xl bg-primary text-white px-6 py-2 rounded-full">{recipe.name}</h1>
        </div>
      </div>
      <div className="flex flex-col p-4 md:p-8 lg:p-14 lg:flex-row lg:gap-x-5 gap-y-5 justify-between">
        <aside className="lg:w-1/3 bg-secondary/25 p-5 rounded-2xl">
          <h2 className="font-bold text-2xl mb-3">Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <li key={index} className="border-b-2 border-primary/25 last-of-type:border-b-0 py-1">
                  {ingredient}
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="bg-primary/25 lg:w-[1px] h-[1px] lg:h-auto w-full"></div>

        <article className="w-full lg:py-4">
          <h2 className="font-bold text-2xl mb-3">Instructions</h2>
          <MDXRemote source={recipe.instructions} />
        </article>
      </div>
    </main>
  );
};
export default Page;
