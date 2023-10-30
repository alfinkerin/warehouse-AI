"use client";

import Buttons from "@/components/Button";
import { Modal } from "@/components/Modal";
import React, { useState } from "react";
import AddProduct from "./addProduct";
import useSWR from "swr";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";

import { fetcher } from "@/hooks/useHookSwr";
import { TableWHA } from "@/components/DataTable/data-table";
import DownloadExcel from "@/components/DownloadExcel";
import Allert from "@/components/Allert";
import CurrencyFormat from "react-currency-format";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { toast } from "react-toastify";

export type Produk = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

function Product() {
  const [open, setOpen] = useState(false);
  const [isAllert, setIsAllert] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const [editData, setEditData] = useState({});

  const { data, mutate } = useSWR("/api/product", fetcher);

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
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "price",
      header: "Price",
      cell: ({ row }) => (
        <CurrencyFormat
          value={row.original.price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp "}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "store",
      header: "Store",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <BsThreeDots size="25" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  const response = await fetch(
                    `/api/product/${row.original.id}`,
                    {
                      method: "GET",
                    }
                  );
                  const data = await response.json();
                  setEditData(data.data);
                  setOpen(true);
                  setTitleModal("Edit Product");
                }}
              >
                Edit Product
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  setIdDelete(row.original.id);
                  setIsAllert(true);
                }}
              >
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const deleteData = async () => {
    const response = await fetch(`/api/product/${idDelete}`, {
      method: "DELETE",
    });

    if (response.status === 201) {
      toast.success("Delete Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      mutate("/api/product");
      setIsAllert(false);
    } else {
      toast.error("Delete Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsAllert(false);
    }
  };

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
        <AddProduct
          editData={editData}
          setOpen={setOpen}
          open={open}
          mutate={mutate}
          titleModal={titleModal}
        />
      </Modal>

      <Allert state={isAllert} setState={setIsAllert} onClick={deleteData} />
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Buttons
            title="New Product"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Add Product");
            }}
          />
          <Buttons
            title="Outbound Product"
            customCss="btn-outline"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Add Product");
            }}
          />
          <Buttons
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
        <div className="w-full flex flex-col items-center justify-center text-primary text-lg">
          <span className="loading loading-spinner loading-lg" />
          <span>waiting data</span>
        </div>
      ) : (
        <TableWHA columns={columns} data={data.data} filterName="name" />
      )}
    </>
  );
}

export default Product;
