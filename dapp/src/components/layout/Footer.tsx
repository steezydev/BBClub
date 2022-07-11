import React from 'react';

export default function Footer() {
  return (
    <footer className='mb-5 mt-10 flex w-full flex-col items-center justify-center gap-3 font-secondary text-sm text-[#4a4949] md:inline-flex md:flex-row md:gap-8'>
      <span>@ BasedBeanzClub</span>
      <a
        className='nounder no-underline hover:no-underline'
        href='https://twitter.com/basedbeanzclub'
        target='_blank'
        rel='noreferrer'
      >
        <span className='text-[#4a4949] '>Twitter</span>
      </a>
      <span className='line-through'>Discord</span>
    </footer>
  );
}
