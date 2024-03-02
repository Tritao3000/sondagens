import { parties } from './Parties';

const GraphBarComponent = ({
  partyKey,
  percentage,
  maxPercentage,
  index,
  partyLength,
}) => {
  const [imagePath, color, name] = parties[partyKey] || [
    'defaultPath',
    '#213357',
    'Default Name',
  ];

  // Ensure percentage is a number for all operations
  const numericPercentage = Number(percentage);

  // Calculate width as a percentage of the maxPercentage and ensure it's a number
  const scaledWidth = (numericPercentage / maxPercentage) * 100;
  const barWidth = `${scaledWidth}%`;

  // Alternative rounding method to toFixed
  const roundToOneDecimal = (num) => Math.round(num * 10) / 10;

  return (
    <div
      className={`flex items-center ${
        index !== partyLength - 1 ? 'mb-3' : 'mt-3'
      }`}
      title={partyKey}
    >
      <div className="w-10 h-10 relative mr-4">
        <img
          src={imagePath}
          alt={partyKey}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 h-8 relative bg-transparent">
        <div
          className={`absolute top-0 left-0 bottom-0 flex items-center `}
          style={{ backgroundColor: color, width: barWidth, minWidth: '40px' }}
        >
          <p className="text-xs sm:text-sm font-semibold text-white ml-2">
            {`${roundToOneDecimal(numericPercentage)}%`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GraphBarComponent;
