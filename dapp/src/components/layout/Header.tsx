import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Connect from '@/components/Connect/Connect';
import UnstyledLink from '@/components/links/UnstyledLink';
import Menu from '@/components/Menu/Menu';

const links = [
  { href: '/#about', label: 'About', className: 'text-sm' },
  { href: '/#roadmap', label: 'Roadmap', className: 'text-sm' },
  { href: '/mint', label: 'Mint', className: 'nes-text is-primary text-sm' },
  { href: '/stake', label: 'Stake', className: 'nes-text is-primary text-sm' },
  { href: '/burn', label: 'Burn', className: 'nes-text is-error text-sm' },
];

export default function Header() {
  return (
    <header className='top-0 z-50  bg-body'>
      <div className='layout flex h-20 items-center justify-between'>
        <div className='flex w-full items-center justify-between gap-10 md:w-fit'>
          <Link href='/'>
            <div className='relative h-20 w-36 md:w-64'>
              <Image
                className='relative w-full '
                src='/images/logo.png'
                alt='logo'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </Link>
          <nav className='hidden md:block'>
            <ul className='flex items-center justify-between space-x-5'>
              {links.map(({ href, label, className }) => (
                <li key={`${href}${label}`}>
                  <UnstyledLink
                    href={href}
                    className={clsxm('hover:text-gray-600', className)}
                  >
                    {label}
                  </UnstyledLink>
                </li>
              ))}
              {/* <li className='pl-4'>
              <Link href='/stake'>
                <Button variant='warning'>Stake!</Button>
              </Link>
            </li> */}
            </ul>
          </nav>
          <div className='md:hidden'>
            <Menu />
          </div>
        </div>
        <div className='hidden md:block'>
          <Connect />
        </div>
      </div>
    </header>
  );
}
