import GraphBarComponent from './GraphBarComponent';

const MediaPos = ({ data }) => {
  const calculatePartyAverages = (data) => {
    const partyScores = {};
    Object.keys(data).map((key) => {
      data[key].debates.map((item) => {
        // Check if the key is a party key and the value is not '-'
        const partyKey1 = item.partyL;
        const partyKey2 = item.partyR;
        if (!partyScores[partyKey1]) {
          partyScores[partyKey1] = [];
        }
        if (item.percL !== '-') {
          const percentage1 = parseInt(item.percL.slice(0, -1), 10);
          partyScores[partyKey1].push(percentage1);
        }

        if (!partyScores[partyKey2]) {
          partyScores[partyKey2] = [];
        }
        if (item.percR !== '-') {
          const percentage2 = parseInt(item.percR.slice(0, -1), 10);

          partyScores[partyKey2].push(percentage2);
        }
      });
    });

    // Now calculate averages for each party
    const averages = Object.entries(partyScores).map(([party, scores]) => {
      let average =
        scores.length > 0
          ? Math.round(
              scores.reduce((acc, score) => acc + score, 0) / scores.length
            )
          : 0;
      average = average / 10;
      return { party, average };
    });

    // Sort by average percentage in descending order, placing parties with '-' at the end
    averages.sort((a, b) => {
      if (a.average === 0) return 1;
      if (b.average === 0) return -1;
      return b.average - a.average;
    });
    return averages;
  };

  const partyAverages = calculatePartyAverages(data);
  const partyLegth = partyAverages.length;
  return (
    <div>
      {partyAverages.map((partyData, index) => (
        <GraphBarComponent
          key={index}
          partyKey={partyData.party}
          percentage={`${partyData.average}`}
          partyLength={partyLegth}
          index={index}
        />
      ))}
    </div>
  );
};
export default MediaPos;
