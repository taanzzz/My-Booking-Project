import React, { useState, useEffect } from 'react';


const JORI_COLORS = [
  'bg-yellow-300',
  'bg-pink-400',
  'bg-cyan-300',
  'bg-fuchsia-400',
  'bg-white'
];


const CursorEffect = ({ type = 'glow' }) => {
  
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [particles, setParticles] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  
  useEffect(() => {
    
    const checkTouchDevice = () => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsTouchDevice(true);
      }
    };
    checkTouchDevice();

    const handleMouseMove = (e) => {
      
      if (type === 'glow') {
        setPosition({ x: e.clientX, y: e.clientY });
      } 
      
      else if (type === 'jori') {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: JORI_COLORS[Math.floor(Math.random() * JORI_COLORS.length)],
        };
        setParticles(prev => [...prev, newParticle].slice(-25));
      }
    };

    
    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    
    return () => {
      if (!isTouchDevice) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [type, isTouchDevice]); 

  
  if (isTouchDevice) {
    return null;
  }

  
  switch (type) {
    case 'jori':
      return (
        <>
          {particles.map((p) => (
            <div
              key={p.id}
              className={`pointer-events-none fixed rounded-full animate-jori ${p.color}`}
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: '8px',
                height: '8px',
                zIndex: 9999,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </>
      );

    case 'glow':
    default:
      return (
        <div
          className="pointer-events-none fixed inset-0 z-[9999] transition duration-300"
          style={{
            background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          }}
        />
      );
  }
};

export default CursorEffect;