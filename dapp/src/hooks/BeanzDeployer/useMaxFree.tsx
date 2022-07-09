import { useCall } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useMaxFree = (): [number | undefined, Error | undefined] => {
  const { value, error } =
    useCall({ contract: BeanzDeployerContract, method: 'maxFree', args: [] }) ??
    {};

  return [value?.[0].toNumber(), error];
};

export default useMaxFree;
