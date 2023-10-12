"use client";

import React, { useState } from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";

function AdminPage() {
  const [isSliderMenu, SetIsSliderMenu] = useState(true);
  return (
    <>
      <div
        className={`min-h-screen bg-primary shadow-md ${
          isSliderMenu ? "w-72" : "w-20"
        } duration-500 p-4`}
      >
        <div className="text-white relative h-full">
          <div
            onClick={() => SetIsSliderMenu(!isSliderMenu)}
            className="absolute right-[-32px] top-[50%] py-1 px-1 rounded-full bg-primary cursor-pointer"
          >
            {isSliderMenu ? (
              <HiArrowCircleLeft size={30} color="white" />
            ) : (
              <HiArrowCircleRight size={30} color="white" />
            )}
          </div>
          {/* Welcome back {session?.user?.username} */}
        </div>
      </div>
      <div className="  ">1</div>
    </>
  );
}

export default AdminPage;
