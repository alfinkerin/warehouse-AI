import React, { ReactNode } from "react";

type ButtonProps = {
  title: string;
  type?: string;
  variant?: string;
  disable?: boolean;
  iconDisable?: ReactNode;
  icon?: ReactNode;
  iconPosition?: string;
  customCss?: string;
  onClick?: any;
};

function Buttons({
  title,
  type,
  variant,
  disable = false,
  iconDisable,
  icon,
  iconPosition,
  customCss,
  onClick,
}: ButtonProps) {
  return (
    <>
      {disable === false ? (
        <button
          onClick={onClick}
          className={`btn ${customCss}  btn-primary my-2`}
        >
          {title}
        </button>
      ) : (
        <button className="btn cursor-wait">
          <span className="loading loading-spinner"></span>
          loading
        </button>
      )}
    </>
  );
}

export default Buttons;
