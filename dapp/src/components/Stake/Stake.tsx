import React, { useState } from 'react';

import { filterArray } from '@/lib/utils/filterArray';
import useSetApprovalForAll from '@/hooks/BeanzDeployer/useSetApprovalForAll';

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
  needsApproval?: boolean;
  errorMessage?: string;
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
  needsApproval = false,
  errorMessage,
}: StakeProps) => {
  const [selectedNfts, setSelectedNfts] = useState<number[]>([]);

  const [setApprovalForAll, approvalState] = useSetApprovalForAll();

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
          {errorMessage != undefined ? (
            <span className='nes-text is-error'>{errorMessage}</span>
          ) : (
            <span>{description}</span>
          )}
        </div>
        <div>
          {!needsApproval ? (
            <Button
              onClick={() => handleAction()}
              variant={actionVariant}
              disabled={selectedNfts.length <= 0 || disableAction}
            >
              {actionName}
            </Button>
          ) : (
            <Button
              onClick={() => setApprovalForAll()}
              variant='success'
              disabled={
                approvalState.status != 'None' &&
                approvalState.status != 'Exception'
              }
            >
              Approve
            </Button>
          )}
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
                onClick={
                  !needsApproval && !disableAction
                    ? () => handleSelect(data.id)
                    : () => void 1
                }
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
