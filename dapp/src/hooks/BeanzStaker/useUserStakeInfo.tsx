import { useCall } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import { utils } from 'ethers';

import { BeanzStakerContract } from '@/lib/contractsProvider';

interface IStakeInfo {
  amountStaked: number | null;
  amountBurned: number | null;
  reward: number | null;
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

  const stakeInfo: IStakeInfo = {
    amountStaked: value?.[0].toNumber() ?? null,
    amountBurned: value?.[1].toNumber() ?? null,
    reward:
      value?.[2] != undefined
        ? Math.round(parseFloat(utils.formatEther(value?.[1])) * 10000) / 10000
        : null,
  };

  return [stakeInfo, error];
};

export default useUserStakeInfo;
