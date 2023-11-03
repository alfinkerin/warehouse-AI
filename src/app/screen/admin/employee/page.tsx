"use client";

import Buttons from "@/components/Button";
import { Modal } from "@/components/Modal";
import React, { useRef, useState } from "react";
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
import AddEmployee from "./addEmployee";

import Prints from "@/components/Print";

export type Employee = {
  id: string;

  name: string;
  income: string;
  position: string;
  email: string;
};

function Employee() {
  const [open, setOpen] = useState(false);
  const [isAllert, setIsAllert] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const [editData, setEditData] = useState({});
  const [idPayroll, setIdPayroll] = useState("");
  const [isPayroll, setIsPayroll] = useState(false);

  const { data, mutate } = useSWR("/api/employee", fetcher);

  //   const filteredData = () => {
  //     let header = ["name", "stock", "price"];
  //     let name = [];
  //     let stock = [];
  //     let price = [];
  //     if (data?.data === undefined) {
  //       console.log("waiting");
  //     } else {
  //       for (const x of data.data) {
  //         name.push(x.name);
  //         stock.push(x.stock.toString());
  //         price.push(x.price.toString());
  //       }
  //     }
  //     return [header, name, stock, price];
  //   };

  const columns: ColumnDef<Employee>[] = [
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
      id: "income",
      header: "Income",
      cell: ({ row }) => (
        <CurrencyFormat
          value={row.original.income}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp "}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "email",
      header: "Email",
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
                    `/api/employee/${row.original.id}`,
                    {
                      method: "GET",
                    }
                  );
                  const data = await response.json();
                  setEditData(data.data);
                  setOpen(true);
                  setTitleModal("Edit Employee");
                }}
              >
                Edit Employee
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  setIdDelete(row.original.id);
                  setIsAllert(true);
                }}
              >
                Delete Employee
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIdPayroll(row.original.id);
                  setIsPayroll(true);
                }}
              >
                Payroll
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const deleteData = async () => {
    const response = await fetch(`/api/employee/${idDelete}`, {
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
        <AddEmployee
          editData={editData}
          setOpen={setOpen}
          open={open}
          mutate={mutate}
          titleModal={titleModal}
        />
      </Modal>

      <Modal
        open={isPayroll}
        withCloseButton
        title="Payroll"
        close={() => {
          setIsPayroll(false);
        }}
      >
        <Prints id={idPayroll} />
      </Modal>

      <Allert state={isAllert} setState={setIsAllert} onClick={deleteData} />
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Buttons
            title="New Employee"
            type="submit"
            onClick={() => {
              setOpen(true);
              setTitleModal("Add Employee");
            }}
          />
        </div>
        {/* <DownloadExcel data={filteredData()} /> */}
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

export default Employee;
