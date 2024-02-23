import React, { useEffect, useState } from 'react';

const Partido = ({ keyName, elements, partyData }) => {
  const [positivePercentage, negativePercentage] = elements;
  const imageUrl = partyData[0];
  const color = partyData[1];

  // Animation state
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100); // Trigger the animation
  }, []);

  const darkenColor = (color, darkenAmount = 0) => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.max(0, r - darkenAmount);
    g = Math.max(0, g - darkenAmount);
    b = Math.max(0, b - darkenAmount);

    const opacity = 0.2; // 20% opacity
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const calculateWidth = (percentage) => {
    if (percentage < 20) {
      return '20%'; // Lock width at 20% if the value is less than 20%
    }
    return `${percentage}%`;
  };

  const barStyle = (isPositive) => {
    const baseStyle = {
      width: loaded
        ? calculateWidth(isPositive ? positivePercentage : negativePercentage)
        : '0%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '36px',
      fontWeight: 'bold',
      transition: 'width 1s ease-in-out',
      border: isPositive ? 'none' : `3px solid ${darkenColor(color)}`, // Solid border for negative bar
      backgroundColor: isPositive ? color : 'white',
      color: isPositive ? 'white' : 'black', // Text color set based on bar type
    };

    // Stripe pattern for the negative bar
    const stripeSize = 35; // Thinner stripe size
    const stripePattern = isPositive
      ? ''
      : `repeating-linear-gradient(
      135deg,
      ${darkenColor(color)},
      ${darkenColor(color)} ${stripeSize}px,
      transparent ${stripeSize}px,
      transparent ${stripeSize * 2}px
    )`;

    return {
      ...baseStyle,
      backgroundImage: stripePattern,
    };
  };

  return (
    <div
      className="partido-container"
      style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}
    >
      <img
        src={imageUrl}
        alt={keyName}
        style={{ width: '40px', marginRight: '20px' }}
      />
      <div className="flex" style={{ width: 'calc(100% - 60px)', gap: '8px' }}>
        <div style={barStyle(true)}>{positivePercentage}%</div>
        <div style={barStyle(false)}>{negativePercentage}%</div>
      </div>
      <img
        src={imageUrl}
        alt={keyName}
        style={{ width: '40px', marginLeft: '20px', filter: 'grayscale(90%)' }}
      />
    </div>
  );
};

export default Partido;
