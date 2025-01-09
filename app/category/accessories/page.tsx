import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItems } from '@directus/sdk';

type AccessoriesType = {
  
}

async function page() {
  const accessoriesType = await directus.request(
    readItems(TableNames.ACCESSORIES_TYPE)
  );
  console.log(accessoriesType);

  const accessories = await directus.request(readItems(TableNames.ACCESSORIES));
  console.log(accessories);

  const data = accessories[0];

  const bgImageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${data.bg_img}`;

  return <div className="text-black mt-20 bg-white">page</div>;
}

export default page;
