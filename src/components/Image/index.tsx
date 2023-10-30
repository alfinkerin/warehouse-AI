import { CldImage } from "next-cloudinary";

type PropsImg = {
  img: string;
  width: number;
  height: number;
  crop?: string;
  fillBackground?: any;
  text?: string;
  overlays?: any;
};

function Images({
  img,
  width,
  height,
  fillBackground,
  crop,
  text,
  overlays,
}: PropsImg) {
  return (
    <>
      <CldImage
        width={width}
        height={height}
        src={img}
        crop={crop}
        text={text}
        overlays={overlays}
        alt="Description of my image"
        fillBackground={fillBackground}
      />
    </>
  );
}

export default Images;
