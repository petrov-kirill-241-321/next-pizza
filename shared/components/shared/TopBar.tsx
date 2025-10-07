import { cn } from "../../lib/utils";
import React from "react";
import { Container } from "./Container";
import Categories from "./Categories";
import { SortPopup } from "./SortPopup";
import { Category } from "@prisma/client";

interface Props {
  className?: string;
  categories: Category[];
}

export default function TopBar({ className, categories }: Props) {
  return (
    <div
      className={cn(
        "sticky mb-9 top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 "
      )}
    >
      <Container className="justify-between flex">
        <Categories categories={categories} className="mt-2" />
        <SortPopup />
      </Container>
    </div>
  );
}
