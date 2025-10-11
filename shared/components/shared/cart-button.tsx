"use client";

import React from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/cart";

interface Props {
  className?: string;
}

export default function CartButton({ className }: Props) {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const cartSize = items.reduce((acc, cur) => acc + cur.quantity, 0);
  const loading = useCartStore((state) => state.loading);

  return (
    <Button
      className={cn("group relative", loading && "w-[105px]", className)}
      loading={loading}
    >
      <b>{totalAmount} ₽</b>
      <span className="h-full w-[1px] bg-white/30 mx-3" />
      <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
        <ShoppingCart size={16} className="relative" strokeWidth={2} />
        <b>{cartSize}</b>
      </div>
      <ArrowRight
        size={20}
        className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
      />
    </Button>
  );
}
