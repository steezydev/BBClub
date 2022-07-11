//!!! WARNING !!!
// Please DO NOT edit the file MANUALLY!

// Use yarn `yarn rename-contract` (in your smart-contract folder) to rename existing contracts
// Use yarn `yarn gen-contract` to create new contract instances

import { Contract } from '@ethersproject/contracts';
import { utils } from 'ethers';

import {
  BeanzDeployer,
  BeanzStaker,
  // ABI IMPORT
  BeanzToken,
} from '$/abi';
import contractAddresses from '$/addresses';
import {
  BeanzDeployer as TBeanzDeployer,
  BeanzStaker as TBeanzStaker,
  // TYPECHAIN IMPORT
  BeanzToken as TBeanzToken,
} from '$/typechain';

export const BeanzDeployerContract = new Contract(
  contractAddresses.BeanzDeployer,
  new utils.Interface(BeanzDeployer)
) as TBeanzDeployer;

export const BeanzStakerContract = new Contract(
  contractAddresses.BeanzStaker,
  new utils.Interface(BeanzStaker)
) as TBeanzStaker;

export const BeanzTokenContract = new Contract(
  contractAddresses.BeanzToken,
  new utils.Interface(BeanzToken)
) as TBeanzToken;
