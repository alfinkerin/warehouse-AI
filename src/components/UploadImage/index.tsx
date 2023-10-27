import React, { Dispatch, SetStateAction } from "react";
import { CldUploadButton } from "next-cloudinary";

type PropsImg = {
  state: Dispatch<SetStateAction<string>>;
};

function UploadImage({ state }: PropsImg) {
  return (
    <div className="flex flex-col gap-2">
      <span className="label-text uppercase">image</span>
      <CldUploadButton
        onUpload={(result: any) => {
          state(result.info.public_id);
        }}
        className="btn btn-secondary"
        uploadPreset="xxmnu9i6"
      />
    </div>
  );
}

export default UploadImage;
