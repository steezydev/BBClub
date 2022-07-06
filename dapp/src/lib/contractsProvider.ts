//!!! WARNING !!!
// Please DO NOT edit the file MANUALLY!

// Use yarn `yarn rename-contract` (in your smart-contract folder) to rename existing contracts
// Use yarn `yarn gen-contract` to create new contract instances

import { Contract } from '@ethersproject/contracts';
import { utils } from 'ethers';

import {
  // ABI IMPORT
  BeanzDeployer,
} from '$/abi';
import contractAddresses from '$/addresses';
import {
  // TYPECHAIN IMPORT
  BeanzDeployer as TBeanzDeployer,
} from '$/typechain';

export const BeanzDeployerContract = new Contract(
  contractAddresses.BeanzDeployer,
  new utils.Interface(BeanzDeployer)
) as TBeanzDeployer;
