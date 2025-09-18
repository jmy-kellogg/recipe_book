"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Recipe {
  id: number;
  title: string;
  name: string;
  description: string;
  image: string;
}

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9090/api/rest/recipes/`)
      .then((response) => response.json())
      .then(({ recipes }) => {
        setRecipes(recipes);
      });
  }, []);

  return (
    <div className="bg-gray-100 h-full">
      <div className="container h-full mx-auto px-4 py-8">
        {recipes.map((recipe: Recipe) => (
          <Link
            key={recipe.id}
            href={`http://localhost:9000/recipes/${recipe.id}`}
          >
            <div className="bg-white rounded-lg shadow-lg m-4 p-8 h-auto">
              <div className="flex">
                <Image
                  src={recipe.image || "/static/recipe_default.jpg"}
                  alt="Recipe Image"
                  width={125}
                  height={125}
                  className="rounded-md"
                />
                <div>
                  <h1 className="text-2xl ml-4">{recipe.title}</h1>

                  <p className="m-4">{recipe.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
