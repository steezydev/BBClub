import { useTokenBalance } from '@usedapp/core';
import { Falsy } from '@usedapp/core/dist/esm/src/model/types';
import { utils } from 'ethers';

import contractAddresses from '$/addresses';

export default function useBeanzBalance(account: string | Falsy) {
  const daiBalance = useTokenBalance(contractAddresses.BeanzToken, account);

  return (
    Math.round(parseFloat(utils.formatEther(daiBalance ?? 0)) * 10000) / 10000
  );
}
