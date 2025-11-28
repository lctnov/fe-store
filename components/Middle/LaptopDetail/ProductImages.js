import { useState } from "react";
import Image from "next/image";

export default function ProductImages({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      {/* Ảnh lớn */}
      <div
        className="
          flex-1 rounded-2xl overflow-hidden
          min-h-[280px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[480px]
          flex items-center justify-center
          bg-gray-50 shadow-sm hover:shadow-md transition-shadow
        "
      >
        <Image
          src={selectedImage}
          alt="Ảnh lớn sản phẩm"
          width={600}
          height={600}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Ảnh nhỏ */}
      <div
        className="
          flex md:flex-col flex-row gap-2
          md:max-h-[600px] md:overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
          w-full md:w-[100px] justify-center
        "
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`
              cursor-pointer border-2 rounded-lg p-1 transition-all
              hover:scale-105 hover:shadow-md
              ${selectedImage === img ? "border-blue-600 shadow-md" : "border-transparent"}
            `}
          >
            <Image
              src={img}
              alt={`Ảnh ${idx + 1}`}
              width={80}
              height={80}
              className="
                object-contain
                w-[60px] h-[60px]
                sm:w-[70px] sm:h-[70px]
                md:w-[80px] md:h-[80px]
                rounded
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
