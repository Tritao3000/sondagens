import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import { Radio } from "lucide-react";
import { strokes } from "../App";

function areDatesMatching(timestamp) {
  const now = new Date();
  const date = new Date(timestamp._seconds * 1000);

  if (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  ) {
    return true;
  }

  return false;
}

const BarChartComponent = ({ data }) => {
  if (!data) return;

  const relevantData = Object.values(data[0]).find((val) =>
    areDatesMatching(val.date)
  );

  if (!relevantData) {
    return (
      <>
        <h2 className="text-2xl font-bold pb-8 text-[#262626]">
          Intenções de voto nas Redes Socias
        </h2>
        <div
          className="p-2 md:p-8 rounded-md border-none relative flex justify-center"
          style={{ boxShadow: "0px 0px 8px 0px rgba(38,38,38,0.2)" }}
        >
          <p className="text-[#262626]">
            Não existem sondagens disponíveis hoje.
          </p>
        </div>
      </>
    );
  }

  let d = [];
  Object.keys(relevantData.parties).forEach((key) => {
    d.push({
      name: key,
      percentage: relevantData.parties[key],
      color: strokes[key],
    });
  });

  return (
    <>
      <h2 className="text-2xl font-bold pb-8 text-[#262626]">
        Intenções de voto nas Redes Socias
      </h2>
      <div
        className="p-2 md:p-8 rounded-md border-none relative"
        style={{ boxShadow: "0px 0px 8px 0px rgba(38,38,38,0.2)" }}
      >
        <div className="absolute text-xs text-white top-2 right-2 md:top-8 md:right-8 bg-[#CC0000] py-1 px-2 rounded-md flex items-center gap-1 font-semibold">
          <Radio size={16} /> LIVE
        </div>
        <ResponsiveContainer maxHeight={400} aspect={1}>
          <BarChart width={800} height={400} data={d} barCategoryGap={16}>
            <XAxis
              dataKey="name"
              tickLine={false}
              tick={{ fill: "#262626" }}
              stroke="#262626"
            />
            <Bar dataKey="percentage">
              {d.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                dataKey="percentage"
                position="top"
                content={(props) => {
                  const { value, x, y, width, color } = props;
                  return (
                    <text
                      x={x + width / 2}
                      y={y}
                      dy={-8}
                      fontSize={14}
                      textAnchor="middle"
                      fill={color}
                      fontWeight={800}
                    >
                      {`${value}%`}
                    </text>
                  );
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BarChartComponent;
