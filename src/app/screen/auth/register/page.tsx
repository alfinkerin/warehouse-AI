"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PiEyeClosedLight } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import { toast } from "react-toastify";

import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import Buttons from "@/components/Button";

type IFormInput = {
  email: string;
  password: string;
  username: string;
};

export default function Register() {
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
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    if (response.status === 201) {
      reset({ email: "", username: "", password: "" });
      toast.success("Registration Successful", {
        position: toast.POSITION.TOP_CENTER,
      });

      router.push("/screen/auth/login");
      setIsSubmit(false);
    } else {
      console.log("gagal");
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
          <div className="card-title self-center uppercase">register</div>
          <Controller
            name="username"
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field }) => (
              <TextInput
                type="text"
                label="username"
                placeholder="masukan username"
                {...field}
              />
            )}
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
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

          <Buttons disable={isSubmit} title="Submit" />
        </Card>
      </form>
    </>
  );
}
