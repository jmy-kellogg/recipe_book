export const ingredientsDisplay = {
  baking_soda: "Baking Soda",
  baking_powder: "Baking Powder",
  potassium_bicarbonate: "Potassium Bicarbonate",
  salt: "Salt",
  water: "Water",
  flour: "Flour",
  sugar: "Sugar",
  butter: "Butter",
};

export const unitDisplay = {
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

export const displayList: { [key: string]: string } = {
  ...ingredientsDisplay,
  ...unitDisplay,
};

export const getDisplayText = (key: string) => {
  return displayList[key] || key;
};
