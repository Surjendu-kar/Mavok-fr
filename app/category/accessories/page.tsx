import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItems } from '@directus/sdk';
import Image from 'next/image';

type AccessoriesType = {
  id: number;
  image: string;
  type: string;
};
type Accessories = {
  id: number;
  image: string;
  heading: string;
  sub_heading: string;
  price: number;
  type: number;
};

async function page() {
  // fetch accessories type
  const accessoriesType = await directus.request<AccessoriesType[]>(
    readItems(TableNames.ACCESSORIES_TYPE)
  );
  console.log({ accessoriesType });

  // fetch accessories
  const accessories = await directus.request<Accessories[]>(
    readItems(TableNames.ACCESSORIES)
  );
  console.log({ accessories });

  // const accessories

  // const data = accessories[0];

  // const bgImageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${data.bg_img}`;

  return (
    <div className="text-black mt-20 bg-white flex flex-col">
      {/* category */}
      <div className="flex flex-wrap gap-2 items-center justify-center py-10">
        {accessoriesType.map(type => (
          <div
            key={type.id}
            className="flex flex-col items-center justify-center cursor-pointer hover:bg-[#7373731f] rounded-lg transition-all duration-300"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${type.image}`}
              alt={type.type}
              width={100}
              height={100}
              unoptimized
            />
            <p className="font-bold">{type.type}</p>
          </div>
        ))}
      </div>

      {/* accessories */}
      <div className="flex flex-wrap gap-4 bg-[#FAFAFA] p-10 items-center justify-center">
        {accessories.map(accessory => (
          <div
            key={accessory.id}
            className="flex flex-col w-[220px] p-6 gap-2 bg-background rounded-lg"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${accessory.image}`}
              alt={accessory.heading}
              width={100}
              height={100}
              unoptimized
              className="w-[100px] h-[100px] object-cover mx-auto"
            />
            <p className="font-bold">{accessory.heading}</p>
            <p className="text-primary-light">{accessory.sub_heading}</p>
            <p className="font-bold text-sm">From ${accessory.price}.00</p>
            <button className="bg-[#107C11] text-white px-4 py-2 rounded hover:bg-green-600 transition-colors font-bold">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
