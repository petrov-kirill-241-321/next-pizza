"use client";

import React, { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { Title } from "./Title";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";
import { useCategoryStore } from "../../../store/category";
interface Props {
  items: any[];
  title: string;
  listClassName?: string;
  className?: string;
  categoryId: number;
}

export default function ProductsGroupList({
  items,
  title,
  listClassName,
  className,
  categoryId,
}: Props) {
  let intersectionRef = useRef<any>(null);
  let intersection = useIntersection(intersectionRef, { threshold: 0.4 });
  const setCategoryId = useCategoryStore((state) => state.setActiveId);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setCategoryId(categoryId);
    }
  }, [categoryId, title, intersection?.isIntersecting]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} className="font-extrabold mb-5" size="lg" />
      <div className={cn("grid grid-cols-3 gap-[50]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.items[0].price}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
}
