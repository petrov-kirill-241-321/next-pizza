import { CartItemDTO } from "../services/dto/cart.dto";

export function getCartItemTotalPrice(item: CartItemDTO): number {
  const productItem = item.productItem.price;
  const ingredients = item.ingredients.reduce(
    (acc, item) => acc + item.price,
    0
  );
  return (productItem + ingredients) * item.quantity;
}
