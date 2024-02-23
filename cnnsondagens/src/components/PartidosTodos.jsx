import React from 'react';
import Partido from './Partido';
import { parties } from './Parties';

const PartidosTodos = ({ data }) => {
  // Check if data is structured as expected
  if (
    !data ||
    !Array.isArray(data) ||
    data.length === 0 ||
    !data[0].partiesData
  ) {
    return <div>No data available</div>;
  }

  // Access the partiesData object
  const partiesData = data[0].partiesData;

  // Ensure partiesData is an object
  if (typeof partiesData !== 'object' || partiesData === null) {
    return <div>Invalid data format</div>;
  }

  // Create and sort entries array from partiesData
  const entries = Object.entries(partiesData).sort((a, b) => {
    // Assuming the first element of the array is the positive percentage
    const positivePercentageA = a[1][0];
    const positivePercentageB = b[1][0];
    return positivePercentageB - positivePercentageA; // Sort in descending order
  });

  return (
    <div>
      {entries.map(([key, value], index) => (
        <Partido
          key={index}
          keyName={key}
          elements={value}
          partyData={parties[key]}
        />
      ))}
    </div>
  );
};

export default PartidosTodos;
