import React, { ReactNode } from "react";

import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";

type LayoutAdminProps = {
  children: ReactNode | ReactNode[];
};

async function LayoutAdmin({ children }: LayoutAdminProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  return <div className="flex gap-6">{children}</div>;
}

export default LayoutAdmin;
