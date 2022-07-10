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
  action: (ids: number[]) => void;
  actionVariant?: 'normal' | 'warning' | 'success';
  data: TNftData[] | undefined;
  emptyMessage: string;
  disableAction: boolean;
}

const Stake = ({
  title,
  description,
  action,
  actionName,
  actionVariant = 'normal',
  data,
  emptyMessage,
  disableAction,
}: StakeProps) => {
  const [selectedNfts, setSelectedNfts] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelectedNfts((prev) => filterArray<number>(prev, id));
  };

  const handleAction = () => {
    action(selectedNfts);
    setSelectedNfts([]);
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
            onClick={() => handleAction()}
            variant={actionVariant}
            disabled={selectedNfts.length <= 0 || disableAction}
          >
            {actionName}
          </Button>
        </div>
      </div>
      {data != undefined ? (
        data.length > 0 ? (
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
          <div className='mt-9 text-center'>{emptyMessage}</div>
        )
      ) : (
        <div className='mt-9 text-center'>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Stake;
