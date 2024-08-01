"use client";

import createRecipe from "@/actions/createRecipe";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NewRecipeButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const createBlankRecipe = async () => {
    setLoading(true);
    const r = await createRecipe(recipe);
    if (r) {
      router.push(`/recipes/${r.slug}/edit`);
    }
    setLoading(false);
  };
  return (
    <>
      <button
        className="inline-block px-4 py-2 bg-primary text-white rounded-md outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        Create New Recipe
      </button>
      {showModal && (
        <div
          className={`absolute top-0 left-0 h-full w-full bg-black/25 z-50 items-center justify-center ${
            showModal ? "flex" : "hidden"
          } backdrop-blur-md`}
        >
          <div className="bg-primary p-6 rounded-lg space-y-4">
            <h1 className="text-2xl text-white mb-3">Title of New Recipe</h1>
            <div>
              <input name="recipe" type="text" value={recipe} className="w-96 rounded-lg" onChange={(e) => setRecipe(e.target.value)} />
            </div>
            <div className="flex flex-nowrap gap-x-4">
              <button
                className="inline-block px-4 py-2 bg-white text-primary rounded-md outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition-all w-1/2"
                onClick={() => {
                  createBlankRecipe();
                }}
              >
                {loading ? "Creating..." : "Create"}
              </button>
              <button
                className="inline-block px-4 py-2 bg-white text-primary rounded-md outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition-all w-1/2"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default NewRecipeButton;
