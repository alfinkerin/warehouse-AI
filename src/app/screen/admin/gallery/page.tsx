import React from "react";

import { SingleImageDropzone } from "@/components/UploadImage";
import { useEdgeStore } from "@/app/lib/edgestore";
function Gallery() {
  // const [file, setFile] = useState<File>();
  // const { edgestore } = useEdgeStore();
  return (
    <div>
      {" "}
      {/* <div>
  <SingleImageDropzone
    width={200}
    height={200}
    value={file}
    onChange={(file) => {
      setFile(file);
    }}
  />
  <button
    onClick={async () => {
      if (file) {
        const res = await edgestore.myPublicImages.upload({
          file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            console.log(progress);
          },
        });
        // you can run some server action or api here
        // to add the necessary data to your database
        console.log(res);
      }
    }}
  >
    Upload
  </button>
</div> */}
    </div>
  );
}

export default Gallery;
