import { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { strokes } from '../App';

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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data) return;

  const relevantData = Object.values(Object.values(data[0])[0]).find((val) =>
    areDatesMatching(val.date)
  );

  if (!relevantData) {
    return (
      <>
        {/*<h2 className="text-2xl font-bold pb-8 text-[#262626]">
        HOJE - Interações nas Redes Socias</h2>*/}
        <div
          className="p-2 md:p-8 rounded-md border-none relative flex justify-center"
          style={{ boxShadow: '0px 0px 8px 0px rgba(38,38,38,0.2)' }}
        >
          <p className="text-[#262626]">
            A atualização diária do Pulsómetro da Campanha terminou no dia 9 de
            março, último dia de campanha para as eleições legislativas de 2024.
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
  d.sort((a, b) => b.percentage - a.percentage);

  return (
    <>
      <div
        className="p-2 md:p-4 rounded-md border-none relative"
        style={{ boxShadow: '0px 0px 8px 0px rgba(38,38,38,0.2)' }}
      >
        <ResponsiveContainer
          height={'100%'}
          width={'100%'}
          maxHeight={400}
          aspect={1}
        >
          <BarChart
            data={d}
            barCategoryGap={screenWidth < 768 ? 5 : 10}
            margin={{
              top: 20,
              right: 20,
              bottom: 5,
              // Adjust left margin to compensate for the invisible YAxis space
              left: 20, // Adjust this value based on your actual layout needs
            }}
          >
            <XAxis tickLine={false} tick={false} stroke="#262626" />
            <YAxis
              domain={[0, (dataMax) => dataMax]}
              tickLine={false}
              axisLine={false}
              tick={false}
              mirror={true} // Attempt to draw the axis line and ticks on the opposite side
              width={0} // Attempt to reduce YAxis width to 0
            />
            <Bar dataKey="percentage">
              {d.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                dataKey="percentage"
                position="top"
                content={(props) => {
                  const { value, x, y, width } = props;
                  return (
                    <text
                      x={x + width / 2}
                      y={y}
                      dy={-6}
                      className="text-xs sm:text-sm md:text-lg"
                      textAnchor="middle"
                      fill={'black'}
                      fontWeight={600}
                    >
                      {`${value}%`}
                    </text>
                  );
                }}
              />
              <LabelList
                dataKey="name"
                position="bottom"
                className="text-xs sm:text-sm md:text-lg"
                style={{ fill: 'black', fontWeight: 600 }}
                offset={8}
              />
            </Bar>
            {/*<Legend
              payload={d.map((item, index) => ({
                id: index,
                value: item.name,
                color: strokes[item.name],
              }))}
              content={<CustomLegend />}
              iconSize={16}
            />*/}
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
