"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import Buttons from "@/components/Button";
import { fetcher } from "@/hooks/useHookSwr";
import Selects from "@/components/Select";
import useSWR from "swr";

type IFormInput = {
  from: string;
  product: string;
  stock: string;
  to: string;
};

type PropsForm = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate?: any;
  editData?: any;
  titleModal?: string;
  open: boolean;
};

export default function TransProduct({
  setOpen,
  mutate,
  editData,
  titleModal,
}: PropsForm) {
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const { data: store } = useSWR("/api/store", fetcher);
  const { data: product } = useSWR("/api/product", fetcher);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmit(true);
    const response = await fetch("/api/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: data.from,
        product: data.product,
        stock: parseInt(data.stock),
        to: data.to,
      }),
    });

    if (response.status === 201) {
      console.log(response);
      reset({ from: "", product: "", stock: "", to: "" });
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
            name="from"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Selects
                label="from"
                placeholder="from"
                data={store?.data}
                {...field}
              />
            )}
          />
          {errors.from && <p className="text-red-500">Store is required</p>}

          <Controller
            name="product"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Selects
                label="product"
                placeholder="product"
                data={product?.data}
                {...field}
              />
            )}
          />
          {errors.product && (
            <p className="text-red-500">Product is required</p>
          )}

          <Controller
            name="stock"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                type="number"
                label="stock"
                defaultValue={editData?.stock}
                placeholder="masukan stock"
                {...field}
              />
            )}
          />
          {errors.stock && <p className="text-red-500">Stock is required</p>}

          <Controller
            name="to"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Selects
                label="to"
                placeholder="to"
                data={store?.data}
                {...field}
              />
            )}
          />
          {errors.to && <p className="text-red-500">To is required</p>}

          <Buttons disable={isSubmit} title="Submit" />
        </Card>
      </form>
    </>
  );
}
