import { useCall } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

import contractAddresses from '$/addresses';

const useIsApprovedForAll = (
  address: string | Falsy
): [boolean | undefined, Error | undefined] => {
  const { value, error } =
    useCall({
      contract: BeanzDeployerContract,
      method: 'isApprovedForAll',
      args: [address as string, contractAddresses.BeanzStaker],
    }) ?? {};
  if (error) {
    throw new Error(error.message);
  }

  return [value?.[0], error];
};

export default useIsApprovedForAll;
