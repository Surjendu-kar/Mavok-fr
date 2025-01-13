'use client';

import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { formatPrice } from '@/utils';
import useCartStore from '@/store/cartStore';

export default function CartItems() {
  const { items, decreaseQuantity, addItem, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map(item => (
        <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg">
          <Image
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.main_image}`}
            alt={item.heading}
            width={70}
            height={70}
            unoptimized
            className="w-[70px] h-[70px] object-cover rounded-md"
          />
          <div className="flex flex-col flex-grow gap-2">
            {/* Item details */}
            <div className="flex justify-between">
              <div>
                <p className="font-bold">{item.heading}</p>
                <p className="text-gray-500 text-sm">{item.sub_heading}</p>
              </div>
              <p className="font-bold">
                ${formatPrice(item.price * item.quantity)}
              </p>
            </div>
            {/* Quantity controls */}
            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center gap-3 border rounded-md overflow-hidden">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="p-2 hover:bg-gray-100"
                >
                  <FiMinus />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => addItem(item)}
                  className="p-2 hover:bg-primary-main hover:text-background transition-all duration-300"
                >
                  <FiPlus />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-secondary-light hover:text-secondary-main hover:scale-110 transition-transform duration-300"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
