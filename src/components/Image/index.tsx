import { CldImage } from "next-cloudinary";

type PropsImg = {
  img: string;
  width: number;
  height: number;
  crop?: string;
  fillBackground?: any;
  text?: string;
  overlays?: any;
  gravity?: string;
};

function Images({
  img,
  width,
  height,
  fillBackground,
  crop,
  text,
  overlays,
  gravity,
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
        gravity={gravity}
      />
    </>
  );
}

export default Images;
