import { TokenData } from "@/types/types";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface TokenChartProps {
  data: TokenData;
}

export default function LineTokenChart({ data }: TokenChartProps) {
  const [chartData, setChartData] = useState<TokenData[]>([]);

  useEffect(() => {
    setChartData((prevData) => {
      const updatedData = [...prevData, data];

      return updatedData.slice(-500);
    });
  }, [data]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <LineChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis dataKey="price" domain={["auto", "auto"]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
      </LineChart>
    </div>
  );
}
