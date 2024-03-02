import GraphBarComponent from './GraphBarComponent';

const MediaPos = ({ data }) => {
  if (!data) {
    return;
  }
  const calculateAverageValues = (timeSeriesData) => {
    const partySums = {};
    const partyCounts = {};

    // Iterate through each day
    Object.values(timeSeriesData).forEach((day) => {
      // Check if the 'parties' field exists
      if (day.parties) {
        // Iterate through each party in the 'parties' object
        Object.entries(day.parties).forEach(([partyName, value]) => {
          // Accumulate the sum and count for each party
          if (!partySums[partyName]) {
            partySums[partyName] = 0;
            partyCounts[partyName] = 0;
          }
          partySums[partyName] += value;
          partyCounts[partyName] += 1;
        });
      }
    });

    // Calculate the average for each party
    const averages = Object.entries(partySums).map(([partyName, sum]) => ({
      partyName,
      average: Math.round((sum / partyCounts[partyName]) * 10) / 10,
    }));

    // Sort the averages from highest to lowest
    averages.sort((a, b) => b.average - a.average);

    return averages;
  };
  const averageValues = calculateAverageValues(data[0].timeSeriesData);
  const partyLegth = averageValues.length;
  console.log(averageValues);

  return (
    <div>
      {averageValues.map((partyData, index) => (
        <GraphBarComponent
          key={index}
          partyKey={partyData.partyName}
          percentage={`${partyData.average}`}
          maxPercentage={averageValues[0].average}
          partyLength={partyLegth}
          index={index}
        />
      ))}
    </div>
  );
};
export default MediaPos;
