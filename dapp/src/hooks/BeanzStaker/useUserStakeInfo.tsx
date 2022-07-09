import { useCall } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import { utils } from 'ethers';

import { BeanzStakerContract } from '@/lib/contractsProvider';

interface IStakeInfo {
  number: number | null;
  reward: string | null;
}

const useUserStakeInfo = (
  address: string | Falsy
): [IStakeInfo, Error | undefined] => {
  const { value, error } =
    useCall({
      contract: BeanzStakerContract,
      method: 'userStakeInfo',
      args: [address as string],
    }) ?? {};
  if (error) {
    throw new Error(error.message);
  }

  const stakeInfo: IStakeInfo = {
    number: value?.[0].toNumber() ?? null,
    reward: value?.[1] != undefined ? utils.formatEther(value?.[1]) : null,
  };

  return [stakeInfo, error];
};

export default useUserStakeInfo;
