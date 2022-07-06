import { useEthers } from '@usedapp/core';

import { shortenHex } from '@/lib/helper';

import Button from '@/components/buttons/Button';

export function Profile() {
  const { activateBrowserWallet, account, deactivate, error } = useEthers();

  if (account) {
    return (
      <div>
        <div className='nes-text is-warning'>{shortenHex(account)}</div>
        {account != undefined && (
          <div className='mt-6'>
            <Button onClick={() => deactivate()}>Disconnect</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className='mt-6 text-center'>
        <Button variant='primary' onClick={activateBrowserWallet}>
          Connect Wallet
        </Button>
      </div>

      {error && <div className='nes-text is-error'>{error.message}</div>}
    </div>
  );
}
