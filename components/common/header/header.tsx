import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItems } from '@directus/sdk';
import { ClientHeader } from './clientheader';

async function Header() {
  const items = (await directus.request(
    readItems(TableNames.HEADER)
  )) as HeaderData[];

  return <ClientHeader items={items} />;
}

export default Header;
