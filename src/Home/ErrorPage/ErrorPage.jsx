import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <main className="relative w-full h-screen">
      <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-gray-800 px-4">
        <Player
          autoplay
          loop
          src="/error.json"
          style={{ height: '300px', width: '300px' }}
        />
        <h1 className="text-4xl md:text-5xl font-bold mt-4">Oops! Something went wrong.</h1>
        <p className="text-lg md:text-xl mt-2">We can't find the page you're looking for.</p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
};

export default ErrorPage;
