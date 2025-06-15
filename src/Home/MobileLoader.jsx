import React from 'react';

const MobileLoader = () => {
  return (
    <>
      
      <style>{`
        @keyframes pulse-fast { 
          0%, 100% { opacity: 1; transform: scale(1); } 
          50% { opacity: 0.5; transform: scale(0.9); } 
        }
      `}</style>
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
        <div className="flex space-x-3">
          <div 
            className="w-4 h-4 bg-white rounded-full" 
            style={{animation: 'pulse-fast 1.5s infinite ease-in-out'}}
          ></div>
          <div 
            className="w-4 h-4 bg-white rounded-full" 
            style={{animation: 'pulse-fast 1.5s infinite ease-in-out', animationDelay: '0.2s'}}
          ></div>
          <div 
            className="w-4 h-4 bg-white rounded-full" 
            style={{animation: 'pulse-fast 1.5s infinite ease-in-out', animationDelay: '0.4s'}}
          ></div>
        </div>
      </div>
    </>
  );
};

export default MobileLoader;