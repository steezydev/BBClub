import { useEthers } from '@usedapp/core';
import React from 'react';

import useBeanzBalance from '@/hooks/BeanzToken/useBeanzBalance';

import Button from '@/components/buttons/Button';
import WalletModal from '@/components/WalletModal/WalletModal';

export default function Connect() {
  const { activateBrowserWallet, account, deactivate, error } = useEthers();
  const tokenBalance = useBeanzBalance(account);

  if (account) {
    return (
      <div className='flex items-center gap-6'>
        <WalletModal
          disconnect={() => deactivate()}
          address={account}
          balance={tokenBalance}
        />
      </div>
    );
  }

  return (
    <div>
      <div className='text-center'>
        <Button variant='primary' onClick={activateBrowserWallet}>
          Connect
        </Button>
      </div>

      {error && <div className='nes-text is-error'>{error.message}</div>}
    </div>
  );
}
