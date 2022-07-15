import { useCall } from '@usedapp/core';

import { BeanzStakerContract } from '@/lib/contractsProvider';

const useMaxBurnTokens = (): [number | undefined, Error | undefined] => {
  const { value, error } =
    useCall({
      contract: BeanzStakerContract,
      method: 'maxBurnTokens',
      args: [],
    }) ?? {};

  return [value?.[0].toNumber(), error];
};

export default useMaxBurnTokens;
