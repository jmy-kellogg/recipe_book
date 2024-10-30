"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "../styles/globals.css";

export default function Recipe() {
  return (
    <div className="bg-gray-100">
      <h1 className="text-3xl font-bold text-center p-4">Recipe Name</h1>
      <div className="flex mt-4">
        <div className="flex-3 container mx-auto px-4 py-8">
          <p className="text-lg text-center mb-4">
            Description of the recipe...
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold mb-2">Ingredients</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
              {/* Add more ingredients as needed */}
            </ul>
          </div>
        </div>
        <div className="flex-2 container mx-auto px-4 py-8">
          <Image
            src="/static/recipe_default.jpg"
            alt="Recipe Image"
            width={300}
            height={200}
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold mb-2">Instructions</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>Step 1</li>
            <li>Step 2</li>
            <li>Step 3</li>
            {/* Add more steps as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
}
