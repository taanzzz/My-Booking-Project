import React from 'react';
import Starfield from './StarField';

const RealisticSolarSystemLoader = () => {
  return (
    <>
      <style>
        {`
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.5; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          
          @keyframes orbit-mercury {
            from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
          }
          @keyframes orbit-venus {
            from { transform: rotate(0deg) translateX(75px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(75px) rotate(-360deg); }
          }
          @keyframes orbit-earth {
            from { transform: rotate(0deg) translateX(105px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(105px) rotate(-360deg); }
          }
          @keyframes orbit-mars {
            from { transform: rotate(0deg) translateX(140px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
          }
          @keyframes sun-pulse {
            0%, 100% { box-shadow: 0 0 35px 8px rgba(251, 191, 36, 0.4); }
            50% { box-shadow: 0 0 45px 12px rgba(251, 191, 36, 0.6); }
          }
        `}
      </style>

      
      <div className="relative flex items-center justify-center min-h-screen bg-[#0d1117] overflow-hidden">
        
        
        <Starfield starCount={150} />

        <div className="relative w-80 h-80 z-10">
          
          
          <div className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/20"></div>
          <div className="absolute top-1/2 left-1/2 w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/20"></div>
          <div className="absolute top-1/2 left-1/2 w-[210px] h-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/20"></div>
          <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/20"></div>

          
          <div 
            className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600"
            style={{ animation: 'sun-pulse 4s infinite ease-in-out' }}
          ></div>

         

          
          <div 
            className="absolute top-1/2 left-1/2 -mt-1.5 -ml-1.5 w-3 h-3 rounded-full bg-slate-400"
            style={{ animation: 'orbit-mercury 4s linear infinite' }}
          ></div>

          
          <div 
            className="absolute top-1/2 left-1/2 -mt-2 -ml-2 w-4 h-4 rounded-full bg-yellow-100"
            style={{ animation: 'orbit-venus 7s linear infinite' }}
          ></div>
          
         
          <div 
            className="absolute top-1/2 left-1/2 -mt-2.5 -ml-2.5 w-5 h-5 rounded-full"
            style={{ animation: 'orbit-earth 10s linear infinite' }}
          >
             <div className="w-full h-full rounded-full bg-blue-500 relative overflow-hidden">
                <div className="absolute w-4 h-2 bg-white/50 -top-1 left-0 rounded-full blur-sm"></div>
                <div className="absolute w-3 h-3 bg-white/60 top-2 right-0 rounded-full blur-sm"></div>
             </div>
          </div>

         
          <div 
            className="absolute top-1/2 left-1/2 -mt-2 -ml-2 w-4 h-4 rounded-full bg-red-600"
            style={{ animation: 'orbit-mars 18s linear infinite' }}
          ></div>

        </div>
      </div>
    </>
  );
};

export default RealisticSolarSystemLoader;