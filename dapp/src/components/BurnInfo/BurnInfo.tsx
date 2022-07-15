import React from 'react';

import useUserStakeInfo from '@/hooks/BeanzStaker/useUserStakeInfo';

interface BurnInfoProps {
  address: string | undefined;
  maxBurnAmount?: number;
  selectedAmount?: number;
}

export default function BurnInfo({
  address,
  maxBurnAmount,
  selectedAmount = 0,
}: BurnInfoProps) {
  const [stakeInfo] = useUserStakeInfo(address);

  return (
    <div className='mb-16 flex flex-col items-center gap-8 text-xl md:flex-row md:items-start md:justify-around md:gap-0'>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-3xl'>{stakeInfo.amountBurned ?? '-'}</span>
        <span className='font-secondary'>beanz burned</span>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <span className='relative'>
          <span className='text-3xl'>
            {maxBurnAmount != undefined
              ? Math.round((100 / maxBurnAmount) * selectedAmount * 10) / 10
              : 0}{' '}
            %
          </span>
        </span>
        <span className='font-secondary'>success chance</span>
      </div>
    </div>
  );
}
