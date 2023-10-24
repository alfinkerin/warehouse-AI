import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import React, { useState } from "react";
import AddProduct from "./addProduct";
import useSWR from "swr";

import Table from "@/components/Table";
import { fetcher } from "@/hooks/useHookSwr";

function Product() {
  const [open, setOpen] = useState(false);
  const [titleModal, setTitleModal] = useState<string>("");
  const { data, error, isLoading, mutate } = useSWR("/api/product", fetcher);

  const editData = () => {
    setOpen(true);
    setTitleModal("Edit Product");
  };

  return (
    <>
      <Modal
        open={open}
        withCloseButton
        title={titleModal}
        close={() => setOpen(false)}
      >
        <AddProduct setOpen={setOpen} mutate={mutate} />
      </Modal>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button
            title="Add Product"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Add Product");
            }}
          />
        </div>
        <div>filter</div>
      </div>

      <Table data={data?.data} isLoading={isLoading} editData={editData} />
    </>
  );
}

export default Product;
