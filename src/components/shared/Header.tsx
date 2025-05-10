"use client";
import React from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn("border-b ", className)}>
      <Container className="flex justify-between items-center py-8">
        <div className="flex items-center gap-4">
          <Image src="/pizza-logo.svg" width={35} height={35} alt="logo" />
          <div>
            <h1 className="text-2xl uppercase font-black">Next-pizza</h1>
            <div className="text-sm text-gray-400 leading-3">
              вкусней уже некуда
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-1 justify-center"
          >
            <User size={16} />
            Войти
          </Button>
          <Button className={cn("group relative", className)}>
            <b>0 ₽</b>
            <span className="h-full w-[1px] bg-white/30 mx-3" />
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={16} className="relative" strokeWidth={2} />
              <b>0</b>
            </div>
            <ArrowRight
              size={20}
              className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Button>
        </div>
      </Container>
    </header>
  );
}
