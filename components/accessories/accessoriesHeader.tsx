type Props = {
  sortBy: string;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function AccessoriesHeader({ sortBy, handleSortChange }: Props) {
  return (
    <div className="flex justify-between">
      <p className="text-primary lg:text-2xl text-xl font-bold">Accessories</p>
      <div className="flex gap-2 items-center">
        <p className="text-primary-light text-xs lg:text-sm font-bold">
          Sort by :
        </p>
        <select
          name="sort"
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="text-primary bg-transparent font-bold text-xs lg:text-sm cursor-pointer uppercase outline-none border-none focus:ring-0 focus:outline-none"
        >
          <option value="recommendation">Recommendation</option>
          <option value="price_low_to_high">Price: Low to High</option>
          <option value="price_high_to_low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
