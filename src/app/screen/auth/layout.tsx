import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

import "react-toastify/dist/ReactToastify.css";

type LayoutAuthProps = {
  children: ReactNode | ReactNode[];
};

async function LayoutAuth({ children }: LayoutAuthProps) {
  const session = await getServerSession();
  if (session) {
    redirect("/screen/admin");
  }
  return (
    <main className="min-h-screen flex items-center justify-center  bg-[url('/auth.png')]">
      {children}
    </main>
  );
}

export default LayoutAuth;
