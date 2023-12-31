"use client";

import Buttons from "@/components/Button";
import { Modal } from "@/components/Modal";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/hooks/useHookSwr";
import AddStore from "./addStore";
import CardImgOnSide from "@/app/screen/admin/store/CardImgOnSide";
import { FaStoreAltSlash } from "react-icons/fa";
import TextInput from "@/components/TextInput";

function Store() {
  const [open, setOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [editData, setEditData] = useState({});
  const [query, setQuery] = useState("");

  const { data, mutate } = useSWR("/api/store", fetcher);

  const searchFilter = (array: any) => {
    return array?.filter((el: any) => el?.name.includes(query));
  };

  const filtered = searchFilter(data?.data);

  const handleFilter = (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Modal
        open={open}
        withCloseButton
        title={titleModal}
        close={() => setOpen(false)}
      >
        <AddStore
          setOpen={setOpen}
          mutate={mutate}
          editData={editData}
          titleModal={titleModal}
        />
      </Modal>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Buttons
            title="New Store"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Add Store");
            }}
          />
        </div>
        <div className="w-52">
          <TextInput
            type="text"
            onChange={handleFilter}
            placeholder="Filter by Name.."
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        {data?.data?.length === 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <FaStoreAltSlash size="40" />
            <span> No Store Available</span>
          </div>
        ) : (
          <CardImgOnSide
            data={filtered}
            mutate={mutate}
            setOpen={setOpen}
            setTitleModal={setTitleModal}
            setEditData={setEditData}
          />
        )}
      </div>
    </>
  );
}

export default Store;
