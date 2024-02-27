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

const calculateTickCount = (parties) => {
  let maxDataValue = 0;

  // Iterate through each element in the parties array
  parties.forEach((party) => {
    // Iterate through the values of each party data object
    Object.values(party).forEach((value) => {
      if (value > maxDataValue) {
        maxDataValue = value;
      }
    });
  });

  // Calculate tick count based on maxDataValue
  // Adjust the logic here as needed, for example to round to multiples of 5 or 10
  const tickCount = Math.ceil(maxDataValue / 10) * 10;

  if (tickCount >= 60) {
    return tickCount / 20 + 1;
  } else {
    return tickCount / 10 + 1;
  }
};

const monthMappings = {
  Jan: 'de Janeiro',
  Feb: 'de Fevereiro',
  Mar: 'de Março',
  Apr: 'de Abril',
  May: 'de Maio',
  Jun: 'de Junho',
  Jul: 'de Julho',
  Ago: 'de Agosto',
  Set: 'de Setembro',
  Out: 'de Outubro',
  Nov: 'de Novembro',
  Dez: 'de Dezembro',
};

const LineChartPosComponent = ({ data }) => {
  const [selectedKeyMoment, setSelectedKeyMoment] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  if (!data) {
    return;
  }
  const convertDate = (shortDate) => {
    const parts = shortDate.split(' '); // Split the date into day and month
    if (parts.length === 2) {
      const monthFull = monthMappings[parts[1]];
      if (monthFull) {
        return `${parts[0]} ${monthFull}`; // Replace the abbreviated month with full month name
      }
    }
    return shortDate; // Return the original date if format is unexpected or month is not found
  };
  const sortedData = Object.values(Object.values(data[1])[0]).sort(
    (a, b) => a.date._seconds - b.date._seconds
  );
  // Usage in your component
  const formattedDay = selectedDay ? convertDate(selectedDay) : '';
  const handleKeyMomentClick = (keyMoment, day) => {
    setSelectedKeyMoment(keyMoment === selectedKeyMoment ? null : keyMoment);
    setSelectedDay(day);
  };

  const parties = Object.values(Object.values(data[1])[0])
    .sort(
      (a, b) =>
        new Date(a.date._seconds * 1000) - new Date(b.date._seconds * 1000)
    )
    .map((d) => d.parties);

  const names = Object.values(Object.values(data[1])[0])
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));

  const tickCount = calculateTickCount(parties);
  return (
    <>
      {/*<h2 className="text-2xl font-bold pb-8 text-[#262626]">
        Interações nas Redes Socias
      </h2>*/}
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
              dataKey={() =>
                names.map(
                  (name) =>
                    name.split(' ')[0] +
                    ' ' +
                    monthMappings[name.slice(-3)]?.slice(3, 6)
                )
              }
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
              domain={[
                (dataMin) => Math.floor(dataMin / 10) * 10,
                (dataMax) => Math.ceil(dataMax / 10) * 10,
              ]}
              tickCount={tickCount}
            />
            <Tooltip content={<CustomTooltip />} />
            {Object.keys(parties[0]).map((k, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={k}
                stroke={strokes[k]}
                strokeWidth={3} // Increase this value for thicker lines
                dot={{ fill: strokes[k], strokeWidth: 2 }} // Fill color for the dot and stroke width
              />
            ))}
          </LineChart>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between  pl-[68px] pr-4 mt-2">
              {sortedData.map((day, index) => {
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
    // Sort payload array by values in descending order
    const sortedPayload = payload.sort((a, b) => {
      return b.payload[b.name] - a.payload[a.name];
    });

    return (
      <div className="bg-white drop-shadow-md border border-[#262626]/10 p-2 rounded-md">
        <p className="text-lg font-semibold text-[#262626] pb-1">{label}</p>
        <div className="flex flex-col gap-0.5">
          {sortedPayload.map((value, index) => (
            <p className="text-sm" key={index} style={{ color: value.color }}>
              <strong>{value.name}:</strong> {value.payload[value.name]}%
            </p>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const KeyMoments = ({ keyMoments, day, onClick }) => {
  const isEmpty = Object.entries(keyMoments).length === 0;
  const title = isEmpty
    ? ''
    : `Momentos chave ${day.split(' ')[0]} ${monthMappings[
        day.slice(-3)
      ]?.slice(3, 6)}`;

  return (
    <div
      className={`flex space-x-1 w-8 justify-center items-center ${
        isEmpty ? 'no-pointer-events' : 'cursor-pointer'
      }`}
      title={title}
      onClick={isEmpty ? undefined : onClick}
    >
      {Object.entries(keyMoments).map(([key, value], index) => (
        <div
          className="w-1 h-5 rounded-md"
          key={index}
          style={{ backgroundColor: strokes[key] }}
        ></div>
      ))}
    </div>
  );
};

export default LineChartPosComponent;
