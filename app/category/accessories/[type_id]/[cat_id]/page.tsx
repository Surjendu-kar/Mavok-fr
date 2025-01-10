import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { formatPrice } from '@/utils';
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
        <div className="flex flex-col justify-between gap-2 lg:gap-1">
          <div className="flex flex-col gap-2">
            <p className="text-primary-main font-bold uppercase">{type.type}</p>
            {/* heading */}
            <p className="text-3xl lg:text-4xl font-bold uppercase">
              {category.heading}
            </p>
            {/* sub heading */}
            <p className="text-primary-light text-lg">{category.sub_heading}</p>
          </div>

          <div className="flex flex-col justify-center gap-4 bg-primary-lighter w-[500px]  rounded-md p-5">
            {/* price */}
            <p className="text-3xl font-bold uppercase">
              ${formatPrice(category.price)} AUD
            </p>

            {/* offer */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="line-through text-primary-light">
                  ${formatPrice(category.price)} AUD
                </p>
                <p className="text-primary-secondary font-bold">
                  Save 25% or $111
                </p>
              </div>

              <p className="text-primary-light">
                or $27.75/month with 36-month financing*, before trade-in
              </p>
            </div>

            <button className="bg-primary-main text-xl text-white py-3 rounded hover:bg-primary-main_light transition-colors font-bold w-full">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Page;
