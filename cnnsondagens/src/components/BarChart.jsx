import { useState, useEffect } from 'react';
import { Bar, BarChart, Cell, LabelList, XAxis } from 'recharts';

// Assuming the strokes import is correctly specified in your original code
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
  const [chartDimensions, setChartDimensions] = useState({
    width: 600, // Initial width, adjust as needed
    height: 400, // Initial height, adjust as needed
  });

  useEffect(() => {
    const updateChartDimensions = () => {
      // Update dimensions based on your logic, e.g., window size or container size
      setChartDimensions({
        width: Math.min(window.innerWidth - 40, 800), // Example logic
        height: 400, // Keep height constant or adjust as needed
      });
    };

    window.addEventListener('resize', updateChartDimensions);
    updateChartDimensions(); // Initial update on mount

    return () => window.removeEventListener('resize', updateChartDimensions);
  }, []);

  if (!data) return null; // Or your preferred loading/error UI

  const relevantData = Object.values(Object.values(data[0])[0]).find((val) =>
    areDatesMatching(val.date)
  );

  if (!relevantData) {
    return (
      <>
        <h2 className="text-2xl font-bold pb-8 text-[#262626]">
          HOJE - Interações nas Redes Socias
        </h2>
        <div
          className="p-2 md:p-8 rounded-md border-none relative flex justify-center"
          style={{ boxShadow: '0px 0px 8px 0px rgba(38,38,38,0.2)' }}
        >
          <p className="text-[#262626]">Ainda não existem dados disponíveis.</p>
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
        <BarChart
          width={chartDimensions.width}
          height={chartDimensions.height}
          data={d}
          barCategoryGap={chartDimensions.width < 768 ? 5 : 10}
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        >
          <XAxis tickLine={false} tick={false} stroke="#262626" />
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
        </BarChart>
      </div>
    </>
  );
};

export default BarChartComponent;
