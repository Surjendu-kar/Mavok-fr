'use client';

import useCartStore from '@/store/cartStore';
import { FiTrash2 } from 'react-icons/fi';

export default function CartHeader() {
  const { items, clearCart } = useCartStore();

  return (
    <div className="flex justify-between items-center">
      <p className="text-primary lg:text-2xl text-xl font-bold uppercase">
        My Cart
      </p>
      {items.length > 0 && (
        <div className="flex items-center gap-2 px-6 py-2 rounded-md text-secondary-light hover:bg-red-50 hover:text-secondary-main hover:scale-110 transition-transform duration-300 cursor-pointer">
          <button onClick={clearCart}>
            <FiTrash2 />
          </button>
          <p className="text-sm lg:text-base">Clear Cart</p>
        </div>
      )}
    </div>
  );
}
