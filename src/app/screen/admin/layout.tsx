import React, { ReactNode } from "react";

import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

type LayoutAdminProps = {
  children: ReactNode | ReactNode[];
};

async function LayoutAdmin({ children }: LayoutAdminProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  return <div className="flex gap-6 min-h-screen">{children}</div>;
}

export default LayoutAdmin;
