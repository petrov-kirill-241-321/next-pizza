import { create } from "zustand";
import { Api } from "../services/api-client";
import { CartStateItem, getDetailsCart } from "../lib/get-details-cart";
import { CreateCartValues } from "../services/dto/cart.dto";

interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;

  /* Запрос на обновление количества товара */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /* Запрос на добавление товара в корзину */
  addCartItem: (values: CreateCartValues) => Promise<void>;

  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()((set, get) => ({
  loading: false,
  error: false,
  totalAmount: 0,
  items: [],

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      const cart = getDetailsCart(data);
      set({ totalAmount: cart.totalAmount, items: cart.items });
    } catch (e) {
      set({ error: true });
      console.error(e);
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateCart(id, quantity);
      const cart = getDetailsCart(data);
      set({ totalAmount: cart.totalAmount, items: cart.items });
    } catch (e) {
      set({ error: true });
      console.error(e);
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: CreateCartValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.createCartItem(values);
      const cart = getDetailsCart(data);
      set({ totalAmount: cart.totalAmount, items: cart.items });
    } catch (e) {
      set({ error: true });
      console.error(e);
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.deleteCartItem(id);
      const cart = getDetailsCart(data);
      set({ totalAmount: cart.totalAmount, items: cart.items });
    } catch (e) {
      set({ error: true });
      console.error(e);
    } finally {
      set({ loading: false });
    }
  },
}));
