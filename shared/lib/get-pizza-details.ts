import { Ingredient, ProductItem } from "@prisma/client";
import { TypePizzaSizes, TypePizzaTypes } from "../constants/pizza";
import { getTotalPricePizza } from "./get-total-price-pizza";

interface Props {
  size: TypePizzaSizes;
  types: TypePizzaTypes;
  items: ProductItem[];
  ingredients: Ingredient[];
  selectedIngredients: Set<number>;
}
export function getPizzaDetails({
  items,
  size,
  types,
  ingredients,
  selectedIngredients,
}: Props) {
  const textDetails = `${size} см, ${
    types === 2 ? "тонкое" : "традиционное"
  } тесто`;

  const totalPrice = getTotalPricePizza({
    size,
    types,
    items,
    ingredients,
    selectedIngredients,
  });

  return { textDetails, totalPrice };
}
