import { useCall } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useWhitelistReserved = (): [number | undefined, Error | undefined] => {
  const { value, error } =
    useCall({
      contract: BeanzDeployerContract,
      method: 'whitelistReserved',
      args: [],
    }) ?? {};

  return [value?.[0].toNumber(), error];
};

export default useWhitelistReserved;
