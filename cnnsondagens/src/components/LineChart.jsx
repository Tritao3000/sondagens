import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { strokes } from '../App';

const LineChartComponent = ({ data }) => {
  const [selectedKeyMoment, setSelectedKeyMoment] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  if (!data) {
    return;
  }
  const convertDate = (shortDate) => {
    const monthMappings = {
      Jan: 'de Janeiro',
      Fev: 'de Fevereiro',
      Mar: 'de Março',
      Abr: 'de Abril',
      Mai: 'de Maio',
      Jun: 'de Junho',
      Jul: 'de Julho',
      Ago: 'de Agosto',
      Set: 'de Setembro',
      Out: 'de Outubro',
      Nov: 'de Novembro',
      Dez: 'de Dezembro',
    };

    const parts = shortDate.split(' '); // Split the date into day and month
    if (parts.length === 2) {
      const monthFull = monthMappings[parts[1]];
      if (monthFull) {
        return `${parts[0]} ${monthFull}`; // Replace the abbreviated month with full month name
      }
    }
    return shortDate; // Return the original date if format is unexpected or month is not found
  };

  // Usage in your component
  const formattedDay = selectedDay ? convertDate(selectedDay) : '';
  const handleKeyMomentClick = (keyMoment, day) => {
    setSelectedKeyMoment(keyMoment === selectedKeyMoment ? null : keyMoment);
    setSelectedDay(day);
  };

  const parties = Object.values(Object.values(data[0])[0])
    .sort(
      (a, b) =>
        new Date(a.date._seconds * 1000) - new Date(b.date._seconds * 1000)
    )
    .map((d) => d.parties);

  const names = Object.values(Object.values(data[0])[0])
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));

  return (
    <>
      <h2 className="text-2xl font-bold pb-8 text-[#262626]">
        Evolução Temporal
      </h2>
      <div className="rounded-md border-none overflow-auto hide-scrollbar">
        <ResponsiveContainer minWidth={650} aspect={2}>
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
            <Legend verticalAlign="top" iconSize={20} />
            <CartesianGrid strokeDasharray="3 15" vertical="" />
            <XAxis
              tickLine={false}
              dataKey={() => names.map((name) => name)}
              axisLine={{ stroke: '#D9D9D9' }}
              tick={{ fill: '#262626' }}
              dy={8}
              padding={{ left: 24, right: 24 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#D9D9D9' }}
              tick={{ fill: '#262626' }}
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
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between  pl-[68px] pr-4 mt-2">
              {Object.values(Object.values(data[0])[0]).map((day, index) => {
                if (day.keyMoments) {
                  return (
                    <KeyMoments
                      key={index}
                      day={day.name}
                      keyMoments={day.keyMoments}
                      onClick={() =>
                        handleKeyMomentClick(day.keyMoments, day.name)
                      }
                    />
                  );
                }
              })}
            </div>
          </div>
        </ResponsiveContainer>
      </div>
      {selectedKeyMoment && (
        <div className="column-with-details pl-[68px] pr-4 text-[#262626] mt-4">
          <h3 className="font-semibold text-base md:text-lg">
            Momentos chave do dia {formattedDay}
          </h3>
          {/* Render the details of selectedKeyMoment here */}
          {Object.entries(selectedKeyMoment).map(([key, value], index) => (
            <p key={index}>
              <strong style={{ color: strokes[key] }}>{key}:</strong> {value}
            </p>
          ))}
        </div>
      )}
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

const KeyMoments = ({ keyMoments, day, onClick }) => {
  return (
    <div
      className="flex space-x-1 cursor-pointer w-8 justify-center items-center"
      title={`Momentos chave ${day}`}
      onClick={onClick}
    >
      {Object.entries(keyMoments).map(([key, value], index) => {
        return (
          <div
            className="w-1 h-5 rounded-md"
            key={index}
            style={{ backgroundColor: strokes[key] }}
          ></div>
        );
      })}
    </div>
  );
};

export default LineChartComponent;
