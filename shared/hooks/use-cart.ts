import { useEffect } from "react";
import { useCartStore } from "../store/cart";

export const useCart = () => {
  const state = useCartStore((state) => state);
  useEffect(() => {
    state.fetchCartItems();
  }, []);
  return state;
};
