"use client";

import { useEffect, useState } from "react";
import { getAmountDisplay, getDisplayText } from "../utils/displayText";

interface Conversion {
  ingredient_id: string;
  from_unit_id: string;
  to_unit_id: string;
  factor: number;
}

interface ConversionChart {
  [key: string]: {
    [unit: string]: {
      [unit: string]: number;
    };
  };
}

export default function ConversionTool() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [conversions, setConversions] = useState<ConversionChart>({});
  const [ingredient, setIngredient] = useState<string>("water");
  const [fromAmount, setFromAmount] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:9090/api/rest/conversions/")
      .then((response) => response.json())
      .then(({ conversions }: { conversions: Conversion[] }) => {
        const ingredientsList = new Set(
          conversions.map(({ ingredient_id }: Conversion) => ingredient_id)
        );
        
        // Convert conversions array to ConversionChart format
        const conversionChart: ConversionChart = {};
        conversions.forEach(({ ingredient_id, from_unit_id, to_unit_id, factor }) => {
          if (!conversionChart[ingredient_id]) {
            conversionChart[ingredient_id] = {};
          }
          if (!conversionChart[ingredient_id][from_unit_id]) {
            conversionChart[ingredient_id][from_unit_id] = {};
          }
          conversionChart[ingredient_id][from_unit_id][to_unit_id] = factor;
        });
        
        const ingredientsArray = Array.from(ingredientsList);
        const firstIngredient = ingredientsArray[0];
        const fromUnit = firstIngredient ? Object.keys(conversionChart[firstIngredient] || {})[0] : "";
        const toUnit = firstIngredient && fromUnit ? Object.keys(conversionChart[firstIngredient][fromUnit] || {})[0] : "";
        
        setIngredients(ingredientsArray);
        setConversions(conversionChart);
        setIngredient(firstIngredient || "");
        setFromUnit(fromUnit || "");
        setToUnit(toUnit || "");
        setFromAmount("1");
      });
  }, []);

  const unitOptions = (ingredient: string) => {
    const availableUnits = Object.keys(conversions[ingredient] || []);
    return availableUnits.map((unit) => (
      <option key={unit} value={unit}>
        {getDisplayText(unit)}
      </option>
    ));
  };

  useEffect(() => {
    // todo: move to a helper function
    const intFrom = parseInt(fromAmount || "0");
    const ingredientsChart = conversions[ingredient] || {};
    const multiplyBy = ingredientsChart[fromUnit]?.[toUnit] || 0;
    const intTo = intFrom * multiplyBy;

    setToAmount(getAmountDisplay(intTo));
  }, [ingredient, fromAmount, fromUnit, toUnit, conversions]);

  return (
    <div className="bg-gray-100 h-screen">
      <h1 className="text-3xl p-4 font-bold text-center">
        Ingredient Conversion Tool
      </h1>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mx-2">
            <h3 className="text-xl font-bold mb-2">Ingredients</h3>
            <select
              className="border border-gray-300 rounded-md p-2 mb-4"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            >
              {ingredients.map((ingredient: string) => (
                <option key={ingredient} value={ingredient}>
                  {getDisplayText(ingredient)}
                </option>
              ))}
            </select>
          </div>

          <div className="container mx-2">
            <h3 className="text-xl font-bold mb-2">From Amount</h3>
            <div className="flex items-center mb-4">
              <input
                type="number"
                className="border border-gray-300 rounded-l-md p-2 mb-4 h-10"
                placeholder="Amount"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
              ></input>
              <select
                className="border border-gray-300 rounded-r-md p-2 mb-4 h-10"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {unitOptions(ingredient)}
              </select>
            </div>
          </div>
          <div className="container mx-2">
            <h3 className="text-xl font-bold mb-2">To Amount</h3>
            <div className="flex">
              <input
                className="border border-gray-300 rounded-l-md p-2 mb-4 h-10"
                placeholder="Amount"
                value={toAmount}
                readOnly
              ></input>
              <select
                className="border border-gray-300 rounded-r-md p-2 mb-4 h-10"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {unitOptions(ingredient)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
