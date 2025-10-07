import {
  mapPizzaType,
  TypePizzaSizes,
  TypePizzaTypes,
} from "../constants/pizza";
import { CartStateItem } from "./get-details-cart";

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType?: TypePizzaTypes,
  pizzaSize?: TypePizzaSizes
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
