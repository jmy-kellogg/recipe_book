"use client";

import Image from "next/image";
import "../styles/globals.css";

export default function Recipe({ title = "Chocolate Candy" }) {
  return (
    <div className="flex bg-gray-100">
      <div>
        <div className="flex p-4">
          <Image
            src="/static/recipe_default.jpg"
            alt="Recipe Image"
            width={150}
            height={150}
          />
          <div className="flex-auto container mx-auto px-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mb-4">
              It was brought over from Poland, and as far as we know, never had
              a name. We just called it Chocolate Candy, or some people would
              know it as "no bake cookies".
            </p>
          </div>
        </div>

        <div className="flex mt-4">
          <div className="container h-full mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Instructions</h3>
                <ul className="list-disc ml-6 mb-4">
                  <li>
                    In a medium saucepan, combine the milk, sugar, margarine,
                    and cocoa
                  </li>
                  <li>
                    Bring the mixture to a boil over medium heat, stirring
                    constantly
                  </li>
                  <li>
                    Once it reaches a boil, allow it to boil for 1 minute
                    without stirring.{" "}
                  </li>
                  <li>Remove the saucepan from the heat. </li>
                  <li>
                    Stir in the oatmeal, vanilla, and optional coconut until
                    well combined.{" "}
                  </li>
                  <li>
                    Drop spoonfuls of the mixture onto the prepared wax paper.{" "}
                  </li>
                  <li>Allow the candies to cool and set completely.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Tips</h3>
                <ul className="list-disc ml-6 mb-4">
                  <li>
                    Ensure you do not boil the mixture for more than 1 minute to
                    avoid making the candy too hard.
                  </li>
                  <li>
                    Work quickly when dropping the candy mixture onto the wax
                    paper as it sets fast.
                  </li>
                </ul>
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
            <li>¼ cup of milk</li>
            <li>1 cup of sugar</li>
            <li>¼ cup of margarine</li>
            <li>2 tsp. cocoa</li>
            <li>1 cup + 2 tbsp of oatmeal</li>
            <li>½ tsp vanilla</li>
          </ul>
          <h4 className="text-xl mb-2">Optional Ingredients</h4>
          <ul className="list-disc ml-6 mb-4">
            <li>Coconut (as desired)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
