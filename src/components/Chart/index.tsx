import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { bulan: "Januari", react: 32, angular: 37, vue: 60 },
  { bulan: "Februari", react: 42, angular: 42, vue: 54 },
  { bulan: "Maret", react: 51, angular: 41, vue: 54 },
  { bulan: "April", react: 60, angular: 37, vue: 28 },
  { bulan: "Mei", react: 51, angular: 31, vue: 27 },
  { bulan: "Juni", react: 95, angular: 44, vue: 49 },
  { bulan: "Juli", react: 95, angular: 44, vue: 49 },
  { bulan: "Agustus", react: 95, angular: 44, vue: 49 },
  { bulan: "September", react: 95, angular: 44, vue: 49 },
  { bulan: "Oktober", react: 95, angular: 44, vue: 49 },
  { bulan: "November", react: 95, angular: 44, vue: 49 },
  { bulan: "Desember", react: 95, angular: 44, vue: 49 },
];

export default function Chart() {
  return (
    <div className="my-2">
      <LineChart width={window.screen.width / 2} height={300} data={data}>
        <Line
          type="monotone"
          dataKey="react"
          stroke="#2196F3"
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="angular"
          stroke="#F44236"
          strokeWidth={1}
        />
        <Line type="monotone" dataKey="vue" stroke="#FFCA29" strokeWidth={1} />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="bulan" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
}
