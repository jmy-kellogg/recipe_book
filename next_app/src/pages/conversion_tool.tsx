"use client";

import { useEffect, useState } from "react";
import water from "../app/conversions/water.json";
import flour from "../app/conversions/water.json";
import "../styles/globals.css";

export default function ConversionTool() {
  const [ingredients, setIngredients] = useState<string>("");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("cup");
  const [toAmount, setToAmount] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("gram");

  const unitList: string[] = [
    "cup",
    "tablespoon",
    "teaspoon",
    "ounce",
    "pound",
    "fluid_ounce",
    "gram",
    "kilogram",
    "milliliter",
    "liter",
  ];

  console.log(water);

  const conversionChart: any = {
    water: water,
    flour: flour,
    sugar: {},
    butter: {},
    milk: {},
    salt: {},
    pepper: {},
  };

  const calculateConversion = () => {
    // Convert imperial to metric
    const intFrom = parseInt(fromAmount || "0");
    const ingredientsChart = conversionChart[ingredients] || {};
    const multiplyBy = ingredientsChart[fromUnit]?.[toUnit] || 0;
    let intTo = intFrom * multiplyBy;

    setToAmount(intTo.toString());
  };

  useEffect(() => {
    calculateConversion();
  }, [ingredients, fromAmount, fromUnit, toUnit]);

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
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            >
              <option value="water">Water</option>
              <option value="flour">Flour</option>
              <option value="sugar">Sugar</option>
              <option value="butter">Butter</option>
              <option value="milk">Milk</option>
              <option value="water">Water</option>
              <option value="salt">Salt</option>
              <option value="pepper">Pepper</option>
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
                {unitList.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="container mx-2">
            <h3 className="text-xl font-bold mb-2">To Amount</h3>
            <div className="flex">
              <input
                type="number"
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
                {unitList.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
