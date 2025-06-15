import React, { useState, useEffect } from 'react';


const Starfield = ({ starCount = 100 }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * 2 + 1}px`, 
          animationDuration: `${Math.random() * 3 + 2}s`, 
          animationDelay: `${Math.random() * 3}s`, 
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, [starCount]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.animationDuration} infinite ease-in-out`,
            animationDelay: star.animationDelay,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Starfield;