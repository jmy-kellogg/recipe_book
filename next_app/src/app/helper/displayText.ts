interface DisplayText  { [key: string]: string }

export const ingredientsDisplay: DisplayText = {
  baking_soda: "Baking Soda",
  baking_powder: "Baking Powder",
  potassium_bicarbonate: "Potassium Bicarbonate",
  salt: "Salt",
  water: "Water",
  flour: "Flour",
  sugar: "Sugar",
  butter: "Butter",
  cream_of_tartar: "Cream of Tartar",
};

export const unitDisplay: DisplayText = {
  cup: "Cup",
  tablespoon: "Tablespoon",
  teaspoon: "Teaspoon",
  ounce: "Ounce",
  pound: "Pound",
  fluid_ounce: "Fluid Ounce",
  gram: "Gram",
  kilogram: "Kilogram",
  milliliter: "Milliliter",
  liter: "Liter",
};

export const amountDisplay: DisplayText = {
  0.125: "1/8",
  0.25: "1/4",
  0.333: "1/3",
  0.5: "1/2",
  0.625: "5/8",
  0.666: "2/3",
  0.875: "7/8",
  0.75: "3/4",
}

export const displayList: DisplayText = {
  ...ingredientsDisplay,
  ...unitDisplay,
  ...amountDisplay,
};

export const getDisplayText = (key: string) => {
  return displayList[key] || key;
};

export const getAmountDisplay = (amount: number) => {
  const decimalStr = (amount % 1).toFixed(3).toString().slice(0, 5);
  const wholePortion = Math.floor(amount) || "";
  const decimalPortion = amount % 1 < 1 ? amountDisplay[decimalStr] : "" 
 
  return [wholePortion, decimalPortion].join(" ");
}
