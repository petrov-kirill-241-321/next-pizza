import { Ingredient, ProductItem } from "@prisma/client";
import { TypePizzaSizes, TypePizzaTypes } from "../constants/pizza";

interface Props {
  size: TypePizzaSizes;
  types: TypePizzaTypes;
  items: ProductItem[];
  ingredients: Ingredient[];
  selectedIngredients: Set<number>;
}
export function getTotalPricePizza({
  ingredients,
  items,
  selectedIngredients,
  size,
  types,
}: Props) {
  const pizzaPrice = items.filter(
    (item) => item.pizzaType === types && item.size === size
  )[0]?.price;
  const ingredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, item) => acc + item.price, 0);

  const totalPrice = pizzaPrice + ingredientsPrice;
  return totalPrice;
}
