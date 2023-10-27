import { CSVLink, CSVDownload } from "react-csv";
import { SiMicrosoftexcel } from "react-icons/si";

type PropsDownload = {
  data: any;
};

function DownloadExcel({ data }: PropsDownload) {
  return (
    <div className="p-3 bg-green-600 hover:bg-green-700 rounded-md text-white">
      <CSVLink data={data}>
        <div className="flex items-center gap-1">
          <SiMicrosoftexcel size="18" />
          <span>Download Excel</span>
        </div>
      </CSVLink>
    </div>
  );
}

export default DownloadExcel;
