"use client";

import Image from "next/image";
import "../../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAmountDisplay } from "../../utils/displayText";

export default function Recipe() {
  const router = useRouter();
  const { recipe_name } = router.query;

  const [data, setData] = useState<{
    title: string;
    description: string;
    instructions: string;
    tips: string;
    image: string;
    ingredients: {
      name: string;
      amount: string;
      unit: string;
      optional: boolean;
    }[];
  }>({
    title: "",
    description: "",
    instructions: "",
    tips: "",
    ingredients: [],
    image: "",
  });

  const getIngredientItem = (ingredient) => {
    const amount = getAmountDisplay(parseFloat(ingredient.amount));
    const unit = ingredient.unit
      ? `${ingredient.unit} of ${ingredient.name}`
      : `${ingredient.name}`;

    return <li key={ingredient.name}>{`${amount} ${unit}`}</li>;
  };

  useEffect(() => {
    if (recipe_name) {
      fetch(`http://localhost:8000/api/recipes/${recipe_name}/`)
        .then((response) => response.json())
        .then((recipe) => {
          setData({
            title: recipe.title || "",
            description: recipe.description || "",
            instructions: recipe.instructions || "",
            tips: recipe.tips || "",
            ingredients: recipe.ingredients || [],
            image: recipe.image || "",
          });
        });
    }
  }, [recipe_name]);

  return (
    <div className="flex bg-gray-100">
      <div>
        <div className="flex p-4">
          <Image
            src={data.image || "/static/recipe_default.jpg"}
            alt="Recipe Image"
            width={150}
            height={150}
            className="rounded-md"
            priority={true}
          />
          <div className="flex-auto container mx-auto px-4">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="mb-4">{data.description || ""}</p>
          </div>
        </div>

        <div className="flex mt-4">
          <div className="container h-full mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Instructions</h3>
                <p>{data.instructions || ""}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Tips</h3>
                <p>{data.tips || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-none w-72  min-h-screen px-4 py-8">
        <div className="bg-white h-full rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold mb-2">Ingredients</h3>
          <h4 className="text-xl mb-2">Main Ingredients</h4>
          <ul className="list-disc ml-6 mb-4">
            {data.ingredients
              .filter((ingredient) => !ingredient.optional)
              .map((ingredient) => getIngredientItem(ingredient))}
          </ul>
          <h4 className="text-xl mb-2">Optional Ingredients</h4>
          <ul className="list-disc ml-6 mb-4">
            {data.ingredients
              .filter((ingredient) => !!ingredient.optional)
              .map((ingredient) => getIngredientItem(ingredient))}
          </ul>
        </div>
      </div>
    </div>
  );
}
