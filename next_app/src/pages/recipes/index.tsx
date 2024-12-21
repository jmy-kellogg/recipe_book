"use client";

import "../../styles/globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/recipes/`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.recipes);
      });
  }, []);

  return (
    <div className="bg-gray-100 h-full">
      <div className="container h-full mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <h1>
                <Link href={`http://localhost:3000/recipes/${recipe.name}`}>
                  {recipe.title}
                </Link>
              </h1>
              <p>{recipe.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
