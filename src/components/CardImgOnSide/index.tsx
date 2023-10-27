import React from "react";
import Images from "@/components/Image";
import { FiEdit } from "react-icons/fi";
import { MdDelete, MdOutlineRemoveRedEye } from "react-icons/md";
type PropsImgs = {
  data: [];
};

function CardImgOnSide({ data }: PropsImgs) {
  return (
    <>
      {data?.map((x: any, i) => (
        <div
          key={i}
          className="card card-side bg-white  h-[13rem] w-[29rem] shadow-2xl drop-shadow-lg "
        >
          <figure>
            <Images img={x?.img} width={960} height={600} />
          </figure>
          <div className="card-body w-64">
            <h2 className="card-title truncate">{x?.name}</h2>
            <p className="truncate ">{x?.address}</p>
            <p className="truncate ">{x?.email}</p>
            <p className="truncate ">{x?.phone}</p>
            <div className="card-actions justify-end mt-2">
              <FiEdit size="20" color="green" className="cursor-pointer" />
              <MdDelete size="20" color="red" className="cursor-pointer" />
              <MdOutlineRemoveRedEye
                size="20"
                color="blue"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CardImgOnSide;
