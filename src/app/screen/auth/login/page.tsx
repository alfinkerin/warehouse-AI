"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

import { PiEyeClosedLight } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";

import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import Buttons from "@/components/Button";

type IFormInput = {
  email: string;
  password: string;
};

export default function Login() {
  const [typePassword, setTypePassword] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInput>();

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmit(true);
    const loginData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (loginData?.error) {
      toast.error("Wrong password or email", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsSubmit(false);
    } else {
      toast.success("Login Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/screen/admin");
      setIsSubmit(false);
    }
  };

  return (
    <>
      <form
        className="w-full h-full flex justify-center items-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card customCss="w-[70%] border-none">
          <div className="card-title self-center uppercase">Login</div>
          <div className="self-center text-base ">
            Warehouse Management with AI
          </div>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                type="email"
                label="email"
                placeholder="masukan email"
                {...field}
              />
            )}
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <Controller
            name="password"
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field }) => (
              <TextInput
                type={typePassword ? "password" : "text"}
                label="password"
                placeholder="password"
                Icon={
                  typePassword ? (
                    <PiEyeClosedLight size="20" />
                  ) : (
                    <PiEyeLight size="20" />
                  )
                }
                onClick={() => setTypePassword(!typePassword)}
                {...field}
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <Buttons disable={isSubmit} title="Login" />
          <p className="text-base text-center">
            Dont have an account ?{" "}
            <Link className="text-blue-400" href="/screen/auth/register">
              Register
            </Link>
          </p>
        </Card>
      </form>
    </>
  );
}
