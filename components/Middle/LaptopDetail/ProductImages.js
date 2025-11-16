import { useState } from "react";
import Image from "next/image";

export default function ProductImages({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-row gap-4 items-start">
      {/* Ảnh lớn bên trái */}
      <div className="flex-1 rounded overflow-hidden min-h-[480px] flex items-center justify-center">
        <Image
          src={selectedImage}
          alt="Ảnh lớn sản phẩm"
          width={600}
          height={600}
          className="h-auto object-contain"
        />
      </div>

      {/* Ảnh nhỏ bên phải (dọc) */}
      <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`cursor-pointer border rounded p-1 ${
              selectedImage === img ? "border-blue-600" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img}
              alt={`Ảnh ${idx + 1}`}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
