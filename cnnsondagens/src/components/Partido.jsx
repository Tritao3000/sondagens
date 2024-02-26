import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import arrowUp from '../../public/arrowUpp.png';
import arrowDown from '../../public/arrowDownn.png';

const Partido = ({ keyName, elements, partyData, date }) => {
  const isToday = (timestamp) => {
    const today = new Date();
    const date = new Date(timestamp.date._seconds * 1000); // Convert Firestore timestamp to JavaScript Date

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const isDateToday = isToday(date);

  const [positivePercentage, negativePercentage] = isDateToday
    ? elements.map((value) => (value === '' ? 'Sem Dados' : value))
    : ['Sem Dados', 'Sem Dados'];

  const imageUrl = partyData[0];
  const color = partyData[1];
  const partyName = partyData[2];

  // Animation state
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100); // Trigger the animation
  }, []);

  const rgbaColor = (hexColor, opacity) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const transparentColor = rgbaColor(color, 0.2);

  const stripePattern = (color) => {
    const stripeWidth = 2; // Thin stripes
    const gapWidth = 2; // Space between stripes
    return `repeating-linear-gradient(
      45deg,
      ${transparentColor},
      ${color} ${stripeWidth}px,
      ${color} ${stripeWidth}px,
      ${transparentColor} ${stripeWidth + gapWidth}px
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
          <img
            src="https://cdn.iol.pt/js/widgets/iol.widget.eleicoes.ar24/up.jpeg"
            className="mr-2.5  w-8 sm:w-9 text-black"
          />
          <p className="text-black text-base xs:text-lg sm:text-2xl font-bold">
            {positivePercentage !== 'Sem Dados'
              ? `${positivePercentage}%`
              : '-%'}
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
            {negativePercentage !== 'Sem Dados'
              ? `${negativePercentage}%`
              : '-%'}
          </p>
          <img
            src="https://cdn.iol.pt/js/widgets/iol.widget.eleicoes.ar24/down.jpeg"
            className="ml-2.5 w-8 sm:w-9 text-black"
          />
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
