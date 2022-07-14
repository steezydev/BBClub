import { useEthers } from '@usedapp/core';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { getNftsData } from '@/lib/utils/nftData';
import useIsApprovedForAll from '@/hooks/BeanzDeployer/useIsApprovedForAll';
import useWalletOfOwner from '@/hooks/BeanzDeployer/useWalletOfOwner';
import useGetStakedTokens from '@/hooks/BeanzStaker/useGetStakedTokens';
import useStake from '@/hooks/BeanzStaker/useStake';
import useWithdraw from '@/hooks/BeanzStaker/useWithdraw';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Stake from '@/components/Stake/Stake';
import StakeInfo from '@/components/StakeInfo/StakeInfo';

import { TNftData } from '@/types/nft.types';

export default function StakePage() {
  const { account } = useEthers();
  const [mintedTokens] = useWalletOfOwner(account);
  const [stakedTokens] = useGetStakedTokens(account);

  const [stakedTokensData, setStakedTokensData] = useState<TNftData[]>();
  const [mintedTokensData, setMintedTokensData] = useState<TNftData[]>();

  const [isApprovedForAll] = useIsApprovedForAll(account);

  const [stake, stakeState] = useStake();
  const [withdraw, withdrawState] = useWithdraw();

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

  const handleStake = async (ids: number[]) => {
    if (ids.length <= 0) return undefined;
    // call to stake()
    stake(ids);
  };

  const handleUnstake = (ids: number[]) => {
    if (ids.length <= 0) return undefined;
    // call to withdraw()
    withdraw(ids);
  };

  return (
    <Layout>
      <Seo templateTitle='Stake' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <StakeInfo address={account} />
            <div className='mb-24'>
              <Stake
                title='Unstake'
                description='Select which Beanz to unstake'
                actionName='Unstake'
                data={stakedTokensData}
                action={handleUnstake}
                disableAction={
                  withdrawState.status != 'None' &&
                  withdrawState.status != 'Success' &&
                  withdrawState.status != 'Exception'
                }
                emptyMessage='You don`t have any Beanz staked yet :('
              />
            </div>
            <div>
              <Stake
                title='Stake'
                description='Select which Beanz to stake'
                actionName='Stake'
                data={mintedTokensData}
                actionVariant='warning'
                action={handleStake}
                disableAction={
                  stakeState.status != 'None' &&
                  stakeState.status != 'Success' &&
                  stakeState.status != 'Exception'
                }
                emptyMessage='You don`t have any Beanz in your wallet :('
                needsApproval={
                  !isApprovedForAll && isApprovedForAll != undefined
                }
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
