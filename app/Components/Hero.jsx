"use client"

import React from "react";

const Hero = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="flex items-center md:flex-row flex-col">
        <img
          src="https://utfs.io/f/2fa00e67-ba9c-418b-bb54-dd8289983f4b-7n13wn.png"
          className="md:w-1/2 animate-bounce-slow"
          alt=""
        />

        <div className="flex flex-col items-center justify-center md:h-screen p-4 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-500">CarTrade</span>
          </h1>
          <h2 className="text-2xl font-medium text-gray-700 typing-effect mb-6">
            Buy and Sell Your Dream Car with Ease
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            CarTrade is the ultimate platform for car enthusiasts. Whether
            you're looking to buy a new car or sell your old one, we provide a
            seamless and hassle-free experience. Start your journey with us
            today and drive away with your dream car!
          </p>
          <div className="mt-8">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4 hover:bg-blue-600 transition duration-300">
              Get Started
            </button>
            <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleScroll}
        className="animate-bounce bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-500 transition duration-300 -mt-36 mb-20 hidden md:block"
        aria-label="Scroll down"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
