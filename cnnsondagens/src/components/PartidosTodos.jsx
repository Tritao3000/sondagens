import React from 'react';
import Partido from './Partido';
import { parties } from './Parties';

const PartidosTodos = ({ data }) => {
  // Check if data is structured as expected
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  // Access the partiesData object
  const partiesData = data[0]; //.perPartyData;
  // Ensure partiesData is an object
  /*if (typeof partiesData !== 'object' || partiesData === null) {
    return <div>Invalid data format</div>;
  }*/

  // Create and sort entries array from partiesData
  const entries = Object.entries(partiesData).sort((a, b) => {
    const [, valuesA] = a;
    const [, valuesB] = b;
    const positivePercentageA = valuesA[0] === '' ? -1 : valuesA[0]; // Handle empty string
    const positivePercentageB = valuesB[0] === '' ? -1 : valuesB[0];
    return positivePercentageB - positivePercentageA;
  });
  return (
    <div
      className="p-2 md:p-8 rounded-md border-none relative flex justify-center"
      style={{ boxShadow: '0px 0px 8px 0px rgba(38,38,38,0.2)' }}
    >
      <p className="text-[#262626]">
        A atualização diária do Pulsómetro da Campanha terminou no dia 9 de
        março, último dia de campanha para as eleições legislativas de 2024.
      </p>
    </div>
  );

  /*<div>
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          {' '}
          <h4 className="font-semibold text-base xs:text-lg sm:text-xl text-black">
            INTERAÇÕES <br /> POSITIVAS
          </h4>
          <h4 className="font-semibold text-base xs:text-lg sm:text-xl text-right text-black">
            INTERAÇÕES <br /> NEGATIVAS
          </h4>
        </div>
        <hr className="text-black bg-black h-[2px]" />
      </div>
      {entries.map(([key, value], index) => (
        <Partido
          key={index}
          keyName={key}
          elements={value}
          partyData={parties[key]}
          date={data[1]}
        />
      ))}
      </div>*/
};

export default PartidosTodos;
