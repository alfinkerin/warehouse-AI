import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "../Modal";
import { TiWarning } from "react-icons/ti";
import Buttons from "../Button";

type PropsAllert = {
  onClick?: any;
  state?: boolean;
  setState?: any;
};

function Allert({ onClick, state, setState }: PropsAllert) {
  return (
    <Modal open={state}>
      <div className="alert bg-white ">
        <TiWarning size="30" color="red" />
        <span className="text-lg">Are you sure ?</span>
        <div className="flex gap-2">
          <Buttons
            onClick={() => setState(false)}
            title="Cancel"
            customCss="btn-outline"
          />
          <Buttons onClick={onClick} title="Delete" />
        </div>
      </div>
    </Modal>
  );
}

export default Allert;
