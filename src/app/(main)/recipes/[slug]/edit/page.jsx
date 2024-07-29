import fetchRecipes from "@/actions/fetchRecipes";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import pool from "@/utils/pg";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGFM from "remark-gfm";
import { revalidatePath } from "next/cache";
const DynamicEditor = dynamic(() => import("@/components/editor/MDXEditor"), { ssr: false });

const handleSave = async (id, content) => {
  "use server";
  const q = await pool.query(`UPDATE recipes SET instructions = $1 WHERE id = $2 RETURNING instructions`, [content, id]);

  revalidatePath(`/recipes/[${id}]/edit`, "page");
  return q.rows;
};

const Page = async ({ params }) => {
  const { data, status } = await fetchRecipes();
  const recipe = data.find((recipe) => recipe.slug === params.slug);

  if (status !== 200 || !recipe) {
    notFound();
  }

  return (
    <div className="flex flex-nowrap">
      <div className="w-1/2 h-full">
        <Suspense fallback={<p>Loading...</p>}>
          <DynamicEditor markdown={recipe?.instructions || ""} handleSave={handleSave} id={recipe?.id} />
        </Suspense>
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
  );
};
export default Page;
