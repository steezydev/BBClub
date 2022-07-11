import React from 'react';

import useClaimRewards from '@/hooks/BeanzStaker/useClaimRewards';
import useUserStakeInfo from '@/hooks/BeanzStaker/useUserStakeInfo';

interface StakeInfoProps {
  address: string | undefined;
}

export default function StakeInfo({ address }: StakeInfoProps) {
  const [stakeInfo] = useUserStakeInfo(address);
  const [claimRewards] = useClaimRewards();

  return (
    <div className='mb-16 flex flex-col items-center gap-8 text-xl md:flex-row md:items-start md:justify-around md:gap-0'>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-3xl'>{stakeInfo.number ?? '-'}</span>
        <span className='font-secondary'>beanz staked</span>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <span className='relative'>
          <span className='text-3xl'>{stakeInfo.reward ?? '-'}</span>
        </span>
        <span className='font-secondary'>accumulated $BBC</span>
        {stakeInfo.reward ?? 0 > 0 ? (
          <span
            onClick={() => claimRewards()}
            className='nes-text is-primary nes-pointer mt-3 text-sm'
          >
            Claim
          </span>
        ) : null}
      </div>
    </div>
  );
}
