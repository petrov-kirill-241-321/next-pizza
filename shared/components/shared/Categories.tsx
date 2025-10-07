"use client";
import { cn } from "../../lib/utils";
import { Category } from "@prisma/client";
import React from "react";
import { useCategoryStore } from "../../store/category";

interface CategoriesProps {
  className?: string;
  categories: Category[];
}

export default function Categories({ className, categories }: CategoriesProps) {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 rounded-2xl", className)}>
      {categories.map(({ name, id }, index) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white text-primary shadow-md shadow-gray-200"
          )}
          key={id}
          href={`/#${name}`}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
}
