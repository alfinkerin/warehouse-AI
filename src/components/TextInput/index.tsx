import { error } from "console";
import React, { MouseEventHandler, ReactElement } from "react";

type CardProps = {
  label?: string;
  placeholder?: string;
  type: string;
  Icon?: ReactElement;
  onClick?: MouseEventHandler;
  defaultValue?: string;
};

function TextInput({
  label,
  placeholder,
  type,
  Icon,
  onClick,
  defaultValue,
  ...props
}: CardProps) {
  return (
    <div className="form-control w-full ">
      <label className="label">
        <span className="label-text uppercase">{label}</span>
      </label>
      <div className=" relative">
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="input input-bordered w-full  bg-white pr-12"
          {...props}
        />
        <div
          className="absolute right-4 top-[30%] cursor-pointer"
          onClick={onClick}
        >
          {Icon}
        </div>
      </div>
    </div>
  );
}

export default TextInput;
