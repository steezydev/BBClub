import React, { useState } from 'react';

import { filterArray } from '@/lib/utils/filterArray';

import Button from '@/components/buttons/Button';
import Gallery from '@/components/Gallery/Gallery';
import Loader from '@/components/Loader/Loader';

import { TNftData } from '@/types/nft.types';

interface StakeProps {
  title: string;
  description: string;
  actionName: string;
  action: () => void;
  actionVariant?: 'normal' | 'warning' | 'success';
  data: TNftData[] | undefined;
}

const Stake = ({
  title,
  description,
  action,
  actionName,
  actionVariant = 'normal',
  data,
}: StakeProps) => {
  const [selectedNfts, setSelectedNfts] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelectedNfts((prev) => filterArray<number>(prev, id));
  };

  return (
    <div className='w-full'>
      <div className='mb-5 flex items-center justify-between'>
        <div>
          <h2>
            <span className='nes-text is-primary'>#</span> {title}
          </h2>
          <span>{description}</span>
        </div>
        <div>
          <Button
            onClick={action}
            variant={actionVariant}
            disabled={selectedNfts.length <= 0}
          >
            {actionName}
          </Button>
        </div>
      </div>
      {data ? (
        <Gallery>
          {data?.map((data, index) => (
            <Gallery.Item
              key={index}
              name={data.name}
              rank={data.rank}
              image={data.image}
              selected={selectedNfts.includes(data.id)}
              onClick={() => handleSelect(data.id)}
            />
          ))}
        </Gallery>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Stake;
