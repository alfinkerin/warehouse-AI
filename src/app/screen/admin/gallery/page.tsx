"use client";

import React, { useState } from "react";
import Buttons from "@/components/Button";
import AddGallery from "./addGallery";
import { Modal } from "@/components/Modal";
import { BsCardImage } from "react-icons/bs";
import useSWR from "swr";
import { fetcher } from "@/hooks/useHookSwr";
import Images from "@/components/Image";

function Gallery() {
  const [open, setOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  const { data, mutate } = useSWR("/api/gallery", fetcher);
  console.log(data?.id);

  return (
    <>
      <Modal
        open={open}
        withCloseButton
        title={titleModal}
        close={() => setOpen(false)}
      >
        <AddGallery setOpen={setOpen} mutate={mutate} />
      </Modal>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Buttons
            title="New Image"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Add Store");
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {data?.data?.length === 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <BsCardImage size="40" />
            <span> No Items</span>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {data?.data?.map((img: any) => (
              <>
                <Images
                  img={img?.img}
                  width={660}
                  height={400}
                  fillBackground
                />
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Gallery;
