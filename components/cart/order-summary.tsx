'use client';

import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/utils';

export default function OrderSummary() {
  const { items, total } = useCartStore();

  if (items.length === 0) return null;

  return (
    <div className="lg:w-[400px]">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="font-bold text-xl mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>{items.length} items</span>
            <span className="font-bold">${formatPrice(total())}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Savings</span>
            <span className="text-secondary-main font-bold">-$2.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-bold">FREE</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${formatPrice(total() - 2)}</span>
            </div>
          </div>
        </div>
        <button className="w-full bg-primary-main text-white py-3 rounded-md mt-6 font-bold hover:bg-primary-main_light transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
