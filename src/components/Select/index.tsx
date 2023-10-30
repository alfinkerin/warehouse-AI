import React from "react";

type PropsSelect = {
  label: string;
  placeholder: string;
  data: any;
};

function Selects({ label, placeholder, data, ...props }: PropsSelect) {
  return (
    <>
      <label className="label">
        <span className="label-text uppercase">{label}</span>
      </label>
      <select {...props} className="select select-bordered w-full  bg-white">
        <option disabled selected>
          {placeholder}
        </option>
        {data?.map((x: any) => (
          <>
            <option>{x?.name}</option>
          </>
        ))}
      </select>
    </>
  );
}

export default Selects;
