import { useEthers } from '@usedapp/core';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { getNftsData } from '@/lib/utils/nftData';
import useIsApprovedForAll from '@/hooks/BeanzDeployer/useIsApprovedForAll';
import useWalletOfOwner from '@/hooks/BeanzDeployer/useWalletOfOwner';
import useGetStakedTokens from '@/hooks/BeanzStaker/useGetStakedTokens';
import useStake from '@/hooks/BeanzStaker/useStake';
import useStakePaused from '@/hooks/BeanzStaker/useStakePaused';
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
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [isApprovedForAll] = useIsApprovedForAll(account);
  const [stakePaused] = useStakePaused();

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

  useEffect(() => {
    if (!isApprovedForAll && isApprovedForAll != undefined)
      setErrorMessage('Beanz need approval...');
    if (stakePaused ?? false) setErrorMessage('The staking is paused...');
  }, [stakePaused, isApprovedForAll]);

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
                  (stakeState.status != 'None' &&
                    stakeState.status != 'Success' &&
                    stakeState.status != 'Exception') ||
                  (stakePaused ?? false)
                }
                emptyMessage='You don`t have any Beanz in your wallet :('
                errorMessage={errorMessage}
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
