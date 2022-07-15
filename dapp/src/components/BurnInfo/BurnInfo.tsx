import React from 'react';

import useUserStakeInfo from '@/hooks/BeanzStaker/useUserStakeInfo';

interface StakeInfoProps {
  address: string | undefined;
}

export default function StakeInfo({ address }: StakeInfoProps) {
  const [stakeInfo] = useUserStakeInfo(address);

  return (
    <div className='mb-16 flex flex-col items-center gap-8 text-xl md:flex-row md:items-start md:justify-around md:gap-0'>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-3xl'>{stakeInfo.amountBurned ?? '-'}</span>
        <span className='font-secondary'>beanz burned</span>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <span className='relative'>
          <span className='text-3xl'>{stakeInfo.reward ?? '-'}</span>
        </span>
        <span className='font-secondary'>accumulated $BBC</span>
      </div>
    </div>
  );
}
