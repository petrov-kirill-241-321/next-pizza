import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./Title";
import { FilterCheckbox } from "./FilterCheckbox";
import { Input } from "../ui/input";
import RangeSlider from "./RangeSlider";

interface FiltersProps {
  className?: string;
}

export default function Filters({ className }: FiltersProps) {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="font-bold mb-5" />
      <div className="flex flex-col gap-2 border-b-gray-200 border-b-1 pb-6">
        <FilterCheckbox text="Можно собирать" value="value1" />
        <FilterCheckbox text="Новинки" value="value2" />
      </div>
      <div className="mt-6">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="100"
            max={1000}
            min={0}
            defaultValue={0}
          />
          <Input type="number" max={1000} min={100} placeholder="1000" />
        </div>
        <RangeSlider />
      </div>
    </div>
  );
}
