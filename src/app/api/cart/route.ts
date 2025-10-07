import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { findOrCreateCart } from "../../../../shared/lib/find-or-create-cart";
import { CreateCartValues } from "../../../../shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "../../../../shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ totalAmount: 0, items: [] });

    const cart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(cart);
  } catch (e) {
    return NextResponse.json({ totalAmount: 0, items: [] });
  }
}
export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("token")?.value;
    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: { in: data.ingredients },
          },
        },
      },
    });
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }
    const updateUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updateUserCart);
    resp.cookies.set("token", token);
    return resp;
  } catch (e) {
    console.log("[ERROR_POST] SERVER LOG", e);
    return NextResponse.json("server error");
  }
}
