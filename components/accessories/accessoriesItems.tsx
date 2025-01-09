import Image from 'next/image';
import Link from 'next/link';

type Props = {
  accessories: Accessories[];
};

export default function AccessoriesItems({ accessories }: Props) {
  return (
    <div className="flex flex-wrap gap-5 items-center justify-center lg:justify-start">
      {accessories.map(accessory => {
        return (
          <Link
            href={`/category/accessories/${accessory.type}/${accessory.id}`}
            key={accessory.id}
            className="flex flex-col w-[150px] lg:w-[250px] p-3 lg:p-6 gap-2 bg-background rounded-lg hover:scale-105 transition-transform"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${accessory.image}`}
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
              From ${accessory.price}.00
            </p>
            <button className="bg-[#107C11] text-sm lg:text-base text-white lg:px-4 lg:py-2 px-0 py-1 rounded hover:bg-green-600 transition-colors font-bold">
              Add to Cart
            </button>
          </Link>
        );
      })}
    </div>
  );
}
