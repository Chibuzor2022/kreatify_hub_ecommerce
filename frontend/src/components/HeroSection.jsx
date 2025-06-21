import React from 'react'
import { Link } from 'react-router-dom';


const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-white px-4 mt-12 text-center py-20 lg:py-0 lg:min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl/20 font-extrabold mb-6">
          Discover Unique Products on <span className="text-green-400 ">Kreatify Hub</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          We Offer Non-screen Educational Resources For Essential Skills Building In Kids And Teenagers
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-400 hover:bg-green-600 text-white text-2xl font-bold py-2 px-10 rounded-full shadow-md transition">
            <Link to={"/allproducts"} className="flex items-center justify-center gap-2">
            Shop Now
            </Link>
          </button>
                 </div>
      </div>
    </section>
  );
};


export default HeroSection;
