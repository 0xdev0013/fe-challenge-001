import { TokenData } from "@/types/types";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, CartesianGrid } from "recharts";
import { ChartConfig, ChartContainer } from "./ui/chart";

interface TokenChartProps {
  data: TokenData;
}

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function LineTokenChart({ data }: TokenChartProps) {
  const [chartData, setChartData] = useState<TokenData[]>([]);

  useEffect(() => {
    setChartData((prevData) => {
      const updatedData = [...prevData, data];

      return updatedData.slice(-500);
    });
  }, [data]);

  return (
    <ChartContainer className="h-[300px] p-6" config={chartConfig}>
      <LineChart data={chartData} width={600} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(date) =>
            new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }
        />
        <Line
          type="monotone"
          dataKey={data.lastTrade.timestamp}
          stroke={"#FFFFFF"}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
