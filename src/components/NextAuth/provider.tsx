"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode | ReactNode[];
};

function Provider({ children }: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
