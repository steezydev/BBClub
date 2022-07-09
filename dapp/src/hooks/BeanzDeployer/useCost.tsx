import { useCall } from '@usedapp/core';
import { BigNumber } from 'ethers';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useCost = (): [BigNumber | undefined, Error | undefined] => {
  const { value, error } =
    useCall({ contract: BeanzDeployerContract, method: 'cost', args: [] }) ??
    {};
  if (error) {
    throw new Error(error.message);
  }

  return [value?.[0], error];
};

export default useCost;
