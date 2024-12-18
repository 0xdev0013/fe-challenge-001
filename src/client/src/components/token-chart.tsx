// JUST CASUALLY TRYING TO MAKE A CANDLESTICK REAL QUICK
import { TokenData } from "@/types/types";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Customized,
  Legend,
  Line,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

interface TokenChartProps {
  data: TokenData;
}

interface CandlestickData {
  timestamp: string;
  name: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function TokenChart(props: TokenChartProps) {
  const [chartData, setChartData] = useState<CandlestickData[]>([]);

  let priceData = new Map<string, number[]>();

  const generateCandlestickData = () => {
    const newCandlestickData: CandlestickData[] = [];

    Object.entries(props.data).forEach(([symbol, token]) => {
      const existingData = priceData.get(symbol) || [];
      existingData.push(token.price);

      if (existingData.length > 100) {
        existingData.shift();
      }

      const open = existingData[0];
      const close = existingData[existingData.length - 1];
      const high = Math.max(...existingData);
      const low = Math.min(...existingData);

      const timestamp = new Date().toISOString();

      newCandlestickData.push({
        timestamp,
        name: symbol,
        open,
        high,
        low,
        close,
        volume: token.volume24h,
      });

      priceData.set(symbol, existingData);
    });

    setChartData((prevData) => {
      if (prevData.length > 9) {
        prevData.shift();
      }
      return [...prevData, ...newCandlestickData];
    });
  };

  useEffect(() => {
    const interval = setInterval(generateCandlestickData, 1000);
    return () => clearInterval(interval);
  }, [props.data]);

  const CustomizedRectangle = (props: any) => {
    const { formattedGraphicalItems } = props;
    const firstSeries = formattedGraphicalItems[0];
    const secondSeries = formattedGraphicalItems[1];

    return firstSeries?.props?.points.map(
      (firstSeriesPoint: any, index: number) => {
        const secondSeriesPoint = secondSeries?.props?.points[index];
        if (!secondSeriesPoint) return null;

        const yDifference = firstSeriesPoint.y - secondSeriesPoint.y;
        const height = Math.abs(yDifference); // Always positive
        const y = yDifference > 0 ? secondSeriesPoint.y : firstSeriesPoint.y;

        return (
          <Rectangle
            key={`custom-rect-${index}`}
            x={secondSeriesPoint.x - 5} // Center the rectangle
            y={y}
            width={10}
            height={height}
            fill={yDifference > 0 ? "red" : "green"}
          />
        );
      },
    );
  };

  return (
    <ChartContainer config={chartConfig}>
      <ComposedChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
        />
        <YAxis />
        <Legend />

        {chartData.map((entry, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey="high"
            stroke={"#FFFFFF"}
            strokeWidth={4}
            dot={false}
            activeDot={false}
            y={entry.high}
            x={index * 35}
          />
        ))}

        {chartData.map((entry, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey="low"
            stroke={entry.close > entry.open ? "#82ca9d" : "#ff7300"}
            strokeWidth={2}
            dot={false}
            activeDot={false}
            y={entry.low}
            x={index * 35}
          />
        ))}
        <Customized component={CustomizedRectangle} />
      </ComposedChart>
    </ChartContainer>
  );
}
