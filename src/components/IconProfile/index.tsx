import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const IconProfile = async () => {
  const session = await getServerSession(authOptions);
  return <div>Welcome back {session?.user?.username}</div>;
};

export default IconProfile;
