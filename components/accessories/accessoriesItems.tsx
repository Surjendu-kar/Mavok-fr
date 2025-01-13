'use client';

import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FiMinus, FiPlus } from 'react-icons/fi';

type Props = {
  accessories: Accessories[];
};

export default function AccessoriesItems({ accessories }: Props) {
  const { addItem, items, decreaseQuantity } = useCartStore();

  const handleAddToCart = (accessory: Accessories) => {
    addItem(accessory);
  };

  const getItemQuantity = (id: number) => {
    const item = items.find(item => item.id === id);
    return item?.quantity || 0;
  };

  return (
    <div className="flex flex-wrap gap-5 items-center justify-center lg:justify-start">
      {accessories.map(accessory => {
        const quantity = getItemQuantity(accessory.id);

        return (
          <div
            key={accessory.id}
            className="flex flex-col w-[150px] lg:w-[250px] p-3 lg:p-6 gap-2 bg-background rounded-lg hover:scale-105 transition-transform"
          >
            <Link
              href={`/category/accessories/${accessory.type}/${accessory.id}`}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${accessory.main_image}`}
                alt={accessory.heading}
                width={100}
                height={100}
                unoptimized
                className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] object-cover mx-auto"
              />
              <p className="font-bold uppercase text-sm lg:text-base">
                {accessory.heading}
              </p>
              <p className="text-primary-light text-xs lg:text-sm">
                {accessory.sub_heading}
              </p>
              <p className="font-bold text-xs lg:text-sm uppercase">
                From ${formatPrice(accessory.price)}.00
              </p>
            </Link>
            
            {/* Add to Cart Button or Quantity Controls */}
            {quantity === 0 ? (
              <button
                onClick={() => handleAddToCart(accessory)}
                aria-label={`Add ${accessory.heading} to cart`}
                className="bg-[#107C11] text-sm lg:text-base text-white lg:px-4 lg:py-2 px-0 py-1 rounded hover:bg-green-600 transition-colors font-bold"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-center gap-3 border rounded-md bg-white">
                <button
                  onClick={() => decreaseQuantity(accessory.id)}
                  className="p-2 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => addItem(accessory)}
                  className="p-2 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
