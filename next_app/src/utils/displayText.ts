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
  0.0625: "1/16",
  0.125: "1/8",
  0.1666: "1/6",
  0.1875: "3/16",
  0.25: "1/4",
  0.3125: "5/16",
  0.3333: "1/3",
  0.375: "3/8",
  0.4375: "7/16",
  0.5: "1/2",
  0.5625: "9/16",
  0.625: "5/8",
  0.6666: "2/3",
  0.6875: "11/16",
  0.75: "3/4",
  0.8125: "13/16",
  0.8333: "5/6",
  0.875: "7/8",
  0.9375: "15/16",
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
  const decimalStr = (amount % 1).toString().slice(0, 6);
  const wholePortion = Math.floor(amount);
  const decimalPortion = amount % 1 < 1 && amountDisplay[decimalStr]

  if(!wholePortion && !decimalPortion){
    return amount.toString()
  }

  return [wholePortion, decimalPortion].filter(value => !!value).join(" ");
}
