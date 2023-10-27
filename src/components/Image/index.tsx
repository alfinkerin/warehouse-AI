import { CldImage } from "next-cloudinary";

type PropsImg = {
  img: string;
  width: number;
  height: number;
};

function Images({ img, width, height }: PropsImg) {
  return (
    <>
      <CldImage
        width={width}
        height={height}
        src={img}
        alt="Description of my image"
      />
    </>
  );
}

export default Images;
