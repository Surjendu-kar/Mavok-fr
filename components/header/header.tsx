import directus from '@/directus/client';
import { CartIcon, ProfileIcon, SearchIcon } from '@/public';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';

type HeaderData = {
  id: string;
  title: string;
  slug: string;
};

async function Header() {
  const allPosts = (await directus.request(
    readItems('header')
  )) as HeaderData[];

  return (
    <div className="flex items-center justify-between px-10 py-5">
      <div className="flex items-center gap-32">
        {/* logo */}
        <div>
          <Image src="/logo.svg" alt="logo" width={116} height={100} />
        </div>
        {/* navItems */}
        <div className="flex gap-10">
          {allPosts.map((post: HeaderData) => (
            <Link key={post.id} href={post.slug} className="capitalize text-md">
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
