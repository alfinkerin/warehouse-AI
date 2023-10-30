"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import Buttons from "@/components/Button";
import { fetcher } from "@/hooks/useHookSwr";
import Selects from "@/components/Select";

type IFormInput = {
  name: string;
  stock: string;
  price: string;
  store: string;
};

type PropsForm = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate?: any;
  editData?: any;
  titleModal?: string;
  open: boolean;
};

export default function AddProduct({
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

  const { data } = useSWR("/api/store", fetcher);

  useEffect(() => {
    if (titleModal === "Edit Product") {
      reset(editData);
    } else {
      reset({ name: "", stock: "", price: "", store: "" });
    }
  }, [editData, titleModal]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (titleModal === "Add Product") {
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
          store: data.store,
        }),
      });

      if (response.status === 201) {
        reset({ name: "", stock: "", price: "", store: "" });
        toast.success("Add Product Successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        mutate("/api/product");
        setIsSubmit(false);
        setOpen(false);
      } else {
        setIsSubmit(false);
      }
    } else {
      setIsSubmit(true);
      const response = await fetch(`/api/product/${editData?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          stock: parseInt(data.stock),
          price: parseInt(data.price),
          store: data.store,
        }),
      });

      if (response.status === 201) {
        reset({ name: "", stock: "", price: "", store: "" });
        toast.success("Update Product Successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        mutate("/api/product");
        setIsSubmit(false);
        setOpen(false);
      } else {
        setIsSubmit(false);
      }
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
                defaultValue={editData?.name}
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
                defaultValue={editData?.stock}
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
                defaultValue={editData?.price}
                placeholder="masukan harga"
                {...field}
              />
            )}
          />
          {errors.price && <p className="text-red-500">Price is required</p>}

          <Controller
            name="store"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Selects
                label="store"
                placeholder="Store"
                data={data?.data}
                {...field}
              />
            )}
          />
          {errors.store && <p className="text-red-500">store is required</p>}

          <Buttons disable={isSubmit} title="Submit" />
        </Card>
      </form>
    </>
  );
}
