"use client";

import { cn } from "../../lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaImage } from "./PizzaImage";
import { Title } from "./Title";
import { Button } from "../ui/button";
import { GroupVariants } from "./group-variants";
import {
  pizzaTypes,
  TypePizzaSizes,
  TypePizzaTypes,
} from "../../constants/pizza";
import { IngredientItem } from "./Ingredient-item";
import { getPizzaDetails } from "../../lib/get-pizza-details";
import { useAvailablePizza } from "../../hooks/use-available-pizza";
import { useCartStore } from "../../store/cart";
import { useRouter } from "next/navigation";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  className?: string;
  onSubmit?: (productItemId?: number, ingredients?: number[]) => void;
}

/**
 * Форма выбора ПИЦЦЫ
 */
export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  className,
  onSubmit,
}) => {
  const {
    size,
    setSize,
    types,
    setTypes,
    selectedIngredients,
    toggleSelectedIngredients,
    availableSizes,
    productItemId,
  } = useAvailablePizza(items);

  const { textDetails, totalPrice } = getPizzaDetails({
    items,
    size,
    types,
    ingredients,
    selectedIngredients,
  });

  return (
    <div className={cn(className, "flex flex-1 ")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <GroupVariants
          items={availableSizes}
          value={String(size)}
          onClick={(value) => setSize(Number(value) as TypePizzaSizes)}
        />
        <GroupVariants
          items={pizzaTypes}
          value={String(types)}
          onClick={(value) => setTypes(Number(value) as TypePizzaTypes)}
          className="mt-3"
        />
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-3">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => toggleSelectedIngredients(ingredient.id)}
                key={ingredient.id}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={() => {
            onSubmit?.(productItemId, [...selectedIngredients]);
          }}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
