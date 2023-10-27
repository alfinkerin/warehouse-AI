import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import React, { useState } from "react";
import AddProduct from "./addProduct";
import useSWR from "swr";
import { columns } from "./columns";

import { fetcher } from "@/hooks/useHookSwr";
import { TableWHA } from "@/components/DataTable/data-table";
import DownloadExcel from "@/components/DownloadExcel";

function Product() {
  const [open, setOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const { data, error, isLoading, mutate } = useSWR("/api/product", fetcher);

  const editData = () => {
    setOpen(true);
    setTitleModal("Edit Product");
  };

  const filteredData = () => {
    let header = ["name", "stock", "price"];
    let name = [];
    let stock = [];
    let price = [];
    if (data?.data === undefined) {
      console.log("waiting");
    } else {
      for (const x of data.data) {
        name.push(x.name);
        stock.push(x.stock.toString());
        price.push(x.price.toString());
      }
    }
    return [header, name, stock, price];
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
        <div className="flex gap-2">
          <Button
            title="New Product"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Add Product");
            }}
          />
          <Button
            title="Outbound Product"
            customCss="btn-outline"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Add Product");
            }}
          />
          <Button
            title="Inbound Product"
            customCss="btn-outline"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Add Product");
            }}
          />
        </div>
        <DownloadExcel data={filteredData()} />
      </div>
      {data?.data === undefined ? (
        <div className="w-full text-center text-primary text-lg">
          waiting data
        </div>
      ) : (
        <TableWHA columns={columns} data={data.data} filterName="name" />
      )}
    </>
  );
}

export default Product;
