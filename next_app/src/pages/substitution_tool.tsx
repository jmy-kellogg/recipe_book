"use client";

import { useState } from "react";
import { getDisplayText, getAmountDisplay } from "../app/helper/displayText";
import { SelectOption } from "../app/helper/interfaces";
import "../styles/globals.css";

interface SubIngredients {
  ingredient: string;
  amount: number;
  unit: string;
}
interface Substitution {
  main: string;
  ingredients: SubIngredients[];
}
interface SubstitutionData {
  amount: number;
  unit: string;
  ingredient: string;
  substitutions: Substitution[];
}

export default function SubstitutionTool() {
  const substitutionList: SubstitutionData[] = [
    {
      amount: 1,
      unit: "teaspoon",
      ingredient: "baking_soda",
      substitutions: [
        {
          main: "baking_powder",
          ingredients: [
            {
              ingredient: "baking_powder",
              amount: 4,
              unit: "teaspoon",
            },
          ],
        },
        {
          main: "potassium_bicarbonate",
          ingredients: [
            {
              ingredient: "potassium_bicarbonate",
              amount: 1,
              unit: "teaspoon",
            },
            {
              ingredient: "salt",
              amount: 0.333,
              unit: "teaspoon",
            },
          ],
        },
      ],
    },
  ];

  const [fromAmount, setFromAmount] = useState<string>("1");
  const [originalIngredient, setOriginalIngredient] =
    useState<SubstitutionData>(substitutionList[0]);

  const ingredientsList: SelectOption[] = substitutionList.map(
    ({ ingredient }) => ({
      value: ingredient,
      label: getDisplayText(ingredient),
    })
  );

  const calculateSubstitution = (subIngredient: SubIngredients) => {
    if (!fromAmount || !parseInt(fromAmount)) return "0";

    const calcInputAmount = parseInt(fromAmount) / originalIngredient.amount;
    let calcTotal = calcInputAmount * subIngredient.amount;
    const decimal = calcTotal % 1;

    if (decimal > 0.9) {
      // round up to whole number
      calcTotal = Math.ceil(calcTotal);
    } else if (decimal > 0.3 && decimal < 0.4) {
      // round to 1/3
      calcTotal = Math.floor(calcTotal) + 0.333;
      // round to 2/3
    } else if (decimal > 0.6 && decimal < 0.7) {
      calcTotal = Math.floor(calcTotal) + 0.666;
    }

    return getAmountDisplay(calcTotal);
  };

  const setIngredient = (ingredient: string) => {
    const subInfo = substitutionList.find(
      (data) => data.ingredient === ingredient
    );
    if (subInfo) {
      setOriginalIngredient(subInfo);
      setFromAmount(subInfo.amount.toString() || "");
    }
  };

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
              value={originalIngredient.ingredient}
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
              min="1"
              onChange={(e) => setFromAmount(e.target.value)}
            ></input>

            <input
              type="string"
              className="border border-gray-300 rounded-r-md p-2 mb-4 h-10"
              placeholder="Unit"
              value={originalIngredient.unit}
              readOnly
            ></input>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 my-4">
          <h3 className="text-xl font-bold mb-2">Substitutions</h3>
          {originalIngredient.substitutions.map((substitution, index) => (
            <div key={index} className="container m-4">
              <h3 className="text-l font-bold mb-2">
                {getDisplayText(substitution.main || "")}
              </h3>
              <ul className="mx-4">
                {substitution.ingredients.map((ingredient, index) => (
                  <li className="list-disc mx-4" key={index}>
                    {getDisplayText(ingredient.ingredient)}:{" "}
                    {calculateSubstitution(ingredient)} {ingredient.unit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
