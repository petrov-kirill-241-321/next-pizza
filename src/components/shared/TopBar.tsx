import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./Container";
import Categories from "./Categories";
import { SortPopup } from "./SortPopup";

export default function TopBar() {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 "
      )}
    >
      <Container className="justify-between flex">
        <Categories className="mt-2" />
        <SortPopup />
      </Container>
    </div>
  );
}
