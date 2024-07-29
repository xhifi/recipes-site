import Image from "next/image";
import Link from "../primitives/Link";
import Badge from "./Badge";

import AddedOn from "@/static/icons/added-on.svg";
import CookingClock from "@/static/icons/cooking-clock.svg";
import PreparationClock from "@/static/icons/preparation-clock.svg";

import SereneMountain from "@/static/images/serene_mountain.jpg";

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
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
            {new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "numeric" }).format(recipe?.created_at)}
          </Badge>
          <Badge icon={CookingClock}>{recipe?.cooking_time?.minutes}</Badge>
          <Badge icon={PreparationClock}>{recipe?.preparing_time?.minutes}</Badge>
        </div>
      </div>
      <div className="space-y-2 p-4 pt-1">
        <h1 className="text-2xl font-bold text-balance">{recipe.name}</h1>
      </div>
    </Link>
  );
};

export default RecipeCard;
