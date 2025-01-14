'use client';

import { useState, useEffect } from 'react';

type Props = {
  productId: string;
};

type Variant = {
  id: string;
  title: string;
};

type Product = {
  id: string;
  title: string;
  variants: Variant[];
};

export default function VariantsSelector({ productId }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:9000/store/products?handle=${productId}`, {
      credentials: 'include',
      headers: {
        'x-publishable-api-key':
          process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
      },
    })
      .then(res => res.json())
      .then(({ products }) => {
        if (!products.length) return;
        setProducts(products[0].variants);
      })
      .catch(error => console.error('Error fetching products:', error));
    setLoading(false);
  }, [productId]);

  console.log(products);

  if (loading) {
    return <div>Loading variants...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-lg">Options</h3>
      <div className="flex flex-col gap-2">
        {products.map(variant => (
          <button
            key={variant.id}
            className="px-4 py-2 border rounded-md hover:bg-primary-lighter"
          >
            {variant.title}
          </button>
        ))}
      </div>
    </div>
  );
}
