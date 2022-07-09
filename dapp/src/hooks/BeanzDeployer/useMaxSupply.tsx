import { useCall } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useMaxSupply = (): [number | undefined, Error | undefined] => {
  const { value, error } =
    useCall({
      contract: BeanzDeployerContract,
      method: 'maxSupply',
      args: [],
    }) ?? {};

  return [value?.[0].toNumber(), error];
};

export default useMaxSupply;
