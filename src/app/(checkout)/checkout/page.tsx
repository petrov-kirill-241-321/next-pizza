"use client";

import React from "react";
import { Container } from "../../../../shared/components/shared/Container";
import { Title } from "../../../../shared/components/shared/Title";
import { CheckoutCart } from "../../../../shared/components/shared/checkout/checkout-cart";
import { useCart } from "../../../../shared/hooks/use-cart";
import { CheckoutSidebar } from "../../../../shared/components/shared/checkout/checkout-sidebar";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "../../../../shared/constants/checkout-form-shema";
import { CheckoutPersonalForm } from "../../../../shared/components/shared/form/form-personal-info";
import { CheckoutAddressForm } from "../../../../shared/components/shared/form/form-address";

export default function CheckoutPage() {
  const { removeCartItem, items, loading, updateItemQuantity, totalAmount } =
    useCart();
  function onClickCountButton(
    id: number,
    quentity: number,
    type: "plus" | "minus"
  ) {
    updateItemQuantity(id, type === "plus" ? quentity + 1 : quentity - 1);
  }
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => console.log(data);

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />
              <CheckoutPersonalForm />
              <CheckoutAddressForm />
            </div>

            {/* Правая часть */}
            <CheckoutSidebar totalAmount={totalAmount} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
