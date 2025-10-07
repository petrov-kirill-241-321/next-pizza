import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { updateCartTotalAmount } from "../../../../../shared/lib/update-cart-total-amount";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("token")?.value;

    if (!token) return NextResponse.json("Not found cart");

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) return NextResponse.json("Not found cart item");

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });
    const updateCartItem = await updateCartTotalAmount(token);
    return NextResponse.json(updateCartItem);
  } catch (e) {
    console.log("[ERROR_PATCH] SERVER LOG", e);
    return NextResponse.json("server error");
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get("token")?.value;

    if (!token) return NextResponse.json("Not found cart");

    await prisma.cartItem.delete({
      where: {
        id,
      },
    });
    const updateCartItem = await updateCartTotalAmount(token);
    return NextResponse.json(updateCartItem);
  } catch (e) {
    console.log("[ERROR_ERROR] SERVER LOG", e);
    return NextResponse.json("server error");
  }
}
