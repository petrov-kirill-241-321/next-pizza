import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { CartDTO, CreateCartValues } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
  const cart = await axiosInstance.get<CartDTO>(ApiRoutes.CART);
  return cart.data;
};
export const updateCart = async (
  id: number,
  quantity: number
): Promise<CartDTO> => {
  const cart = await axiosInstance.patch<CartDTO>(`${ApiRoutes.CART}/${id}`, {
    quantity,
  });
  return cart.data;
};
export const deleteCartItem = async (id: number): Promise<CartDTO> => {
  const cart = await axiosInstance.delete<CartDTO>(`${ApiRoutes.CART}/${id}`);
  return cart.data;
};

export const createCartItem = async (
  values: CreateCartValues
): Promise<CartDTO> => {
  const cart = await axiosInstance.post<CartDTO>(ApiRoutes.CART, values);
  return cart.data;
};
