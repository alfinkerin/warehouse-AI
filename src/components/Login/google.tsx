import { signIn } from "next-auth/react";
import React, { ReactNode } from "react";
import Buttons from "../Button";

type PropsGoogle = {
  children?: ReactNode;
};

function GoogleLogin({ children }: PropsGoogle) {
  const loginWithGoogle = () =>
    signIn("google", {
      callbackUrl: "https://warehouse-ai.vercel.app/screen/admin",
    });
  return (
    <Buttons
      customCss="btn-outline"
      title="Login Google"
      onClick={loginWithGoogle}
    />
  );
}

export default GoogleLogin;
