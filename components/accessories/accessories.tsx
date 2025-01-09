'use client';
import { useState } from 'react';
import Image from 'next/image';

type Props = {
  accessoriesType: AccessoriesType[];
  accessories: Accessories[];
};

export default function Accessories({ accessoriesType, accessories }: Props) {
  const [selectedType, setSelectedType] = useState<number>(1);

  const filteredAccessories = accessories.filter(accessory =>
    selectedType === 1 ? true : accessory.type === selectedType
  );

  return (
    <div className="text-black mt-20 bg-white flex flex-col">
      {/* category */}
      <div className="flex flex-wrap gap-2 items-center justify-center py-10">
        {accessoriesType.map(type => (
          <div
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all duration-300 p-4 ${
              selectedType === type.id
                ? 'bg-[#7373731f]'
                : 'hover:bg-[#7373731f]'
            }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${type.image}`}
              alt={type.type}
              width={50}
              height={50}
              unoptimized
            />
            <p className="font-bold">{type.type}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col bg-[#FAFAFA] px-10 py-10 gap-6">
        {/* header */}
        <div className="flex justify-between">
          <p className="text-primary text-2xl font-bold">Accessories</p>
          <div className="flex gap-2 items-center">
            <p className="text-primary-light text-sm">Sort by:</p>
            <select
              name="sort"
              id="sort"
              className="text-primary bg-transparent font-bold text-sm lg:text-[13px] cursor-pointer uppercase"
            >
              <option value="en">Recommendation</option>
              <option value="ar">Price: Low to High</option>
              <option value="ar">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* accessories */}
        <div className="flex flex-wrap gap-4  items-center justify-center">
          {filteredAccessories.map(accessory => (
            <div
              key={accessory.id}
              className="flex flex-col w-[220px] p-6 gap-2 bg-background rounded-lg"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${accessory.image}`}
                alt={accessory.heading}
                width={100}
                height={100}
                unoptimized
                className="w-[100px] h-[100px] object-cover mx-auto"
              />
              <p className="font-bold uppercase">{accessory.heading}</p>
              <p className="text-primary-light text-sm">{accessory.sub_heading}</p>
              <p className="font-bold text-sm uppercase">From ${accessory.price}.00</p>
              <button className="bg-[#107C11] text-white px-4 py-2 rounded hover:bg-green-600 transition-colors font-bold">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
