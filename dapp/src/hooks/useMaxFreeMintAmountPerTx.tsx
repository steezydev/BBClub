import { useCall } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useMaxFreeMintAmountPerTx = (): [
  number | undefined,
  Error | undefined
] => {
  const { value, error } =
    useCall({
      contract: BeanzDeployerContract,
      method: 'maxFreeMintAmountPerTx',
      args: [],
    }) ?? {};

  return [value?.[0].toNumber(), error];
};

export default useMaxFreeMintAmountPerTx;
