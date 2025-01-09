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
    <div className="text-black mt-14 lg:mt-16 bg-white flex flex-col">
      {/* category */}
      <div className="flex flex-wrap gap-2 justify-center py-5 border-t border-gray-200">
        {accessoriesType.map(type => (
          <div
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex flex-col items-center w-[80px] lg:w-[100px] cursor-pointer rounded-lg transition-all duration-300 p-4 ${
              selectedType === type.id
                ? 'bg-[#FAFAFA]'
                : 'hover:bg-[#FAFAFA]'
            }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${type.image}`}
              alt={type.type}
              width={50}
              height={50}
              unoptimized
              className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] object-cover mx-auto"
            />
            <p className="font-bold text-center text-xs lg:text-base">{type.type}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col bg-[#FAFAFA] px-5 lg:px-20 py-5 lg:py-10 gap-6 border-t border-gray-200">
        {/* header */}
        <div className="flex justify-between">
          <p className="text-primary lg:text-2xl text-xl font-bold">Accessories</p>
          <div className="flex gap-2 items-center">
            <p className="text-primary-light text-xs lg:text-sm font-bold">Sort by :</p>
            <select
              name="sort"
              id="sort"
              className="text-primary bg-transparent font-bold text-xs lg:text-sm cursor-pointer uppercase"
            >
              <option value="recommendation">Recommendation</option>
              <option value="price_low_to_high">Price: Low to High</option>
              <option value="price_high_to_low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* accessories */}
        <div className="flex flex-wrap gap-4 items-center">
          {filteredAccessories.map(accessory => (
            <div
              key={accessory.id}
              className="flex flex-col w-[150px] lg:w-[220px] p-3 lg:p-6 gap-2 bg-background rounded-lg"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${accessory.image}`}
                alt={accessory.heading}
                width={100}
                height={100}
                unoptimized
                className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] object-cover mx-auto"
              />
              <p className="font-bold uppercase text-sm lg:text-base">{accessory.heading}</p>
              <p className="text-primary-light text-xs lg:text-sm">{accessory.sub_heading}</p>
              <p className="font-bold text-xs lg:text-sm uppercase">From ${accessory.price}.00</p>
              <button className="bg-[#107C11] text-sm lg:text-base text-white lg:px-4 lg:py-2 px-0 py-1 rounded hover:bg-green-600 transition-colors font-bold">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
