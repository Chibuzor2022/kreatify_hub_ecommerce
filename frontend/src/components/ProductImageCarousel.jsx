import React from 'react';
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
    {/* Main Carousel - with fixed height */}
<Swiper
  style={{
    '--swiper-navigation-color': '#000',
    '--swiper-pagination-color': '#000',
  }}
  spaceBetween={10}
  navigation
  thumbs={{ swiper: thumbsSwiper }}
  modules={[Thumbs, Navigation]}
  className="w-full cursor-pointer h-96" // 👈 fixed height helps prevent layout shift
  onClick={() => setLightboxOpen(true)}
  onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
>
  {images.map((img, idx) => (
    <SwiperSlide key={idx} className="flex justify-center items-center h-full mt-12">
      <img
        src={img}
        alt={`Product image ${idx}`}
        className="h-full object-contain rounded-xl"
      />
    </SwiperSlide>
  ))}
</Swiper>

{/* Thumbnail Carousel - give height and spacing */}
<div className="hidden md:block mt-2"> {/* 👈 reduce margin-top if too large */}
  <Swiper
    onSwiper={setThumbsSwiper}
    spaceBetween={10}
    slidesPerView={Math.min(images.length, 5)} // 👈 Avoid too many blank spaces
    freeMode
    watchSlidesProgress
    modules={[Thumbs]}
    className="h-24" // 👈 ensure thumbnails have fixed height
  >
    {images.map((img, idx) => (
      <SwiperSlide key={idx} className="h-full">
        <img
          src={img}
          alt={`Thumbnail ${idx}`}
          className="w-full h-full object-cover rounded-md border border-gray-300 hover:border-black"
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
