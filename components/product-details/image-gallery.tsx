'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  category: Accessories;
  multipleImages: Record<string, string[]>;
}

const ImageGallery = ({ category, multipleImages }: Props) => {
  const [selectedImage, setSelectedImage] = useState(category.main_image);

  // Combine category.image with multipleImages array
  const allImages = [
    category.main_image,
    ...(multipleImages[category.id] || []),
  ];

  return (
    <div className="flex flex-col gap-2 lg:gap-4 w-[300px] lg:w-[660px] ">
      {/* Main image */}
      <div className="flex justify-center items-center bg-primary-lighter lg:h-[500px] h-[300px] rounded-md">
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${selectedImage}`}
          alt={category.heading}
          width={200}
          height={200}
          unoptimized
          className="w-[180px] h-[180px] lg:w-[400px] lg:h-[400px] object-cover rounded-lg"
        />
      </div>

      {/* Thumbnail gallery */}
      <div className="flex flex-wrap gap-1 lg:gap-3">
        {allImages.map((image, index) => (
          <div
            key={index}
            className={`flex cursor-pointer lg:w-[100px] lg:h-[100px] w-[70px] h-[70px] rounded-lg overflow-hidden justify-center items-center bg-primary-lighter ${
              selectedImage === image ? 'border-2 border-primary-main' : ''
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image}`}
              alt={`${category.heading}-${index}`}
              width={200}
              height={200}
              unoptimized
              className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] object-cover "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
