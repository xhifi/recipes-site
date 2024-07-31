"use client";

import { useEffect, useState } from "react";
import getRecipeIngredients from "./getRecipeIngredients";
import saveIngredients from "./saveIngredients";
import revalidateRecipe from "./revalidateRecipe";
import deleteIngredient from "./deleteIngredient";

const KeyValue = ({ id, slug }) => {
  const [ingredients, setIngredients] = useState(null);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const g = async () => {
      const r = await getRecipeIngredients(id);
      setIngredients(r);
    };
    g();
  }, [id]);

  console.log(ingredients);

  return (
    <>
      <table className="w-full">
        <thead className="sticky top-0 bg-slate-300">
          <tr className="border border-slate-700">
            <th className="text-left px-2 py-2">Name</th>
            <th className="text-left px-2 py-2">Unit</th>
            <th className="text-left px-2 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {ingredients?.map((i, index) => {
            if (!i) return;
            return (
              <tr key={i.id}>
                <td>
                  <input
                    name="name"
                    value={i.ingredient_name}
                    className="w-full"
                    onChange={(e) => {
                      setStatus(false);
                      const newIngredients = [...ingredients];
                      newIngredients[index].ingredient_name = e.target.value;
                      newIngredients[index].changed = !i.new && true;
                      setIngredients(newIngredients);
                    }}
                  />
                </td>
                <td>
                  <input
                    name="qty"
                    value={i.quantity}
                    className="w-full"
                    onChange={(e) => {
                      setStatus(false);
                      const newIngredients = [...ingredients];
                      newIngredients[index].quantity = e.target.value;
                      newIngredients[index].changed = !i.new && true;
                      setIngredients(newIngredients);
                    }}
                  />
                </td>
                <td>
                  <select
                    onChange={(e) => {
                      setStatus(false);
                      const newIngredients = [...ingredients];
                      newIngredients[index].unit = e.target.value;
                      newIngredients[index].changed = !i.new && true;
                      setIngredients(newIngredients);
                    }}
                    value={i.unit}
                  >
                    <option value="cup">Cup</option>
                    <option value="tsp">Tsp</option>
                    <option value="tbsp">Tbsp</option>
                    <option value="oz">Oz</option>
                    <option value="lb">Lb</option>
                    <option value="g">G</option>
                    <option value="kg">Kg</option>
                  </select>
                  <button
                    onClick={async () => {
                      const deleted = await deleteIngredient(i.ingredient_id);
                      console.log(deleted);
                      if (deleted) {
                        const newIngredients = [...ingredients];
                        newIngredients.splice(index, 1);
                        setIngredients(newIngredients);
                        revalidateRecipe(slug);
                      }
                      return;
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-wrap items-center gap-x-2">
        <button
          className="bg-primary text-white px-4 py-2 rounded-md my-2"
          onClick={() => {
            setStatus(false);
            setIngredients([
              ...ingredients,
              { ingredient_name: "", unit: "", quantity: "", recipe_id: id, recipe_name: ingredients[0]?.recipe_name || "", new: true },
            ]);
          }}
        >
          Add Another
        </button>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md my-2"
          onClick={async () => {
            await saveIngredients(ingredients);
            revalidateRecipe(slug);
            setStatus(true);
          }}
        >
          Save
        </button>
        <span>{status && "Saved"}</span>
      </div>
    </>
  );
};
export default KeyValue;
