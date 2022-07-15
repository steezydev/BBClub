import { useEthers } from '@usedapp/core';
import * as React from 'react';

import { shortenHex } from '@/lib/helper';
import useTokenPrice from '@/hooks/BeanzDeployer/useCost';
import useMaxFree from '@/hooks/BeanzDeployer/useMaxFree';
import useMaxFreeTx from '@/hooks/BeanzDeployer/useMaxFreeMintAmountPerTx';
import useMaxTx from '@/hooks/BeanzDeployer/useMaxMintAmountPerTx';
import useMaxSupply from '@/hooks/BeanzDeployer/useMaxSupply';
import usePaused from '@/hooks/BeanzDeployer/usePaused';
import useTotalSupply from '@/hooks/BeanzDeployer/useTotalSupply';
import useWhitelistEnabled from '@/hooks/BeanzDeployer/useWhitelistMintEnabled';
import useWhitelistReserved from '@/hooks/BeanzDeployer/useWhitelistReserved';

import BeanBubble from '@/components/BeanBubble/BeanBubble';
import CollectionStatus from '@/components/CollectionStatus/CollectionStatus';
import Layout from '@/components/layout/Layout';
import MintWidget from '@/components/MintWidget/MintWidget';
import { Profile } from '@/components/Profile/Profile';
import Seo from '@/components/Seo';

import contractAddresses from '$/addresses';

export default function MintPage() {
  const { account } = useEthers();

  const [totalSupply] = useTotalSupply();
  const [maxFree] = useMaxFree();
  const [maxFreePerTx] = useMaxFreeTx();
  const [maxPerTx] = useMaxTx();
  const [isWhitelistEnabled] = useWhitelistEnabled();
  const [isPaused] = usePaused();
  const [tokenPrice] = useTokenPrice();
  const [maxSupply] = useMaxSupply();
  const [whitelistReserved] = useWhitelistReserved();

  return (
    <Layout>
      <Seo templateTitle='Mint' />

      <main>
        <section className='layout min-h-screen'>
          {account ? (
            <div className='flex flex-col items-center justify-center gap-5 py-20'>
              <CollectionStatus
                maxSupply={maxSupply}
                totalSupply={totalSupply}
                maxFree={maxFree}
                whitelistReserved={whitelistReserved}
                isWhitelistEnabled={isWhitelistEnabled}
                isPaused={isPaused}
              />
              <MintWidget
                address={account}
                tokenPrice={tokenPrice}
                totalSupply={totalSupply}
                maxFree={maxFree}
                maxFreePerTx={maxFreePerTx}
                maxPerTx={maxPerTx}
                isWhitelistEnabled={isWhitelistEnabled}
                isPaused={isPaused}
              />
            </div>
          ) : (
            <div className='layout mt-32 flex min-h-[50vh] flex-col items-center text-center'>
              <BeanBubble>
                <div>
                  {"Oops! Looks like you haven't connected your wallet! "}
                  Connect it now!
                </div>
                <div>
                  <Profile />
                </div>
              </BeanBubble>
            </div>
          )}
          <div className='mb-56 md:mb-36'>
            <BeanBubble type='rtl'>
              <div className='h-fit font-secondary'>
                <p>Let me tell you the rules:</p>
                <ul className='list-disc py-2 pl-8 text-sm'>
                  <li>
                    <span className='text-base font-bold'>5555 Beanz</span>{' '}
                    total
                  </li>
                  <li>
                    First <span className='text-base font-bold'>1555 free</span>{' '}
                    Beanz
                  </li>
                  <li>
                    <span className='text-base font-bold'>2 free Beanz</span>{' '}
                    per Tx
                  </li>
                  <li>
                    <span className='text-base font-bold'>10 free</span> per
                    wallet
                  </li>
                  <li>
                    <span className='text-base font-bold'>5 Beanz</span> per Tx
                  </li>
                  <li>
                    <span className='text-base font-bold'>50 Beanz</span> per
                    wallet
                  </li>
                </ul>
                <p>
                  <span className='text-base font-bold'>1110 free Beanz</span>{' '}
                  are reserved for{' '}
                  <span className='text-base font-bold'>whitelist</span>. Go to
                  our <a href='https://twitter.com/basedbeanzclub'>twitter</a>{' '}
                  to learn more on how to get into whitelist!
                </p>
                <p className='mt-5'>
                  Contract:{' '}
                  <a
                    target='_blank'
                    className='nes-text is-primary'
                    href={`https://etherscan.io/address/${contractAddresses.BeanzDeployer}`}
                    rel='noreferrer'
                  >
                    {shortenHex(contractAddresses.BeanzDeployer, 10)}
                  </a>
                </p>
              </div>
            </BeanBubble>
          </div>
        </section>
      </main>
    </Layout>
  );
}
