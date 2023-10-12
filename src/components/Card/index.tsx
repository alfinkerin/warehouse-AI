import React, { ReactNode, useState } from "react";

type CardProps = {
  children?: ReactNode;
  customCss?: string;
};

function Card({ children, customCss }: CardProps) {
  return (
    <div
      className={`${customCss} card card-compact bg-white border border-black w-64 h-auto  `}
    >
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
