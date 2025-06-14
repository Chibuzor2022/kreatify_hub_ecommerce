import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react'

const SliderNav = () => {

  // / Slider settings for react-slick
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <>
     {/* <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-800 flex flex-col items-center justify-center p-6 relative overflow-hidden"> */}
       {/* <h1 className="text-5xl font-bold mb-12 text-center font-comic-sans z-10">Welcome to Our Kids' Store!</h1> */}

      {/* 1. Sliding Carousel (react-slick) */}
      {/* <div className="w-full max-w-9xl mb-8">
        <Slider {...sliderSettings}>
          <div className="p-4 bg-yellow-200 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-comic-sans">Toy Blast!</h2>
            <p>Explore our fun toys!</p>
          </div>
          <div className="p-4 bg-red-300 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-comic-sans">Colorful Clothes!</h2>
            <p>Dress up in style!</p>
          </div>
          <div className="p-4 bg-green-200 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-comic-sans">Puzzle Fun!</h2>
            <p>Solve exciting puzzles!</p>
          </div>
        </Slider>
      </div> */}

      {/* 5. Sliding Cards with Fade (react-slick) */}
      {/* <div className="w-full max-w-2xl mb-8">
        <Slider {...{ ...sliderSettings, fade: true }}>
          <div className="p-4 bg-pink-200 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-comic-sans">Soft Toys!</h2>
            <p>Cuddly friends for kids!</p>
          </div>
          <div className="p-4 bg-teal-200 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-comic-sans">Learning Books!</h2>
            <p>Fun stories to read!</p>
          </div>
        </Slider>
      </div> */}

          {/* 8. Sliding Banner (react-slick) */}
      <div className="w-full max-w-9xl ">
        <Slider {...{ ...sliderSettings, slidesToShow: 3, autoplaySpeed: 2000 }}>
          <div className="p-4 bg-blue-300 rounded-lg shadow-lg mx-2 text-center">
            <h2 className="text-xl font-comic-sans">Science Kits!</h2>
          </div>
          <div className="p-4 bg-yellow-300 rounded-lg shadow-lg mx-2 text-center">
            <h2 className="text-xl font-comic-sans">Jigsaw Puzzles!</h2>
          </div>
          <div className="p-4 bg-pink-300 rounded-lg shadow-lg mx-2 text-center">
            <h2 className="text-xl font-comic-sans">Building Blocks!</h2>
          </div>
          <div className="p-4 bg-green-300 rounded-lg shadow-lg mx-2 text-center">
            <h2 className="text-xl font-comic-sans">Paint by Numbers!</h2>
          </div>
        </Slider>
      </div>

   

      {/* 10. Sliding Testimonials (react-slick) */}
       {/* <div className="w-full max-w-2xl mb-8">
        <Slider {...{ ...sliderSettings, vertical: true, verticalSwiping: true, autoplaySpeed: 4000 }}>
          <div className="p-4 bg-indigo-200 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-comic-sans">Happy Kids!</h2>
            <p>"My kids love these toys!"</p>
          </div>
          <div className="p-4 bg-purple-200 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-comic-sans">Fun Times!</h2>
            <p>"Best store for kids!"</p>
          </div>
        </Slider>
      </div> */}
      {/* </div>  */}

      </>
  );
};



export default SliderNav
