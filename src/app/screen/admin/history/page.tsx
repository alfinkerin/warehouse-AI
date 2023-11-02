"use client";

import Buttons from "@/components/Button";
import { Modal } from "@/components/Modal";
import React, { useState } from "react";
import useSWR from "swr";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { fetcher } from "@/hooks/useHookSwr";
import { TableWHA } from "@/components/DataTable/data-table";
import DownloadExcel from "@/components/DownloadExcel";

import TransProduct from "./transProduct";

export type Produk = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

function History() {
  const [open, setOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [editData, setEditData] = useState({});

  const { data, mutate } = useSWR("/api/history", fetcher);

  const filteredData = () => {
    let header = ["from", "stock", "product", "to"];
    let from = [];
    let stock = [];
    let product = [];
    let to = [];
    if (data?.data === undefined) {
      console.log("waiting");
    } else {
      for (const x of data.data) {
        from.push(x.from);
        stock.push(x.stock.toString());
        product.push(x.product);
        to.push(x.to);
      }
    }
    return [header, from, stock, product, to];
  };

  const columns: ColumnDef<Produk>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "from",
      header: "From",
    },

    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "product",
      header: "Product",
    },
    {
      accessorKey: "to",
      header: "To",
    },
  ];

  return (
    <>
      <Modal
        open={open}
        withCloseButton
        title={titleModal}
        close={() => {
          setOpen(false);
          setEditData({});
        }}
      >
        <TransProduct
          editData={editData}
          setOpen={setOpen}
          open={open}
          mutate={mutate}
          titleModal={titleModal}
        />
      </Modal>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Buttons
            title="Send Product"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Send Product");
            }}
          />
        </div>
        <DownloadExcel data={filteredData()} />
      </div>
      {data?.data === undefined ? (
        <div className="w-full flex flex-col items-center justify-center text-primary text-lg">
          <span className="loading loading-spinner loading-lg" />
          <span>waiting data</span>
        </div>
      ) : (
        <TableWHA columns={columns} data={data.data} filterName="from" />
      )}
    </>
  );
}

export default History;
