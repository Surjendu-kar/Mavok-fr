import Accessories from '@/components/accessories/accessories';
import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItems } from '@directus/sdk';

async function Page() {
  // fetch accessories type
  const accessoriesType = await directus.request<AccessoriesType[]>(
    readItems(TableNames.ACCESSORIES_TYPE)
  );

  // fetch accessories
  const accessories = await directus.request<Accessories[]>(
    readItems(TableNames.ACCESSORIES)
  );

  return (
    <Accessories accessoriesType={accessoriesType} accessories={accessories} />
  );
}

export default Page;
