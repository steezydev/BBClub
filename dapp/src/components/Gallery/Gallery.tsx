import Image from 'next/image';
import React, { Children } from 'react';
import { Col, Row } from 'react-simple-flex-grid';

import 'react-simple-flex-grid/lib/main.css';

import { TRank } from '@/types/nft.types';
interface GalleryProps {
  children: React.ReactNode;
}

interface GalleryItemProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  name: string;
  rank: TRank;
  image: string;
  selected?: boolean;
}

const rankColor = {
  Bean: 'is-primary',
  'Alpha Bean': 'is-error',
  OG: 'is-warning',
};

const GalleryItem = ({
  name,
  rank,
  image,
  selected = false,
  onClick,
}: GalleryItemProps) => {
  return (
    <div className='nes-pointer min-w-[300px] p-7' onClick={onClick}>
      <div className='w-100 nes-container is-rounded relative mb-6 aspect-square pb-[20%]'>
        {selected && (
          <div className='absolute top-[-20px] right-[-45px] z-20 order-1 flex h-8 items-center p-2 px-3 '>
            <i className='nes-icon coin is-medium'></i>
          </div>
        )}
        <Image
          alt='Image Alt'
          src={image}
          layout='fill'
          objectFit='contain' // Scale your image down to fit into the container
        />
      </div>
      <div className='flex justify-center'>
        <div className='nes-badge is-icon z-20 order-1 flex w-40 items-center '>
          <span className={`${rankColor[rank]} w-10`}>{rank}</span>
          <span className='is-dark static w-full font-secondary text-base font-semibold text-white'>
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

const Gallery = ({ children }: GalleryProps) => {
  const items = Children.toArray(children) as React.ReactElement[];

  return (
    <Row gutter={20}>
      {items.map((item, index) => (
        <Col key={'gallery-col' + index}>{React.cloneElement(item)}</Col>
      ))}
    </Row>
  );
};

Gallery.Item = GalleryItem;

export default Gallery;
