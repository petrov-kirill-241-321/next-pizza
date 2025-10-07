import { prisma } from "../../prisma/prisma-client";

export async function findOrCreateCart(token: string) {
  const userCart = await prisma.cart.findFirst({ where: { token } });
  if (!userCart) return await prisma.cart.create({ data: { token } });
  return userCart;
}
