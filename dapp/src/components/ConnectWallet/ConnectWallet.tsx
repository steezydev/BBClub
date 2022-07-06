import { useEthers } from '@usedapp/core';
import React from 'react';

import Button from '@/components/buttons/Button';

export default function ConnectWallet() {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  return !account ? (
    <div>
      <Button onClick={activateBrowserWallet}>Connect Wallet</Button>
    </div>
  ) : (
    <div className='flex flex-col items-center gap-2'>
      <p>Account: {account}</p>
      <Button variant='ghost' onClick={() => deactivate()}>
        Disconnect
      </Button>
    </div>
  );
}
