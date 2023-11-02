"use client";

import Card from "@/components/Card";
import Chart from "@/components/Chart";
import React from "react";
import { GiDiamondTrophy } from "react-icons/gi";
import useSWR from "swr";
import { fetcher } from "@/hooks/useHookSwr";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { TableWHA } from "@/components/DataTable/data-table";

export type Produk = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

function Dashboard() {
  const { data, mutate } = useSWR("/api/history", fetcher);

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
      <div className="flex  p-4 gap-4 mt-3">
        <Card customCss="w-72 !h-32 text-center border-gray-300 shadow-lg drop-shadow-md py-2 px-2 ">
          <div className="w-full  h-full flex flex-col items-start gap-2 ">
            <span className="text-sm font-bold">Monthly Income </span>
            <div className="flex flex-col items-start">
              <span className=" text-2xl font-extrabold"> Rp 3.500.000</span>
              <span className="text-xs text-gray-400">
                +20.1% from last month
              </span>
            </div>
          </div>
        </Card>
        <Card customCss="w-72 !h-32 text-center border-gray-300 shadow-lg drop-shadow-md py-2 px-2 ">
          <div className="w-full h-full flex flex-col items-start gap-2 ">
            <span className="text-sm font-bold">Best Store </span>
            <div className="flex flex-col items-start">
              <span className=" text-2xl font-extrabold"> Kamila</span>
              <span className="text-xs text-gray-400">+1200 transaction</span>
            </div>
          </div>
        </Card>

        <Card customCss="w-72 !h-32 text-center border-gray-300 shadow-lg drop-shadow-md py-2 px-2 ">
          <div className="w-full h-full flex flex-col items-start gap-2 ">
            <span className="text-sm font-bold">Best Product </span>
            <div className="flex flex-col items-start">
              <span className=" text-2xl font-extrabold"> Rose</span>
              <span className="text-xs text-gray-400">+1200 Sales</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-6 mt-10">
        <div className="w-[50%] h-[21rem]">
          <Chart />
        </div>
        <Card customCss="w-[50%] text-center border-gray-300 shadow-lg p-4 ">
          <div className="w-full h-full flex flex-col items-start gap-2 ">
            <div className="flex flex-col items-start mb-2">
              <span className=" text-2xl font-extrabold"> Best Product</span>
              <span className="text-sm text-gray-400">
                You made 265 sales this month.
              </span>
            </div>
            <div className=" w-full flex justify-between gap-4 mt-2">
              <div className="flex ">
                <GiDiamondTrophy size="40" classname="text-secondary " />
                <div className="flex flex-col items-start ml-2">
                  <span className="text-base font-bold">Rose</span>
                  <span className="text-xs text-gray-400">Kamila</span>
                </div>
              </div>
              <div className="text-base font-semibold">2800 Sale</div>
            </div>

            <div className=" w-full flex justify-between gap-4 mt-2">
              <div className="flex ">
                <GiDiamondTrophy size="40" classname="text-secondary " />
                <div className="flex flex-col items-start ml-2">
                  <span className="text-base font-bold">Wishes</span>
                  <span className="text-xs text-gray-400">Bee</span>
                </div>
              </div>
              <div className="text-base font-semibold">1800 Sale</div>
            </div>

            <div className=" w-full flex justify-between gap-4 mt-2">
              <div className="flex ">
                <GiDiamondTrophy size="40" classname="text-secondary " />
                <div className="flex flex-col items-start ml-2">
                  <span className="text-base font-bold">Rose</span>
                  <span className="text-xs text-gray-400">Kamila</span>
                </div>
              </div>
              <div className="text-base font-semibold">800 Sale</div>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-4">
        {data?.data === undefined ? (
          <div className="w-full flex flex-col items-center justify-center text-primary text-lg">
            <span className="loading loading-spinner loading-lg" />
            <span>waiting data</span>
          </div>
        ) : (
          <TableWHA columns={columns} data={data.data} filterName="from" />
        )}
      </div>
    </>
  );
}

export default Dashboard;
