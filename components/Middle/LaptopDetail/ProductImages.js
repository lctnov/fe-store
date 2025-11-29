import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductImages({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      {/* Ảnh lớn */}
      <div className="flex-1 rounded-2xl overflow-hidden 
        min-h-[420px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[520px]
        flex items-center justify-center bg-gray-50 shadow-sm transition-shadow"
      >
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full h-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={`Ảnh lớn ${idx + 1}`}
                width={800}
                height={800}
                className="w-full h-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Ảnh nhỏ */}
      <div className="w-full md:w-[110px] h-full">
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          slidesPerView={5}
          direction="horizontal"
          watchSlidesProgress
          breakpoints={{
            768: {
              direction: "vertical",
              slidesPerView: 5,
            },
          }}
          className="h-full"
          style={{ maxHeight: "520px" }}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="cursor-pointer">
              <div
                onClick={() => {
                  thumbsSwiper.slideTo(idx);
                  setActiveIndex(idx);
                }}
                className={`
                  border-2 rounded-lg p-1 bg-white 
                  flex items-center justify-center 
                  transition-all 
                  ${
                    activeIndex === idx
                      ? "border-red-500 shadow-md"
                      : "border-gray-300"
                  }
                `}
              >
                <Image
                  src={img}
                  alt={`Ảnh nhỏ ${idx + 1}`}
                  width={90}
                  height={90}
                  className="object-contain w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
