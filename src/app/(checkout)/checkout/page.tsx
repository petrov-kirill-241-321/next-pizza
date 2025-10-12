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
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";

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

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      toast.loading("Идет отправка заказа...");
      const url = await createOrder(data);
      console.log(url);
      if (url) {
        window.location.href = url;
      } else {
        toast.error("Не удалось создать заказ");
      }
    } catch (e) {
      console.error("SUBMIT ORDER FORM ERROR", e);
      toast.error("Не удалось создать заказ");
    }
  };

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
              <CheckoutPersonalForm
                className={loading ? "opacity-50 pointer-events-none" : ""}
              />
              <CheckoutAddressForm
                className={loading ? "opacity-50 pointer-events-none" : ""}
              />
            </div>

            {/* Правая часть */}
            <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
