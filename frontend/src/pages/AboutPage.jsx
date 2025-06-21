  import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12 mt-17">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          Welcome to our Website
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          We are here to help parents raise children with creative minds and hands by replacing
          excessive screentime with fun activities. Our children play and learn at the same time.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Resources:</h2>
          <ul className="text-left text-lg space-y-2">
            <li className="flex items-center">
              <span className="text-yellow-600 text-xl mr-2">👉</span> Educational Toys and Games
            </li>
            <li className="flex items-center">
              <span className="text-yellow-600 text-xl mr-2">👉</span> STEM Toys
            </li>
            <li className="flex items-center">
              <span className="text-yellow-600 text-xl mr-2">👉</span> Art & Craft Supplies
            </li>
            <li className="flex items-center">
              <span className="text-yellow-600 text-xl mr-2">👉</span> Puzzles
            </li>
          </ul>
        </div>

        <p className="text-xl font-medium text-green-600">✅ Yes, We deliver Worldwide!</p>
      </div>
    </div>
  );
};

export default AboutPage;
