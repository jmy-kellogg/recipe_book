"use client";

import { useEffect, useState } from "react";
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

  const conversionChart: { [key: string]: { [key: string]: number } } = {
    cup: {
      cup: 1,
      tablespoon: 16,
      teaspoon: 48,
      ounce: 8,
      pound: 0.5,
      fluid_ounce: 8,
      gram: 236.588,
      kilogram: 0.236588,
      milliliter: 236.588,
      liter: 0.236588,
    },
    tablespoon: {
      cup: 0.0625,
      tablespoon: 1,
      teaspoon: 3,
      ounce: 0.5,
      pound: 0.03125,
      fluid_ounce: 0.5,
      gram: 14.7868,
      kilogram: 0.0147868,
      milliliter: 14.7868,
      liter: 0.0147868,
    },
    teaspoon: {
      cup: 0.0208333,
      tablespoon: 0.333333,
      teaspoon: 1,
      ounce: 0.166667,
      pound: 0.0104167,
      gram: 4.92892,
      kilogram: 0.00492892,
      milliliter: 4.92892,
      liter: 0.00492892,
    },
    ounce: {
      cup: 0.125,
      tablespoon: 2,
      teaspoon: 6,
      ounce: 1,
      pound: 0.0625,
      gram: 28.3495,
      kilogram: 0.0283495,
      milliliter: 28.3495,
      liter: 0.0283495,
    },
    pound: {
      cup: 2,
      tablespoon: 32,
      teaspoon: 96,
      ounce: 16,
      pound: 1,
      gram: 453.592,
      kilogram: 0.453592,
      milliliter: 453.592,
      liter: 0.453592,
    },
    fluid_ounce: {
      cup: 0.125,
      tablespoon: 2,
      teaspoon: 6,
      ounce: 1,
      pound: 0.0625,
      gram: 29.5735,
      kilogram: 0.0295735,
      milliliter: 29.5735,
      liter: 0.0295735,
    },
    gram: {
      cup: 0.00422675,
      tablespoon: 0.067628,
      teaspoon: 0.202884,
      ounce: 0.03527396,
      pound: 0.00220462,
      fluid_ounce: 0.033814,
      gram: 1,
      kilogram: 0.001,
      milliliter: 1,
      liter: 0.001,
    },
    kilogram: {
      cup: 4.22675,
      tablespoon: 67.628,
      teaspoon: 202.884,
      ounce: 35.27396,
      pound: 2.20462,
      fluid_ounce: 33.814,
      gram: 1000,
      kilogram: 1,
      milliliter: 1000,
      liter: 1,
    },
    milliliter: {
      cup: 0.00422675,
      tablespoon: 0.067628,
      teaspoon: 0.202884,
      ounce: 0.03527396,
      pound: 0.00220462,
      fluid_ounce: 0.033814,
      gram: 1,
      kilogram: 0.001,
      milliliter: 1,
      liter: 0.001,
    },
    liter: {
      cup: 4.22675,
      tablespoon: 67.628,
      teaspoon: 202.884,
      ounce: 35.27396,
      pound: 2.20462,
      fluid_ounce: 33.814,
      gram: 1000,
      kilogram: 1,
      milliliter: 1000,
      liter: 1,
    },
  };

  const calculateConversion = () => {
    // Convert imperial to metric
    const intFrom = parseInt(fromAmount || "0");
    const multiplyBy = conversionChart[fromUnit][toUnit] || 0;
    let intTo = intFrom * multiplyBy;

    if (fromUnit === "cup") {
      intTo = intFrom * 236.588;
    } else if (fromUnit === "tablespoon") {
      intTo = intFrom * 14.7868;
    } else if (fromUnit === "teaspoon") {
      intTo = intFrom * 4.92892;
    } else if (fromUnit === "ounce") {
      intTo = intFrom * 28.3495;
    } else if (fromUnit === "pound") {
      intTo = intFrom * 453.592;
    } else if (fromUnit === "fluid ounce") {
      intTo = intFrom * 29.5735;
    }
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
