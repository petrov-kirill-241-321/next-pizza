import { cn } from "@/lib/utils";
import React from "react";

interface CategoriesProps {
  className?: string;
}

export default function Categories({ className }: CategoriesProps) {
  let currentCategory = 0;
  const cats = [
    "Пиццы",
    "Комбо",
    "Закуски",
    "Коктейли",
    "Кофе",
    "Напитки",
    "Десерты",
  ];

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 rounded-2xl", className)}>
      {cats.map((category, index) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            currentCategory === index &&
              "bg-white text-primary shadow-md shadow-gray-200"
          )}
          key={index}
        >
          <button>{category}</button>
        </a>
      ))}
    </div>
  );
}
