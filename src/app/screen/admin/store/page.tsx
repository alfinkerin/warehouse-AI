import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/hooks/useHookSwr";
import AddStore from "./addStore";
import CardImgOnSide from "@/components/CardImgOnSide";

function Store() {
  const [open, setOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const { data, error, isLoading, mutate } = useSWR("/api/store", fetcher);

  return (
    <>
      <Modal
        open={open}
        withCloseButton
        title={titleModal}
        close={() => setOpen(false)}
      >
        <AddStore setOpen={setOpen} mutate={mutate} />
      </Modal>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button
            title="New Store"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Add Store");
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <CardImgOnSide data={data?.data} />
      </div>
    </>
  );
}

export default Store;
