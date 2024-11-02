"use client";

import { useEffect, useState } from "react";
import { getDisplayText } from "../app/helper/displayText";
import "../styles/globals.css";

export default function SubstitutionTool() {
  interface Substitution {
    main: string;
    ingredients: {
      ingredient: string;
      multiplier: number;
      unit: string;
    }[];
  }
  interface SubstitutionInfo {
    amount: number;
    unit: string;
    substitutions: Substitution[];
  }

  const [ingredient, setIngredient] = useState<string>("baking_soda");
  const [fromAmount, setFromAmount] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("teaspoon");
  const [substitutions, setSubstitutions] = useState<Substitution[]>([]);

  const substitutionList: { [key: string]: SubstitutionInfo } = {
    baking_soda: {
      amount: 1,
      unit: "teaspoon",
      substitutions: [
        {
          main: "baking_powder",
          ingredients: [
            {
              ingredient: "baking_powder",
              multiplier: 4,
              unit: "teaspoon",
            },
          ],
        },
        {
          main: "potassium_bicarbonate",
          ingredients: [
            {
              ingredient: "potassium_bicarbonate",
              multiplier: 1,
              unit: "teaspoon",
            },
            {
              ingredient: "salt",
              multiplier: 0.333,
              unit: "teaspoon",
            },
          ],
        },
      ],
    },
  };
  const ingredientsList: { value: string; label: string }[] = Object.keys(
    substitutionList
  ).map((ingredient) => ({
    value: ingredient,
    label: getDisplayText(ingredient),
  }));

  useEffect(() => {
    const subInfo = substitutionList[ingredient] || {};

    setFromUnit(subInfo.unit || "");
    setFromAmount(subInfo.amount.toString() || "");
    setSubstitutions(subInfo.substitutions || []);
  }, [ingredient]);

  return (
    <div className="bg-gray-100 h-screen">
      <h1 className="text-3xl p-4 font-bold text-center">
        Ingredient Conversion Tool
      </h1>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 my-4">
          <div className="mx-2">
            <h3 className="text-xl font-bold mb-2">Ingredient</h3>
            <select
              className="border border-gray-300 rounded-l-md p-2 mb-4 h-10"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            >
              {ingredientsList.map((ingredient) => (
                <option key={ingredient.value} value={ingredient.value}>
                  {ingredient.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="border border-gray-300 p-2 mb-4 h-10"
              placeholder="Amount"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
            ></input>

            <input
              type="string"
              className="border border-gray-300 rounded-r-md p-2 mb-4 h-10"
              placeholder="Unit"
              value={fromUnit}
              readOnly
            ></input>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 my-4">
          <h3 className="text-xl font-bold mb-2">Substitutions</h3>
          {substitutions.map((substitution, index) => (
            <div key={index} className="container mx-4">
              <h3 className="text-l font-bold mb-2">
                {getDisplayText(substitution.main || "")}
              </h3>
              {substitution.ingredients.map((ingredient, index) => (
                <div key={index} className="flex">
                  <input
                    type="string"
                    className="border border-gray-300 rounded-l-md p-2 mb-4 h-10"
                    value={ingredient.ingredient}
                    readOnly
                  ></input>
                  <input
                    type="number"
                    className="border border-gray-300 p-2 mb-4 h-10"
                    placeholder="Amount"
                    value={(
                      parseInt(fromAmount) * ingredient.multiplier
                    ).toString()}
                    readOnly
                  ></input>
                  <input
                    type="string"
                    className="border border-gray-300 rounded-r-md p-2 mb-4 h-10"
                    placeholder="Unit"
                    value={ingredient.unit}
                    readOnly
                  ></input>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
