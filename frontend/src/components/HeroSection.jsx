import { motion } from "framer-motion";
import { useEffect } from "react";

const text = "Welcome to Kreatify Hub";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 8,
      stiffness: 100,
    },
  },
};

const HeroSection = () => {

    useEffect(() => {
    const video = document.querySelector("video");
    video?.play().catch(console.error); // force play in some browsers
  }, []);
 const rotateIn = {
    hidden: { rotate: -90, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 0.7 } },
  };

    
  return (
    <>

     <section className="min-h-screen flex items-center justify-center bg-gray-500">
     {/* <section className="min-h-screen flex items-center justify-center bg-[url('/images/bg-image.jpg')] bg-cover bg-center bg-no-repeat"> */}
                   
        <div>
          
  
      <motion.h1
        className="text-9xl md:text-6xl font-bold text-center text-white mb-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        </motion.h1>
          {/* 5. Rotate In */}
          <div>
  <motion.div
        className="mb-8 p-4 bg-white/20 rounded-lg"
        initial="hidden"
        animate="visible"
        variants={rotateIn}
      >
        <h2 className="text-5xl text-white">We offer non-screen educational resources</h2>
        </motion.div>
          </div>
          <div>
              
    </div>
       <button className="mx-auto ms-[400px] py-3 px-10 outline rounded pointer-cursor text-white">Shop Now</button>
          </div>
        
       </section>
   </>
  );
}

export default HeroSection;

// import { motion } from "framer-motion";
// import { useEffect } from "react";

// const HeroSection = () => {
//   useEffect(() => {
//     const video = document.querySelector("video");
//     video?.play().catch(console.error); // force play in some browsers
//   }, []);

//   return (
//     // <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[url('/images/low-poly-grid-haikei2.svg')]">
//       {/* Background Video */}
//       {/* <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover z-15"
//       >
//         <source src="/puzzle-bg.mp4" type="video/mp4" />
//       </video> */}

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
    

//       {/* Content */}
//       <div className="relative z-20 max-w-3xl text-center text-white px-4">
//         <motion.h1
//           initial={{ opacity: 0, y: -540 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl md:text-6xl font-bold mb-4"
//         >
//           Discover the Joy of Puzzling
//         </motion.h1>
    
// <motion.path
//   d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
//   stroke="white"
//   fill="transparent"
//   strokeWidth="2"
//   initial={{ pathLength: 0 }}
//   animate={{ pathLength: 1 }}
//   transition={{ duration: 2 }}
// />


//               <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.6, duration: 0.5 }}
//         >
//           <a
//             href="/shop"
//             className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl shadow-lg transition duration-300"
//           >
//             Shop Now
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


// import React from 'react';
// import { motion } from 'framer-motion';
// // import 'tailwindcss/tailwind.css';

// const HeroSection = () => {
  // Animation Variants
 
  // const slideInLeft = {
  //   hidden: { x: -300, opacity: 0 },
  //   visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  // };

  // const slideInRight = {
  //   hidden: { x: 300, opacity: 0 },
  //   visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  // };

  // const scaleUp = {
  //   hidden: { scale: 0.5, opacity: 0 },
  //   visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  // };

  // const rotateIn = {
  //   hidden: { rotate: -90, opacity: 0 },
  //   visible: { rotate: 0, opacity: 1, transition: { duration: 0.7 } },
  // };

  // const pulse = {
  //   hidden: { scale: 1 },
  //   visible: {
  //     scale: [1, 1.1, 1],
  //     transition: { repeat: Infinity, duration: 1.5 },
  //   },
  // };

  // const staggerContainer = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  // const staggerItem = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  // };

  

  // const typing = {
  //   hidden: { width: 0 },
  //   visible: {
  //     width: 'auto',
  //     transition: { duration: 5, ease: 'easeInOut' },
  //   },
  // };


// /    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-4">
//       <h1 className="text-4xl font-bold mb-12 text-center">Hero Section Animations</h1>

      
      {/* 2. Slide In Left */}
      // <motion.div
      //   className="mb-8 p-4 bg-white/20 rounded-lg"
      //   initial="hidden"
      //   animate="visible"
      //   variants={slideInLeft}
      // >
      //   <h2 className="text-2xl">2. Slide In Left</h2>
      //   <p>Slides in from the left side.</p>
      // </motion.div>

      // {/* 3. Slide In Right */}
      // <motion.div
      //   className="mb-8 p-4 bg-white/20 rounded-lg"
      //   initial="hidden"
      //   animate="visible"
      //   variants={slideInRight}
      // >
      //   <h2 className="text-2xl">3. Slide In Right</h2>
      //   <p>Slides in from the right side.</p>
      // </motion.div>

     

     

      // {/* 8. Staggered Items */}
      // <motion.div
      //   className="mb-8 p-4 bg-white/20 rounded-lg"
      //   initial="hidden"
      //   animate="visible"
      //   variants={staggerContainer}
      // >
      //   <h2 className="text-2xl">8. Staggered Items</h2>
      //   <motion.p variants={staggerItem}>Item 1</motion.p>
      //   <motion.p variants={staggerItem}>Item 2</motion.p>
      //   <motion.p variants={staggerItem}>Item 3</motion.p>
      // </motion.div>



