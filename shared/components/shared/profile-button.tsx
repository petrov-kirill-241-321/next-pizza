"use client";

import React from "react";
import { Button } from "../ui/button";
import { CircleUser, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ProfileButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Button
        variant="outline"
        className="flex items-center gap-1 justify-center"
        onClick={() => signOut()}
      >
        <CircleUser size={16} />
        Выйти
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      className="flex items-center gap-1 justify-center"
      onClick={() => signIn()}
    >
      <User size={16} />
      Войти
    </Button>
  );
}
