'use client';

import useCartStore from '@/store/cartStore';
import { FiMinus, FiPlus } from 'react-icons/fi';

type Props = {
  product: Accessories;
};

export default function AddToCart({ product }: Props) {
  const { addItem, items, decreaseQuantity } = useCartStore();

  const handleAddToCart = (product: Accessories) => {
    addItem(product);
  };

  const getItemQuantity = (id: number) => {
    const item = items.find(item => item.id === id);
    return item?.quantity || 0;
  };

  const quantity = getItemQuantity(product.id);

  return (
    <>
      {quantity === 0 ? (
        <button
          onClick={() => handleAddToCart(product)}
          aria-label={`Add ${product.heading} to cart`}
          className="bg-primary-main text-md lg:text-xl text-white py-1 lg:py-3 rounded hover:bg-primary-main_light transition-colors font-bold w-full"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-center gap-3 border rounded-md bg-white w-full py-1 lg:py-3">
          <button
            onClick={() => decreaseQuantity(product.id)}
            className="p-2 hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <FiMinus />
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={() => addItem(product)}
            className="p-2 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <FiPlus />
          </button>
        </div>
      )}
    </>
  );
}
