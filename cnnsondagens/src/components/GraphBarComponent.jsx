// GraphBarComponent.js
import Chega from '@/assets/images/chegavert.png';
import { parties } from './Parties';

const GraphBarComponent = ({ partyKey, percentage, index, partyLength }) => {
  const getPartyData = (partyKey) => {
    if (parties[partyKey]) {
      return parties[partyKey];
    }
    // Return a default value or handle the undefined case
    return [Chega, '#213357']; // Replace with actual default path and color
  };

  // Retrieve the image path and color for the party
  const [imagePath, color] = getPartyData(partyKey);

  const barWidth = percentage !== '0' ? `${percentage * 10}%` : '10%';
  const barLabel = percentage !== '0' ? percentage : '-';
  return (
    <div
      className={`flex items-center ${
        index !== partyLength - 1 ? 'my-3' : 'mt-3'
      }`}
      title={partyKey}
    >
      {/* Party Image */}
      <div className="w-10 h-10 relative mr-4">
        <img
          src={imagePath}
          alt={partyKey}
          style={{ objectFit: 'contain' }}
          className="h-10"
        />
      </div>

      {/* Party Graph Bar */}
      <div className="flex-1 h-7 relative">
        <div
          className="flex absolute top-0 left-0 bottom-0 items-center"
          style={{ width: barWidth, backgroundColor: color }}
        >
          <p
            className={`my-auto justify-center text-sm font-semibold text-white ${
              barLabel === '-' ? 'mx-auto' : 'ml-2'
            }`}
          >
            {barLabel}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GraphBarComponent;
