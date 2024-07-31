"use client";

import { useState } from "react";
import deleteIngredient from "../../actions/deleteIngredient";
import updateIngredients from "../../actions/updateIngredients";
import revalidateRecipe from "../../actions/revalidateRecipe";

const Input = ({ name, value, onChange }) => {
  return <input type="text" name={name} value={value} onChange={onChange} className="rounded-md" />;
};

const EditIngredients = ({ ingredients, recipeId, slug }) => {
  const [saveStatus, setSaveStatus] = useState(false);
  const [allIngredients, setAllIngredients] = useState(
    ingredients.map((ingredient) => {
      return {
        ingredient_id: ingredient.ingredient_id,
        ingredient_name: ingredient.ingredient_name,
        quantity: ingredient.quantity || "",
        unit: ingredient.unit || "",
        update: true,
        create: false,
      };
    })
  );

  const handleChange = (attribute, i, e) => {
    setSaveStatus(false);
    const newIngredients = [...allIngredients];
    newIngredients[i][attribute] = e.target.value;
    return setAllIngredients(newIngredients);
  };

  const handleDelete = async (id, i) => {
    setSaveStatus(false);
    if (!id) {
      const newIngredients = [...allIngredients];
      newIngredients.splice(i, 1);
      return setAllIngredients(newIngredients);
    }
    const ingredient = await deleteIngredient(id);
    if (ingredient) {
      const newIngredients = [...allIngredients];
      newIngredients.splice(i, 1);
      setAllIngredients(newIngredients);
    }
  };

  const handleAddMore = () => {
    setSaveStatus(false);
    setAllIngredients([
      ...allIngredients,
      {
        ingredient_id: null,
        ingredient_name: "",
        quantity: "",
        unit: "",
        update: false,
        create: true,
      },
    ]);
  };

  const handleSave = async () => {
    setSaveStatus(false);
    const updated = await updateIngredients(allIngredients, recipeId);

    if (updated) {
      setAllIngredients([...updated]);
      revalidateRecipe(slug);
      return setSaveStatus(true);
    }
  };

  return (
    <div className="py-4 space-y-4">
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Qty.</th>
            <th>Unit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allIngredients.map((ingredient, i) => {
            if (ingredient.ingredient_name === null) return;
            return (
              <tr key={ingredient.ingredient_id}>
                <td>
                  <Input
                    key={ingredient?.ingredient_id}
                    name="name"
                    value={ingredient?.ingredient_name}
                    onChange={(e) => handleChange("ingredient_name", i, e)}
                  />
                </td>
                <td>
                  <Input
                    key={ingredient.ingredient_id}
                    name="quantity"
                    value={ingredient?.quantity}
                    onChange={(e) => handleChange("quantity", i, e)}
                  />
                </td>
                <td>
                  <Input key={ingredient.ingredient_id} name="unit" value={ingredient?.unit} onChange={(e) => handleChange("unit", i, e)} />
                </td>
                <td>
                  <button className={buttonClass} onClick={() => handleDelete(ingredient?.ingredient_id, i)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="space-x-2">
        <button className={buttonClass} onClick={handleAddMore}>
          Add More
        </button>
        <button className={buttonClass} onClick={() => handleSave()}>
          Save
        </button>
        <p className="inline text-green-500">{saveStatus && "Saved"}</p>
      </div>
    </div>
  );
};

const buttonClass =
  "inline-block px-4 py-2 bg-primary text-white rounded-md outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all";

export default EditIngredients;
