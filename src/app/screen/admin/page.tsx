"use client";

import { menuSlide } from "@/app/constant/sliderMenu";
import React, { useState } from "react";
import Lottie from "lottie-react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";

import animationData from "@/components/Animation/ppl.json";
import Navbar from "@/components/Navbar";
import Dashboard from "./dashboard/page";
import { useStore } from "@/store/page";
import Product from "./product/page";
import Payroll from "./payroll/page";
import History from "./history/page";

function AdminPage() {
  const [isSliderMenu, SetIsSliderMenu] = useState(true);
  const [title, updateTitle] = useStore((state) => [
    state.title,
    state.updateTitle,
  ]);

  const switchPage = () => {
    switch (title) {
      case "Dashboard":
        return <Dashboard />;
      case "Product":
        return <Product />;
      case "History":
        return <History />;
      case "Payroll":
        return <Payroll />;
    }
  };

  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-b from-[#A951A3] to-[#f582e9] shadow-md ${
          isSliderMenu === true ? "w-64 px-8 py-12 " : "w-20 p-4"
        } duration-500 `}
      >
        <div className="text-white relative h-full">
          <div
            onClick={() => SetIsSliderMenu(!isSliderMenu)}
            className={`absolute  top-[50%] py-1 px-1 rounded-full bg-primary cursor-pointer ${
              isSliderMenu === true ? "right-[-47px]" : "right-[-32px]"
            } `}
          >
            {isSliderMenu ? (
              <HiArrowCircleLeft size={30} color="white" />
            ) : (
              <HiArrowCircleRight size={30} color="white" />
            )}
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="mt-6 flex flex-col gap-6 relative">
              {menuSlide.map((menu, i) => (
                <div
                  className={`flex gap-5 items-center cursor-pointer ${
                    isSliderMenu === false ? "justify-center" : "justify-start"
                  }`}
                  key={i}
                  onClick={() => updateTitle(menu.title)}
                >
                  <div
                    className="tooltip tooltip-right tooltip-info text-white"
                    data-tip={isSliderMenu === false ? menu?.title : null}
                  >
                    <menu.icon size={25} />
                  </div>

                  {isSliderMenu === true && (
                    <p className="text-lg">{menu?.title}</p>
                  )}
                </div>
              ))}
            </div>
            <div className=" w-44">
              {isSliderMenu === true && (
                <Lottie animationData={animationData} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-2 w-full mr-8">
        <div className=" border-b-2 border-primary ">
          <Navbar />
        </div>
        <div className="bg-white py-8 px-6 rounded-2xl">{switchPage()}</div>
      </div>
    </>
  );
}

export default AdminPage;
