"use client";

import Card from "@/components/Card";
import Chart from "@/components/Chart";
import React from "react";

function Dashboard() {
  return (
    <div>
      <div className="flex gap-4">
        <div className="w-[70%]">
          <Chart />
        </div>

        <div className="w-[30%]">
          <div className="flex flex-col gap-4 mt-3">
            <Card customCss="w-auto text-center shadow-xl">
              <p className="font-semibold">Pendapatan perbulan: </p>{" "}
              <span className="text-lg font-bold"> Rp 3.500.000</span>
            </Card>
            <Card customCss="w-auto text-center shadow-xl">
              <p className="font-semibold">Pengeluaran perbulan: </p>{" "}
              <span className="text-lg font-bold"> Rp 3.500.000</span>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
