import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { bulan: "Januari", Rose: 32, Wishes: 37, Liliya: 60 },
  { bulan: "Februari", Rose: 42, Wishes: 42, Liliya: 54 },
  { bulan: "Maret", Rose: 51, Wishes: 41, Liliya: 54 },
  { bulan: "April", Rose: 60, Wishes: 37, Liliya: 28 },
  { bulan: "Mei", Rose: 51, Wishes: 31, Liliya: 27 },
  { bulan: "Juni", Rose: 95, Wishes: 44, Liliya: 49 },
  { bulan: "Juli", Rose: 32, Wishes: 22, Liliya: 12 },
  { bulan: "Agustus", Rose: 53, Wishes: 32, Liliya: 12 },
  { bulan: "September", Rose: 12, Wishes: 31, Liliya: 78 },
  { bulan: "Oktober", Rose: 23, Wishes: 12, Liliya: 44 },
  { bulan: "November", Rose: 86, Wishes: 30, Liliya: 77 },
  { bulan: "Desember", Rose: 11, Wishes: 22, Liliya: 33 },
];

export default function Chart() {
  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <Line type="monotone" dataKey="Rose" stroke="#f0657c" strokeWidth={1} />
        <Line
          type="monotone"
          dataKey="Wishes"
          stroke="#d8fa17"
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="Liliya"
          stroke="#e90bde"
          strokeWidth={1}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="bulan" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
