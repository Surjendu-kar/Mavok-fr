'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderData } from './types';
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import { BlackLogo, Logo } from '@/public';
import { usePathname } from 'next/navigation';

type ClientHeaderProps = {
  items: HeaderData[];
};

export function ClientHeader({ items }: ClientHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed top-0 flex items-center justify-between px-0 lg:px-10 lg:py-5 ${
          pathname === '/' ? 'text-common-light' : 'text-primary'
        } z-[2] w-full`}
      >
        {/* Logo */}
        <Link href="/">
          <Image
            src={pathname === '/' ? Logo : BlackLogo}
            alt="logo"
            className="w-auto h-auto"
            width={116}
            height={17}
            priority
          />
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-10">
          {items.map(post => (
            <Link
              key={post.id}
              href={`/category/${post.slug}`}
              className="uppercase text-md font-bold hover:text-gray-600 transition-colors"
            >
              {post.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6 pr-10 lg:0">
          <button
            aria-label="Search"
            className="hover:text-gray-600 transition-colors"
          >
            <FiSearch size={20} className="lg:w-6 lg:h-6" />
          </button>
          <button
            aria-label="Profile"
            className="hover:text-gray-600 transition-colors"
          >
            <FiUser size={20} className="lg:w-6 lg:h-6" />
          </button>
          <button
            aria-label="Cart"
            className="hover:text-gray-600 transition-colors"
          >
            <FiShoppingCart size={20} className="lg:w-6 lg:h-6" />
          </button>
          {!isMenuOpen && (
            <button
              className="lg:hidden hover:text-gray-600 transition-colors z-[4] fixed right-0 top-0"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed right-0 w-64 h-screen bg-white shadow-lg transition-transform duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden z-[3]`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="hover:text-gray-600 transition-colors"
          >
            <FiX size={24} className="text-black" />
          </button>
        </div>
        <nav className="py-4">
          {items.map(post => (
            <Link
              key={post.id}
              href={post.slug}
              className="block py-3 uppercase text-md font-bold hover:bg-gray-100 px-6 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {post.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-[0]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
