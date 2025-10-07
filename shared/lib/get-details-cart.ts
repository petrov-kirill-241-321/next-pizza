import { CartDTO } from "../services/dto/cart.dto";
import { getCartItemTotalPrice } from "./get-cart-item-total-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export function getDetailsCart(cart: CartDTO): ReturnProps {
  const items = cart.items.map((item) => ({
    id: item.productItem.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: getCartItemTotalPrice(item),
    disabled: false,
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];

  return { items, totalAmount: cart.totalAmount };
}
