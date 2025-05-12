import React from "react";
import { FilterChecboxProps, FilterCheckbox } from "./FilterCheckbox";
import { Input } from "../ui/input";

type Item = FilterChecboxProps;

interface FiltersCheckboxGroupProps {
  title: string;
  items?: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

export default function FiltersCheckboxGroup({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  onChange,
  defaultValue,
  className,
}: FiltersCheckboxGroupProps) {
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      <div className="mb-5">
        <Input
          placeholder={searchInputPlaceholder}
          className="bg-gray-50 border-none"
        />
      </div>
      <div>
        {items &&
          items.map((item, index) => (
            <FilterCheckbox
              text={item.text}
              value={item.value}
              checked={false}
              endAdornment={item.endAdornment}
              onCheckedChange={() => console.log("j")}
            />
          ))}
      </div>
    </div>
  );
}
