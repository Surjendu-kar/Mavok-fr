import { PaymentPartners } from '@/components/common/payment-partners';
import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { formatPrice } from '@/utils';
import { readItem, readItems } from '@directus/sdk';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { TbTruckDelivery } from 'react-icons/tb';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { BiSupport } from 'react-icons/bi';
import { PiCreditCardFill } from 'react-icons/pi';
import ImageGallery from '@/components/product-details/image-gallery';

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

  const accessories_file = await directus.request<AccessoriesFile[]>(
    readItems('accessories_files')
  );

  const multipleImages = accessories_file.reduce<Record<string, string[]>>(
    (acc, file) => {
      if (file.accessories_id == cat_id) {
        if (acc[file.accessories_id]) {
          acc[file.accessories_id].push(file.directus_files_id);
        } else {
          acc[file.accessories_id] = [file.directus_files_id];
        }
      }
      return acc;
    },
    {}
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
        <ImageGallery category={category} multipleImages={multipleImages} />

        {/* right side */}
        <div className="flex flex-col justify-between gap-2 lg:gap-1">
          <div className="flex flex-col gap-1">
            {/* type */}
            <p className="text-primary-main font-bold uppercase text-sm lg:text-base">
              {type.type}
            </p>
            {/* heading */}
            <p className="text-2xl lg:text-4xl font-bold uppercase">
              {category.heading}
            </p>
            {/* sub heading */}
            <p className="text-primary-light text-sm lg:text-base">
              {category.sub_heading}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-2 lg:gap-4 bg-primary-lighter w-[350px] lg:w-[500px]  rounded-md p-3 lg:p-5">
            {/* price */}
            <p className="text-xl lg:text-3xl font-bold uppercase">
              ${formatPrice(category.price)} AUD
            </p>

            {/* offer */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="line-through text-primary-light text-sm lg:text-base">
                  ${formatPrice(category.price)} AUD
                </p>
                <p className="text-secondary-main font-bold text-sm lg:text-base">
                  Save 25% or $111
                </p>
              </div>

              <p className="text-primary-light text-sm lg:text-base">
                or $27.75/month with 36-month financing*, before trade-in
              </p>
            </div>

            <button className="bg-primary-main text-md lg:text-xl text-white py-1 lg:py-3 rounded hover:bg-primary-main_light transition-colors font-bold w-full">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Estimated dispatch with 2-days Free Shipping */}
        <div className="flex items-center gap-3 border-b py-1 lg:py-2  text-sm lg:text-base">
          <TbTruckDelivery className="text-2xl text-primary-light" />
          <span className="text-primary-light">
            Estimated dispatch with 2-days Free Shipping
          </span>
        </div>
        {/* Return Policy */}
        <div className="flex items-center justify-between border-b py-1 lg:py-2 text-sm lg:text-base">
          <div className="flex items-center gap-3">
            <IoShieldCheckmarkOutline className="text-2xl text-primary-light" />
            <span className="text-primary-light">15-days return policy</span>
          </div>
          <IoIosArrowForward className="text-primary-light" />
        </div>
        {/* Global Support */}
        <div className="flex items-center gap-3 border-b py-1 lg:py-2 text-sm lg:text-base">
          <BiSupport className="text-2xl text-primary-light" />
          <span className="text-primary-light">Global support</span>
        </div>
        {/* Ways to pay */}
        <div className="flex items-center gap-3 pt-1 lg:pt-2 pb-4 text-sm lg:text-base">
          <PiCreditCardFill className="text-2xl text-primary-light" />
          <span className="text-primary-light">Ways to pay</span>
        </div>
        {/* payment partners */}
        <PaymentPartners />
      </div>
    </div>
  );
}

export default Page;
