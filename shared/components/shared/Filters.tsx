"use client";

import React from "react";
import { Title } from "./Title";
import { Input } from "../ui/input";
import { RangeSlider } from "./RangeSlider";
import FiltersCheckboxGroup from "./FiltersCheckboxGroup";
import { useIngredients, useQueryFilters } from "../../hooks";

interface FiltersProps {
  className?: string;
}

export default function Filters({ className }: FiltersProps) {
  const { ingredients, loading } = useIngredients();

  const items = ingredients.map((item) => ({
    value: `${item.id}`,
    text: item.name,
  }));

  const filters = useQueryFilters();

  const updatePrices = (priceFrom: number, priceTo: number) => {
    filters.updatePrices("priceFrom", priceFrom);
    filters.updatePrices("priceTo", priceTo);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="font-bold mb-5" />
      <div className="flex flex-col gap-2 border-b-gray-200 border-b-1 pb-6">
        <FiltersCheckboxGroup
          title="Тип теста"
          items={[
            { text: "Тонкое", value: "1" },
            { text: "Традиционное", value: "2" },
          ]}
          className="mt-4"
          onChange={filters.togglePizzaTypes}
          selected={filters.selectedPizzaTypes}
        />
        <FiltersCheckboxGroup
          title="Размеры"
          items={[
            { text: "20 см", value: "20" },
            { text: "30 см", value: "30" },
            { text: "40 см", value: "40" },
          ]}
          className="mt-4"
          onChange={filters.togglePizzaSizes}
          selected={filters.selectedPizzaSizes}
        />
      </div>
      <div className="mt-6 mb-6">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-4 mb-3">
          <Input
            type="number"
            placeholder="100"
            max={1000}
            min={0}
            value={filters.prices.priceFrom || 0}
            onChange={(event) =>
              filters.updatePrices("priceFrom", Number(event.target.value))
            }
          />
          <Input
            type="number"
            max={1000}
            min={100}
            value={filters.prices.priceTo || 1000}
            onChange={(event) =>
              filters.updatePrices("priceTo", Number(event.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          step={10}
          onValueChange={([priceFrom, priceTo]) =>
            updatePrices(priceFrom, priceTo)
          }
        />
      </div>
      <FiltersCheckboxGroup
        title="Ингредиенты"
        items={items}
        loading={loading}
        className="mt-10"
        onChange={filters.toggle}
        selected={filters.selectedIds}
      />
    </div>
  );
}
