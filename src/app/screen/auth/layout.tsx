import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Image from "next/image";

type LayoutAuthProps = {
  children: ReactNode | ReactNode[];
};

async function LayoutAuth({ children }: LayoutAuthProps) {
  const session = await getServerSession();
  if (session) {
    redirect("/screen/admin");
  }
  return (
    <main className="min-h-screen  relative  bg-gradient-to-b from-[#A951A3] to-[#EDC5E9] flex flex-col lg:flex-row">
      <div className="lg:w-[35%] relative  ">
        <Image
          src="/logo.png"
          width={150}
          height={150}
          className="absolute top-0 left-0 w-20 lg:w-32"
          alt=""
        />

        <div className="flex items-end w-full h-full">
          <Image
            src="/auth.png"
            width={1200}
            height={1200}
            className="relative  lg:left-40"
            alt=""
          />
        </div>
      </div>

      <div className="lg:w-[65%] h-auto bg-white  lg:rounded-tl-[4rem] lg:rounded-bl-[4rem]">
        {children}
      </div>
    </main>
  );
}

export default LayoutAuth;
