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
};

type PropsForm = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: any;
};

export default function AddGallery({ setOpen, mutate }: PropsForm) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [imgId, setImgId] = useState("");
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmit(true);
    const response = await fetch("/api/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        img: imgId,
      }),
    });

    if (response.status === 201) {
      reset({ name: "" });
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
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card customCss="w-full border-none ">
          {imgId !== "" ? (
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
                placeholder="masukan nama produk"
                {...field}
              />
            )}
          />
          {errors.name && <p className="text-red-500">Name is required</p>}

          <Buttons disable={isSubmit} title="Submit" />
        </Card>
      </form>
    </>
  );
}
