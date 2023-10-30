"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import Buttons from "@/components/Button";
import UploadImage from "@/components/UploadImage";
import Images from "@/components/Image";

type IFormInput = {
  name: string;
  img: string;
  address: string;
  email: string;
  phone: string;
};

type PropsForm = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: any;
  editData: any;
  titleModal: string;
};

export default function AddStore({
  setOpen,
  mutate,
  editData,
  titleModal,
}: PropsForm) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [imgId, setImgId] = useState("");
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    if (titleModal === "Edit Store") {
      reset(editData);
      setImgId(editData.img);
    } else {
      reset({ name: "", address: "", email: "", phone: "" });
      setImgId("");
    }
  }, [editData, titleModal]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (titleModal === "Add Store") {
      setIsSubmit(true);
      const response = await fetch("/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          img: imgId,
          address: data.address,
          email: data.email,
          phone: data.phone,
        }),
      });

      if (response.status === 201) {
        reset({ name: "", address: "", email: "", phone: "" });
        setImgId("");
        toast.success("Add Store Successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        mutate("/api/store");
        setIsSubmit(false);
        setOpen(false);
      } else {
        setIsSubmit(false);
      }
    } else {
      setIsSubmit(true);
      const response = await fetch(`/api/store/${editData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          img: imgId,
          address: data.address,
          email: data.email,
          phone: data.phone,
        }),
      });

      if (response.status === 201) {
        reset({ name: "", address: "", email: "", phone: "" });
        toast.success("Update Store Successful", {
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
        <Card customCss="w-full border-none ">
          {imgId !== "" || titleModal === "Edit Store" ? (
            <div className="flex justify-center">
              <Images img={imgId} width={100} height={100} />
            </div>
          ) : (
            <UploadImage state={setImgId} />
          )}

          <Controller
            name="name"
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field }) => (
              <TextInput
                type="text"
                label="name"
                defaultValue={editData.name}
                placeholder="masukan nama produk"
                {...field}
              />
            )}
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                type="text"
                label="address"
                defaultValue={editData.address}
                placeholder="address"
                {...field}
              />
            )}
          />
          {errors.address && (
            <p className="text-red-500">address is required</p>
          )}

          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                type="email"
                label="email"
                defaultValue={editData.email}
                placeholder="email"
                {...field}
              />
            )}
          />
          {errors.email && <p className="text-red-500">email is required</p>}

          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                type="text"
                label="phone"
                defaultValue={editData.phone}
                placeholder="phone"
                {...field}
              />
            )}
          />
          {errors.phone && <p className="text-red-500">phone is required</p>}

          <Buttons disable={isSubmit} title="Submit" />
        </Card>
      </form>
    </>
  );
}
