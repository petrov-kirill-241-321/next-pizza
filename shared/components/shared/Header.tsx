"use client";
import React, { useEffect, useRef } from "react";
import { Container } from "./Container";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";
import Link from "next/link";
import CartButton from "./cart-button";
import CartDrawer from "./cart-drawer";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import ProfileButton from "./profile-button";

interface HeaderProps {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export default function Header({
  className,
  hasSearch = true,
  hasCart = true,
}: HeaderProps) {
  const searchParams = useSearchParams();
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      if (searchParams.has("paid")) {
        toast.success("Оплата прошла успешно");
      }
    }
    isMounted.current = true;
  }, []);
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
        <div className="mx-8 flex-1">{hasSearch && <SearchInput />}</div>
        <div className="flex items-center gap-3">
          <ProfileButton />
          {hasCart && (
            <CartDrawer>
              <CartButton />
            </CartDrawer>
          )}
        </div>
      </Container>
    </header>
  );
}
