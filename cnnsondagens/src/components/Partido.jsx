import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import arrowUp from '../assets/arrowUp.png';
import arrowDown from '../assets/arrowDown.png';

const Partido = ({ keyName, elements, partyData }) => {
  const [positivePercentage, negativePercentage] = elements.map((value) =>
    value === '' ? 'No Data' : value
  );
  const imageUrl = partyData[0];
  const color = partyData[1];
  const partyName = partyData[2];

  // Animation state
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100); // Trigger the animation
  }, []);

  const stripePattern = (color) => {
    const stripeWidth = 2; // Thin stripes
    const gapWidth = 2.5; // Space between stripes
    return `repeating-linear-gradient(
      45deg,
      transparent,
      ${color} ${stripeWidth}px,
      ${color} ${stripeWidth}px,
      transparent ${stripeWidth + gapWidth}px
    )`;
  };

  const barStyle = (isPositive) => ({
    width: loaded
      ? `${isPositive ? positivePercentage : negativePercentage}%`
      : '0%',
    backgroundColor: isPositive ? color : 'transparent', // Fully transparent for negative
    backgroundImage: !isPositive ? stripePattern(color) : 'none',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    transition: 'width 1s ease-in-out',
  });

  return (
    <div className="partido-container my-12 text-center flex flex-col items-center">
      <div className="flex items-end justify-between w-full mb-2.5 text-lg font-bold">
        <div className="flex items-center" title="Interações Positivas">
          <img src={arrowUp} className="mr-2.5  w-8 sm:w-9 text-black" />
          <p className="text-black text-base xs:text-lg sm:text-2xl font-bold">
            {positivePercentage !== 'No Data'
              ? `${positivePercentage}%`
              : positivePercentage}
          </p>
        </div>
        <div className="flex items-center mx-5">
          <img
            src={imageUrl}
            height={48}
            alt={partyName}
            className="h-12 mr-2.5"
          />
          <h4 className="font-bold text-base xs:text-lg sm:text-2xl text-black">
            {partyName}
          </h4>
        </div>
        <div className="flex items-center" title="Interações Negativas">
          <p className="text-black text-base xs:text-lg sm:text-2xl font-bold">
            {negativePercentage !== 'No Data'
              ? `${negativePercentage}%`
              : negativePercentage}
          </p>
          <img src={arrowDown} className="ml-2.5 w-8 sm:w-9 text-black" />
        </div>
      </div>
      <div className="flex w-full bg-gray-200 h-9">
        <div style={barStyle(true)}></div>
        <div style={barStyle(false)}></div>
      </div>
    </div>
  );
};

export default Partido;
