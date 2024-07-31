import dynamic from "next/dynamic";

import pool from "@/utils/pg";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGFM from "remark-gfm";
import { revalidatePath } from "next/cache";
import getRecipe from "@/actions/getRecipe";
import EditIngredients from "@/components/forms/EditIngredients";
import getRecipeIngredients from "@/actions/getRecipeIngredients";
const DynamicEditor = dynamic(() => import("@/components/editor/MDXEditor"), { ssr: false });

const handleSave = async (id, content) => {
  "use server";
  const q = await pool.query(`UPDATE recipes SET instructions = $1 WHERE id = $2 RETURNING instructions`, [content, id]);

  revalidatePath(`/recipes/[${id}]/edit`, "page");
  return q.rows;
};

const Page = async ({ params }) => {
  const recipe = await getRecipe(params.slug);

  const ingredients = await getRecipeIngredients(recipe.id);
  return (
    <>
      <div className="flex flex-nowrap">
        <div className="w-1/2 h-full">
          <DynamicEditor markdown={recipe?.instructions || ""} handleSave={handleSave} id={recipe?.id} />
        </div>
        <div className="w-1/2 h-full">
          <article className="prose px-8 text-md">
            <h1 className="mt-4">{recipe.name}</h1>
            <MDXRemote
              source={recipe?.instructions || ""}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGFM],
                  rehypePlugins: [],
                },
              }}
            />
          </article>
        </div>
      </div>
      <div className="flex gap-x-14">
        <div className="px-14 w-1/2">
          {/* <KeyValue id={recipe.id} slug={recipe.slug} /> */}
          <EditIngredients ingredients={ingredients} recipeId={recipe.id} slug={recipe.slug} />
        </div>
      </div>
    </>
  );
};
export default Page;
