import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItem } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

type Props = {
  params: Promise<{
    type_id: string;
    cat_id: string;
  }>;
};

async function Page({ params }: Props) {
  const { type_id, cat_id } = await params;

  // fetch type
  const type = await directus.request<AccessoriesType>(
    readItem(TableNames.ACCESSORIES_TYPE, type_id, {
      fields: ['type'],
    })
  );

  // fetch category
  const category = await directus.request<Accessories>(
    readItem(TableNames.ACCESSORIES, cat_id)
  );

  return (
    <div className="mt-16 flex flex-col px-5 lg:px-24 py-10  gap-5">
      {/* breadcrumb */}
      <div className="flex flex-wrap items-center font-bold ">
        <Link
          href="/category/accessories"
          className="text-primary-light/50 hover:text-primary-light transition-colors capitalize "
        >
          accessories
        </Link>
        <IoIosArrowForward className="text-primary-light/50" />
        <p className="text-primary-light/50">{type.type}</p>
        <IoIosArrowForward className="text-primary-light/50" />
        <p className="text-primary uppercase">{category.heading}</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-3">
        {/* left side */}
        <div className="flex flex-col gap-2 lg:gap-4">
          {/* image */}
          <div className="flex justify-center items-center bg-primary-lighter w-[300px] h-[300px] lg:w-[650px]  lg:h-[600px] rounded-md">
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${category.image}`}
              alt={category.heading}
              width={200}
              height={200}
              unoptimized
              className="w-[180px] h-[180px] lg:w-[400px] lg:h-[400px] object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-wrap gap-1 lg:gap-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-primary-lighter lg:w-[100px] lg:h-[100px] w-[70px] h-[70px]"
              ></div>
            ))}
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-col gap-2 lg:gap-1">
          {/* heading */}
          <h1 className="text-3xl lg:text-4xl font-bold uppercase">
            {category.heading}
          </h1>
          {/* sub heading */}
          <p className="text-primary-light text-lg">{category.sub_heading}</p>
          {/* price */}
          <p className="text-2xl font-bold uppercase">
            From ${category.price}.00
          </p>
          <button className="bg-[#107C11] text-white px-6 py-3 rounded hover:bg-green-600 transition-colors font-bold w-fit">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
