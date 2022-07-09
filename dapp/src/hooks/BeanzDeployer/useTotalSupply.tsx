import { useCall } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useTotalSupply = (): [number | undefined, Error | undefined] => {
  const { value, error } =
    useCall({
      contract: BeanzDeployerContract,
      method: 'totalSupply',
      args: [],
    }) ?? {};

  return [value?.[0].toNumber(), error];
};

export default useTotalSupply;
