import { Ingredient } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";

export function useIngredients() {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setIsLoading(true);
        const ingredients = await Api.ingredients.getAllIngredients();
        setIngredients(ingredients);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchIngredients();
  }, []);
  return {
    ingredients,
    loading,
  };
}
