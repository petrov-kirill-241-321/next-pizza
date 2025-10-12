"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </>
  );
}
