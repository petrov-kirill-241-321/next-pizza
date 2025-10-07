"use client";
import React from "react";
import { Container } from "./Container";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";
import Link from "next/link";
import CartButton from "./cart-button";
import CartDrawer from "./cart-drawer";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn("border-b ", className)}>
      <Container className="flex justify-between items-center py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/pizza-logo.svg" width={35} height={35} alt="logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Next-pizza</h1>
              <div className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </div>
            </div>
          </div>
        </Link>
        <div className="mx-8 flex-1">
          <SearchInput />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-1 justify-center"
          >
            <User size={16} />
            Войти
          </Button>
          <CartDrawer>
            <CartButton />
          </CartDrawer>
        </div>
      </Container>
    </header>
  );
}
