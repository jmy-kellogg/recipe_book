"use client";

import Image from "next/image";
import "../../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAmountDisplay } from "../../utils/displayText";
import { PencilIcon } from "@heroicons/react/24/outline";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { RichTextarea, createRegexRenderer } from "rich-textarea";

export default function Recipe() {
  const router = useRouter();
  const { recipe_name } = router.query;
  const [editing, setEditing] = useState(false);
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

  const renderer = createRegexRenderer([
    [/[A-Z][a-z]+/g, { borderRadius: "3px", backgroundColor: "#d0bfff" }],
  ]);

  const getIngredientItem = (ingredient) => {
    const amount = getAmountDisplay(parseFloat(ingredient.amount));
    const unit = ingredient.unit
      ? `${ingredient.unit} of ${ingredient.name}`
      : `${ingredient.name}`;

    return <li key={ingredient.name}>{`${amount} ${unit}`}</li>;
  };

  const updateRecipe = () => {
    fetch(`http://localhost:8090/api/recipes/${recipe_name}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => setEditing(false));
  };

  useEffect(() => {
    if (recipe_name) {
      fetch(`http://localhost:8090/api/recipes/${recipe_name}/`)
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
      <div className="flex-auto container mx-auto px-4 py-8">
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
            <div className="flex">
              {editing ? (
                <textarea
                  className="w-full h-10 text-lg font-bold border-dashed border-2 border-gray-200 p-2"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                ></textarea>
              ) : (
                <h1 className="text-3xl font-bold">{data.title}</h1>
              )}

              {editing ? (
                <button className="ml-2" onClick={updateRecipe}>
                  <DocumentCheckIcon className="size-6" />
                </button>
              ) : (
                <button className="ml-2" onClick={() => setEditing(true)}>
                  <PencilIcon className="size-6" />
                </button>
              )}
            </div>
            {editing ? (
              <textarea
                className="w-full h-3/4 border-dashed border-2 border-gray-200 p-2"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              ></textarea>
            ) : (
              <p>{data.description || ""}</p>
            )}
          </div>
        </div>

        <div className="flex mt-4">
          <div className="container h-full mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Instructions</h3>
                {editing ? (
                  <RichTextarea
                    value={data.instructions}
                    onChange={(e) =>
                      setData({ ...data, instructions: e.target.value })
                    }
                  >
                    {renderer}
                  </RichTextarea>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.instructions || "",
                    }}
                  />
                )}
              </div>
              {(data.tips || editing) && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Tips</h3>
                  {editing ? (
                    <textarea
                      className="w-full border-dashed border-2 border-gray-200 p-2"
                      value={data.tips}
                      onChange={(e) =>
                        setData({ ...data, tips: e.target.value })
                      }
                    ></textarea>
                  ) : (
                    <p>{data.tips || ""}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-none w-72  min-h-screen px-4 py-8">
        <div className="bg-white h-full rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold mb-2">Ingredients</h3>
          <h4 className="text-xl mb-2">Main Ingredients</h4>
          <ul className="list-disc ml-6">
            {data.ingredients
              .filter((ingredient) => !ingredient.optional)
              .map((ingredient) => getIngredientItem(ingredient))}
          </ul>
          <div></div>
          {editing ? (
            <div className="flex justify-end mb-4">
              <button>
                <PlusIcon className="size-6" />
              </button>
            </div>
          ) : null}
          {(data.ingredients.filter(({ optional }) => optional).length ||
            editing) && (
            <div>
              <h4 className="text-xl mb-2">Optional Ingredients</h4>
              <ul className="list-disc ml-6 mb-4">
                {data.ingredients
                  .filter((ingredient) => !!ingredient.optional)
                  .map((ingredient) => getIngredientItem(ingredient))}
              </ul>
              {editing ? (
                <div className="flex justify-end mb-4">
                  <button>
                    <PlusIcon className="size-6" />
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
