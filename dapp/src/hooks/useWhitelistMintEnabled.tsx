import { useCall } from '@usedapp/core';

import { BeanzDeployerContract } from '@/lib/contractsProvider';

const useWhitelistMintEnabled = () => {
  const { value, error } =
    useCall({ contract: BeanzDeployerContract, method: 'whitelistMintEnabled', args: [] }) ?? {};
  if (error) {
    throw new Error(error.message);
  }

  return [value?.[0], error];
};

export default useWhitelistMintEnabled;