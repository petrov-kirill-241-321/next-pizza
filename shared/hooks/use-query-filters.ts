import { useRouter, useSearchParams } from "next/navigation";
import QueryString from "qs";
import React, { useRef } from "react";
import { useSet } from "react-use";

interface RangeSliderProps {
  priceFrom?: number;
  priceTo?: number;
}
interface QueryFilters extends RangeSliderProps {
  pizzaSizes: string;
  pizzaTypes: string;
  selectedIds: string;
}
export const useQueryFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;
  const isMounted = useRef(false);

  const [prices, setPrices] = React.useState<RangeSliderProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });
  const [selectedIds, { toggle }] = useSet<string>(
    new Set(
      searchParams.get("selectedIds")
        ? searchParams.get("selectedIds")?.split(",")
        : []
    )
  );
  const [selectedPizzaTypes, { toggle: togglePizzaTypes }] = useSet<string>(
    new Set(
      searchParams.get("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );
  const [selectedPizzaSizes, { toggle: togglePizzaSizes }] = useSet<string>(
    new Set(
      searchParams.get("pizzaSizes")
        ? searchParams.get("pizzaSizes")?.split(",")
        : []
    )
  );

  const updatePrices = (name: keyof RangeSliderProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const filters = {
        pizzaSizes: [...selectedPizzaSizes],
        pizzaTypes: [...selectedPizzaTypes],
        selectedIds: [...selectedIds],
        priceFrom: prices.priceFrom,
        priceTo: prices.priceTo,
      };
      const query = QueryString.stringify(filters, { arrayFormat: "comma" });
      router.push(`?${query}`, { scroll: false });
    }
    isMounted.current = true;
  }, [selectedIds, selectedPizzaSizes, selectedPizzaTypes, prices]);

  return {
    prices,
    updatePrices,
    selectedIds,
    toggle,
    selectedPizzaTypes,
    togglePizzaTypes,
    selectedPizzaSizes,
    togglePizzaSizes,
  };
};
