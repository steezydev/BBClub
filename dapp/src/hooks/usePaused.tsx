import { useCall } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const usePaused = () => {
  const { value, error } =
    useCall({ contract: BeanzDeployerContract, method: 'paused', args: [] }) ?? {};
  if (error) {
    throw new Error(error.message);
  }

  return [value?.[0], error];
};

export default usePaused;