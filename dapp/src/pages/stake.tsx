import { useEthers } from '@usedapp/core';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { getNftsData } from '@/lib/utils/nftData';
import useWalletOfOwner from '@/hooks/BeanzDeployer/useWalletOfOwner';
import useGetStakedTokens from '@/hooks/BeanzStaker/useGetStakedTokens';
import useUserStakeInfo from '@/hooks/BeanzStaker/useUserStakeInfo';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Stake from '@/components/Stake/Stake';

import { TNftData } from '@/types/nft.types';

export default function StakePage() {
  const { account } = useEthers();
  const [mintedTokens] = useWalletOfOwner(account);
  const [stakedTokens] = useGetStakedTokens(account);
  const [stakeInfo] = useUserStakeInfo(account);

  const [stakedTokensData, setStakedTokensData] = useState<TNftData[]>();
  const [mintedTokensData, setMintedTokensData] = useState<TNftData[]>();

  useEffect(() => {
    if (mintedTokens != undefined) {
      getNftsData(mintedTokens).then((data) => {
        setMintedTokensData(data);
      });
    }
  }, [mintedTokens]);

  useEffect(() => {
    if (stakedTokens != undefined) {
      getNftsData(stakedTokens).then((data) => {
        setStakedTokensData(data);
      });
    }
  }, [stakedTokens]);

  return (
    <Layout>
      <Seo templateTitle='Stake' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <div className='mb-16 flex justify-around text-xl'>
              <div className='flex flex-col items-center justify-center'>
                <span className='text-3xl'>{stakeInfo.number ?? '-'}</span>
                <span className='font-secondary'>beanz staked</span>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <span className='text-3xl'>{stakeInfo.reward ?? '-'}</span>
                <span className='font-secondary'>accumulated $BBC</span>
              </div>
            </div>
            <div className='mb-24'>
              <Stake
                title='Unstake'
                description='Select which Beanz to unstake'
                actionName='Unstake'
                data={stakedTokensData}
                action={() => void 1}
              />
            </div>
            {mintedTokensData ? (
              <div>
                <Stake
                  title='Stake'
                  description='Select which Beanz to stake'
                  actionName='Stake'
                  data={mintedTokensData}
                  actionVariant='warning'
                  action={() => void 1}
                />
              </div>
            ) : (
              <div>You don`t have any Beanz in your wallet :(</div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
