"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import Buttons from "@/components/Button";
import { fetcher } from "@/hooks/useHookSwr";

type IFormInput = {
  name: string;
  income: string;
  position: string;
  email: string;
};

type PropsForm = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate?: any;
  editData?: any;
  titleModal?: string;
  open: boolean;
};

export default function AddEmployee({
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

  const { data } = useSWR("/api/employee", fetcher);

  useEffect(() => {
    if (titleModal === "Edit Employee") {
      reset(editData);
    } else {
      reset({ name: "", income: "", position: "", email: "" });
    }
  }, [editData, titleModal]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (titleModal === "Add Employee") {
      setIsSubmit(true);
      const response = await fetch("/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          income: parseInt(data.income),
          position: data.position,
          email: data.email,
        }),
      });

      if (response.status === 201) {
        reset({ name: "", income: "", position: "", email: "" });
        toast.success("Add Employee Succesfull", {
          position: toast.POSITION.TOP_CENTER,
        });
        mutate("/api/employee");
        setIsSubmit(false);
        setOpen(false);
      } else {
        setIsSubmit(false);
      }
    } else {
      setIsSubmit(true);
      const response = await fetch(`/api/employee/${editData?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          income: parseInt(data.income),
          position: data.position,
          email: data.email,
        }),
      });

      if (response.status === 201) {
        reset({ name: "", income: "", position: "", email: "" });
        toast.success("Update Employee Successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        mutate("/api/employee");
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
            name="income"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                type="number"
                label="income"
                defaultValue={editData?.income}
                placeholder="masukan income"
                {...field}
              />
            )}
          />
          {errors.income && <p className="text-red-500">income is required</p>}

          <Controller
            name="position"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                type="text"
                label="position"
                defaultValue={editData?.position}
                placeholder="masukan position"
                {...field}
              />
            )}
          />
          {errors.position && (
            <p className="text-red-500">position is required</p>
          )}

          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                type="email"
                label="email"
                defaultValue={editData?.email}
                placeholder="masukan email"
                {...field}
              />
            )}
          />
          {errors.email && <p className="text-red-500">email is required</p>}

          <Buttons disable={isSubmit} title="Submit" />
        </Card>
      </form>
    </>
  );
}
