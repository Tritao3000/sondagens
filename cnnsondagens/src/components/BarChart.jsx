import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Legend,
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
        className="p-2 md:p-8 rounded-md border-none relative overflow-auto"
        style={{ boxShadow: "0px 0px 8px 0px rgba(38,38,38,0.2)" }}
      >
        <ResponsiveContainer
          maxHeight={400}
          minWidth={650}
          aspect={1}
          className="overflow-auto"
        >
          <BarChart width={800} data={d} barCategoryGap={16}>
            <XAxis tickLine={false} tick={false} stroke="#262626" />
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
                      dy={-6}
                      fontSize={18}
                      textAnchor="middle"
                      fill={"black"}
                      fontWeight={600}
                    >
                      {`${value}%`}
                    </text>
                  );
                }}
              />
            </Bar>
            <Legend
              payload={d.map((item, index) => ({
                id: index,
                value: item.name,
                color: strokes[item.name],
              }))}
              content={<CustomLegend />}
              iconSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <ul className="flex gap-4 justify-center flex-wrap">
      {payload.map((value, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="w-4 h-3" style={{ backgroundColor: value.color }} />
          <li key={index} style={{ color: value.color }}>
            {value.value}
          </li>
        </div>
      ))}
    </ul>
  );
};

export default BarChartComponent;
