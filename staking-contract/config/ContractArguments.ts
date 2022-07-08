import { utils } from "ethers";
import CollectionConfig from "./CollectionConfig";

// Update the following array if you change the constructor arguments...
const ContractArguments = [
  CollectionConfig.NftContractAddress,
  CollectionConfig.TokenContractAddress
] as const;

export default ContractArguments;
