"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PiEyeClosedLight } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import { toast } from "react-toastify";

import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

type IFormInput = {
  name: string;
  stock: string;
  price: string;
};

type PropsForm = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: any;
};

export default function AddProduct({ setOpen, mutate }: PropsForm) {
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
    const response = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        stock: parseInt(data.stock),
        price: parseInt(data.price),
      }),
    });

    if (response.status === 201) {
      reset({ name: "", stock: "", price: "" });
      toast.success("Add Product Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      mutate("/api/product");
      setIsSubmit(false);
      setOpen(false);
    } else {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card customCss="w-full border-none">
          <Controller
            name="name"
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field }) => (
              <TextInput
                type="text"
                label="name"
                placeholder="masukan nama produk"
                {...field}
              />
            )}
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
          <Controller
            name="stock"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                type="number"
                label="stock"
                placeholder="masukan stock"
                {...field}
              />
            )}
          />
          {errors.stock && <p className="text-red-500">Stock is required</p>}

          <Controller
            name="price"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                type="number"
                label="price"
                placeholder="masukan harga"
                {...field}
              />
            )}
          />
          {errors.price && <p className="text-red-500">Price is required</p>}

          <Button disable={isSubmit} title="Submit" />
        </Card>
      </form>
    </>
  );
}
