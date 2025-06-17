// import { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Thumbs, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/thumbs';
// import 'swiper/css/navigation';

// const ProductImageCarousel = ({ images = [] }) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);

//   if (!images.length) return null;

//   return (
//     <div className="w-full md:w-1/2 object-cover rounded">
//       {/* Main Carousel */}
//       <Swiper
//         style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
//         spaceBetween={10}
//         navigation
//         thumbs={{ swiper: thumbsSwiper }}
//         modules={[Thumbs, Navigation]}
//         // className="w-full rounded-xl"
//         className="w-full"
//       >
//         {images.map((img, idx) => (
//           <SwiperSlide key={idx}>
//             <img src={img} alt={`Product image ${idx}`} className="w-full object-contain rounded-xl" />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Thumbnails */}
//       <Swiper
//         onSwiper={setThumbsSwiper}
//         spaceBetween={10}
//         slidesPerView={5}
//         freeMode
//         watchSlidesProgress
//         modules={[Thumbs]}
//         className="mt-4"
//       >
//         {images.map((img, idx) => (
//           <SwiperSlide key={idx}>
//             <img
//               src={img}
//               alt={`Thumbnail ${idx}`}
//               className="w-full h-20 object-cover rounded-md border border-gray-300 hover:border-black"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ProductImageCarousel;

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';


const ProductImageCarousel = ({ images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className="w-full md:w-1/2 object-cover rounded">
      {/* Main Carousel */}
      <Swiper
        style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Navigation]}
        className="w-full cursor-pointer"
        onClick={() => setLightboxOpen(true)}
        onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} alt={`Product image ${idx}`} className="w-full object-contain rounded-xl" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails - hidden on mobile */}
      <div className="hidden md:block mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode
          watchSlidesProgress
          modules={[Thumbs]}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Thumbnail ${idx}`}
                className="w-full h-20 object-cover rounded-md border border-gray-300 hover:border-black"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={selectedIndex}
        slides={images.map((img) => ({ src: img }))}
        plugins={[Zoom]}
      />
    </div>
  );
};

export default ProductImageCarousel;
