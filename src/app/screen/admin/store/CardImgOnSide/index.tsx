"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Images from "@/components/Image";
import { FiEdit } from "react-icons/fi";
import { MdDelete, MdOutlineRemoveRedEye } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { toast } from "react-toastify";
import Allert from "@/components/Allert";

type PropsImgs = {
  data: [];
  mutate: any;
  setTitleModal: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setEditData?: any;
};

function CardImgOnSide({
  data,
  mutate,
  setTitleModal,
  setOpen,
  setEditData,
}: PropsImgs) {
  const [getSingleData, setGetSingleData] = useState<any>();
  const [isAllert, setIsAllert] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const singleId = async (id: string) => {
    const response = await fetch(`/api/store/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    setGetSingleData(data?.data);
  };

  const deleteStore = async () => {
    const response = await fetch(`/api/store/${deleteId}`, {
      method: "DELETE",
    });

    if (response.status === 201) {
      toast.success("Delete Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      mutate("/api/store");
    } else {
      toast.error("Delete Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <Allert state={isAllert} setState={setIsAllert} onClick={deleteStore} />

      {data?.map((x: any, i) => (
        <div
          key={i}
          className="card card-side bg-white  h-[13rem] w-[29rem] shadow-2xl drop-shadow-lg "
        >
          <figure>
            <Images img={x?.img} width={960} height={600} />
          </figure>
          <div className="card-body w-64">
            <h2 className="card-title truncate">{x?.name}</h2>
            <p className="truncate ">{x?.address}</p>
            <p className="truncate ">{x?.email}</p>
            <p className="truncate ">{x?.phone}</p>
            <div className="card-actions justify-end mt-2">
              <FiEdit
                onClick={async () => {
                  const response = await fetch(`/api/store/${x.id}`, {
                    method: "GET",
                  });
                  const data = await response.json();
                  setEditData(data.data);
                  setTitleModal("Edit Store");
                  setOpen(true);
                }}
                size="20"
                color="green"
                className="cursor-pointer"
              />
              <div className="">
                <MdDelete
                  onClick={() => {
                    setIsAllert(true);
                    setDeleteId(x.id);
                  }}
                  size="20"
                  color="red"
                  className="cursor-pointer"
                />
              </div>

              <Sheet>
                <SheetTrigger>
                  <MdOutlineRemoveRedEye
                    onClick={() => singleId(x.id)}
                    size="20"
                    color="blue"
                    className="cursor-pointer"
                  />
                </SheetTrigger>

                <SheetContent>
                  <SheetHeader>
                    {getSingleData === undefined ? (
                      <div className="w-full text-center">
                        <span className="loading loading-spinner loading-lg text-primary" />
                      </div>
                    ) : (
                      <>
                        <SheetTitle>
                          Name Store: {getSingleData?.name}
                        </SheetTitle>
                        <SheetDescription>
                          <Images
                            img={getSingleData?.img}
                            width={960}
                            height={600}
                          />
                          <p className="break-all text-black my-2">
                            Address: {getSingleData?.address}
                          </p>
                          <p className="break-all text-black my-2">
                            Email: {getSingleData?.email}
                          </p>
                          <p className="break-all text-black my-2">
                            Phone: {getSingleData?.phone}
                          </p>
                        </SheetDescription>
                      </>
                    )}
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CardImgOnSide;
