import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { FiX } from "react-icons/fi";

type PropsModal = {
  className?: string;
  children?: ReactNode;
  open?: boolean;
  withCloseButton?: boolean;
  close?: () => void;
  title?: string;
};

export const Modal = ({
  className,
  children,
  open,
  withCloseButton,
  close,
  title,
  ...props
}: PropsModal) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
        className
      )}
      {...props}
    >
      {/* overlay */}
      <div
        className={clsx(
          "absolute inset-0 bg-gray-200 bg-opacity-75 transition-opacity",
          open
            ? "opacity-100 duration-300 ease-out"
            : "opacity-0  duration-150 ease-in "
        )}
        onClick={close}
      />
      <div className="flex h-full w-full items-center justify-center p-4 sm:items-center sm:p-0">
        <div
          className={clsx(
            "w-full max-w-xl rounded-lg bg-white p-4 ",
            open
              ? "translate-y-0 opacity-100 duration-200 ease-in sm:scale-100"
              : "translate-y-4 opacity-0 duration-300 ease-out  sm:translate-y-0 sm:scale-95"
          )}
        >
          {withCloseButton && (
            <div className="flex border-b border-gray-200 justify-between w-full pb-4 mb-4">
              <label className="text-lg font-medium">{title}</label>
              <button
                data-cy="modal-add-close-button"
                className="ml-auto"
                onClick={close}
              >
                <FiX className="text-2xl text-gray-400" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
        
    </div>
  );
};
