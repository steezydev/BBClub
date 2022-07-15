import { useCall } from '@usedapp/core';

import { BeanzStakerContract } from '@/lib/contractsProvider';

const useStakePaused = (): [boolean | undefined, Error | undefined] => {
  const { value, error } =
    useCall({
      contract: BeanzStakerContract,
      method: 'stakePaused',
      args: [],
    }) ?? {};
  if (error) {
    throw new Error(error.message);
  }

  return [value?.[0], error];
};

export default useStakePaused;
