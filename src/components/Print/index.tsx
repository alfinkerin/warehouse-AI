import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";
import { fetcher } from "@/hooks/useHookSwr";
import Image from "next/image";
import CurrencyFormat from "react-currency-format";
import Buttons from "../Button";

type PropsPrints = {
  id: string;
};

export default function Prints({ id }: PropsPrints) {
  const { data, mutate } = useSWR(`/api/employee/${id}`, fetcher);
  console.log(data);

  const componentRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div ref={componentRef} className="w-full bg-white">
        <div className="w-full flex justify-center">
          <Image
            src="/logoblack.png"
            width={650}
            height={850}
            className="w-32"
            alt="print wha"
          />
        </div>

        <div className="text-center font-semibold ">Payroll Waregouse AI</div>
        <div className="flex flex-col gap-4 mt-4 items-center justify-center">
          <span>Name: {data?.data.name}</span>
          <span>
            Income:{" "}
            <CurrencyFormat
              value={data?.data?.income}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp "}
            />{" "}
          </span>
          <span>Position: {data?.data.position}</span>
          <span>Email: {data?.data.email}</span>
        </div>
      </div>
      <Buttons
        title="Print to PDF"
        onClick={handlePrint}
        customCss="w-full my-2"
      />
    </>
  );
}
