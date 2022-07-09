import { useCall } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useMaxMintAmountPerTx = (): [number | undefined, Error | undefined] => {
  const { value, error } =
    useCall({
      contract: BeanzDeployerContract,
      method: 'maxMintAmountPerTx',
      args: [],
    }) ?? {};

  return [value?.[0].toNumber(), error];
};

export default useMaxMintAmountPerTx;
