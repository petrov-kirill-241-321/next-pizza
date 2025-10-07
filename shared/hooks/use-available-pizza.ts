import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { pizzaSizes, TypePizzaSizes, TypePizzaTypes } from "../constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";

interface ReturnProps {
  size: TypePizzaSizes;
  setSize: (size: TypePizzaSizes) => void;
  types: TypePizzaTypes;
  setTypes: (types: TypePizzaTypes) => void;
  selectedIngredients: Set<number>;
  toggleSelectedIngredients: (id: number) => void;
  availableSizes: Variant[];
}
export function useAvailablePizza(items: ProductItem[]): ReturnProps {
  const [size, setSize] = useState<TypePizzaSizes>(20);
  const [types, setTypes] = useState<TypePizzaTypes>(1);
  const [selectedIngredients, { toggle: toggleSelectedIngredients }] = useSet(
    new Set<number>([])
  );

  const availablePizzas = items.filter((item) => item.pizzaType === types);
  const availableSizes = pizzaSizes.map((item) => ({
    value: item.value,
    name: item.name,
    disabled: !availablePizzas.some(
      (pizza) => pizza.size === Number(item.value)
    ),
  }));

  useEffect(() => {
    const isAvailableSize = availableSizes.find(
      (item) => item.value === String(size) && !item.disabled
    );
    const availableSize = availableSizes.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as TypePizzaSizes);
    }
  }, [types]);
  return {
    size,
    setSize,
    types,
    setTypes,
    selectedIngredients,
    toggleSelectedIngredients,
    availableSizes,
  };
}
