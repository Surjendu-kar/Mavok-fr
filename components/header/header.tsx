import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { CartIcon, Logo, ProfileIcon, SearchIcon } from '@/public';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';

type HeaderData = {
  id: string;
  title: string;
  slug: string;
};

async function Header() {
  const allItems = (await directus.request(
    readItems(TableNames.HEADER)
  )) as HeaderData[];

  return (
    <div className="flex items-center justify-between px-10 py-5 bg-common-dark text-common-light">
      <div className="flex items-center gap-32">
        {/* logo */}
        <div>
          <Image
            src={Logo}
            alt="logo"
            className="w-auto h-auto"
            width={116}
            height={17}
            priority
          />
        </div>
        {/* navItems */}
        <div className="flex gap-10">
          {allItems.map((post: HeaderData) => (
            <Link key={post.id} href={post.slug} className="uppercase text-md font-bold">
              {post.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Image src={SearchIcon} alt="search" width={24} height={24} />
        <Image src={ProfileIcon} alt="profile" width={24} height={24} />
        <Image src={CartIcon} alt="cart" width={25} height={24} />
      </div>
    </div>
  );
}

export default Header;
