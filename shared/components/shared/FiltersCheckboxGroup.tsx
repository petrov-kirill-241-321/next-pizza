"use client";
import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./FilterCheckbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

type Item = FilterChecboxProps;

interface FiltersCheckboxGroupProps {
  title: string;
  items: Item[];
  selected: Set<string>;
  loading?: boolean;
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (id: string) => void;
  defaultValue?: string[];
  className?: string;
}

export default function FiltersCheckboxGroup({
  title,
  items,
  selected,
  loading,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  onChange,
  defaultValue,
  className,
}: FiltersCheckboxGroupProps) {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : items
        .filter((item) =>
          item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
        )
        ?.slice(0, limit);

  function onChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      <div className="mb-5">
        <Input
          onChange={onChangeSearchValue}
          placeholder={searchInputPlaceholder}
          className="bg-gray-50 border-none"
        />
      </div>

      {loading ? (
        <div>
          {Array.from({ length: limit })
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
            ))}
          <Skeleton className="w-28px h-6 mb-4 rounded-[8px]" />
        </div>
      ) : (
        <div>
          {items &&
            list.map((item, index) => (
              <FilterCheckbox
                key={index}
                text={item.text}
                value={item.value}
                checked={selected.has(item.value)}
                endAdornment={item.endAdornment}
                onCheckedChange={() => onChange?.(item.value)}
              />
            ))}
          {items.length > limit && (
            <div
              className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-primary mt-3"
              >
                {showAll ? "Скрыть" : "+ Показать все"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
