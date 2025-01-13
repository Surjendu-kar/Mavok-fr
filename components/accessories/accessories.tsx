'use client';
import { useState } from 'react';
import AccessoriesCategory from './accessoriesCategory';
import AccessoriesHeader from './accessoriesHeader';
import AccessoriesItems from './accessoriesItems';

type Props = {
  accessoriesType: AccessoriesType[];
  accessories: Accessories[];
};

export default function Accessories({ accessoriesType, accessories }: Props) {
  const [selectedType, setSelectedType] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('recommendation');

  //  filtered accessories
  const filteredAccessories = accessories.filter(accessory =>
    selectedType === 1 ? true : accessory.type === selectedType
  );

  //  sorted accessories
  const sortedAccessories = [...filteredAccessories].sort((a, b) => {
    switch (sortBy) {
      case 'price_low_to_high':
        return a.price - b.price;
      case 'price_high_to_low':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  //  handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="text-black mt-14 lg:mt-16 bg-white flex flex-col">
      <AccessoriesCategory
        accessoriesType={accessoriesType}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <div className="flex flex-col bg-secondary px-5 lg:px-20 py-5 lg:py-10 gap-6 border-t border-gray-200">
        <AccessoriesHeader
          sortBy={sortBy}
          handleSortChange={handleSortChange}
        />
        <AccessoriesItems accessories={sortedAccessories} />
      </div>
    </div>
  );
}
