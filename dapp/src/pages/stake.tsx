import { useEthers } from '@usedapp/core';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { getNftsData } from '@/lib/utils/nftData';
import useWalletOfOwner from '@/hooks/useWalletOfOwner';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Stake from '@/components/Stake/Stake';

import { TNftData } from '@/types/nft.types';

export default function StakePage() {
  const { account = '' } = useEthers();
  const [mintedNfts] = useWalletOfOwner(account);
  const [mintedNftData, setMintedNftData] = useState<TNftData[]>();

  useEffect(() => {
    if (mintedNfts != undefined) {
      getNftsData(mintedNfts).then((data) => {
        setMintedNftData(data);
      });
    }
  }, [mintedNfts]);

  return (
    <Layout>
      <Seo templateTitle='Stake' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <div className='mb-16 flex justify-around text-xl'>
              <div className='flex flex-col items-center justify-center'>
                <span className='text-3xl'>0</span>
                <span className='font-secondary'>beanz staked</span>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <span className='text-3xl'>0</span>
                <span className='font-secondary'>accumulated $BBC</span>
              </div>
            </div>
            <div className='mb-24'>
              <Stake
                title='Unstake'
                description='Select which Beanz to unstake'
                actionName='Unstake'
                data={mintedNftData}
                action={() => void 1}
              />
            </div>
            <div>
              <Stake
                title='Stake'
                description='Select which Beanz to stake'
                actionName='Stake'
                data={mintedNftData}
                actionVariant='warning'
                action={() => void 1}
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
