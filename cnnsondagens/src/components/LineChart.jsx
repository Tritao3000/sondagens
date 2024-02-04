import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { strokes } from "../App";

const LineChartComponent = ({ data }) => {
  if (!data) {
    return;
  }

  const parties = Object.values(data[0])
    .sort(
      (a, b) =>
        new Date(a.date._seconds * 1000) - new Date(b.date._seconds * 1000)
    )
    .map((d) => d.parties);

  const names = Object.values(data[0])
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));

  return (
    <>
      <h2 className="text-2xl font-bold pb-8 text-[#262626]">
        Evolução Temporal
      </h2>
      <div className=" rounded-md border-none">
        <ResponsiveContainer width="100%" aspect={2}>
          <LineChart
            width={500}
            height={300}
            data={parties}
            margin={{
              top: 0,
              right: 5,
              left: 0,
              bottom: 0,
            }}
          >
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
              style={{ position: "absolute", marginTop: -10 }}
            />
            <CartesianGrid strokeDasharray="3 15" vertical="" />
            <XAxis
              tickLine={false}
              dataKey={() => names.map((name) => name)}
              axisLine={{ stroke: "#D9D9D9" }}
              tick={{ fill: "#262626" }}
              dy={8}
              padding={{ left: 24, right: 24 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "#D9D9D9" }}
              tick={{ fill: "#262626" }}
              dx={-8}
              tickFormatter={(tick) => `${tick}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            {Object.keys(parties[0]).map((k, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={k}
                stroke={strokes[k]}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white drop-shadow-md border border-[#262626]/10 p-2 rounded-md">
        <p className="text-lg font-semibold text-[#262626] pb-1">{label}</p>
        <div className="flex flex-col gap-0.5">
          {payload.map((value, index) => (
            <p className="text-sm" key={index} style={{ color: value.color }}>
              {value.name}: {value.payload[value.name]}%
            </p>
          ))}
        </div>
      </div>
    );
  }
};

export default LineChartComponent;
