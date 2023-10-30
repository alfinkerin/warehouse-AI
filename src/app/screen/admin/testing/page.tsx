import { fetcher } from "@/hooks/useHookSwr";
import { Produk, columns } from "./columns";
import { DataTable } from "./data-table";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { DataTableDemo } from "./codeExample";
import { CldUploadButton } from "next-cloudinary";
import { CldImage } from "next-cloudinary";

export default function DemoPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/product", fetcher);
  const [imgId, setImgId] = useState("");

  return <div className="container mx-auto py-10"></div>;
}
