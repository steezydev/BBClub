import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import * as Networks from "../lib/Networks";
import * as Marketplaces from "../lib/Marketplaces";
import whitelistAddresses from "./whitelist.json";

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.ethereumTestnetRinkby,
  mainnet: Networks.ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: "BeanzStaker",
  NftContractAddress: "0xacd304447177Ab0604F1A195Ccf8899Ed89EfC80",
  TokenContractAddress: "0x43902fa4919658F2806fDaAe89bb11Bd4581645B",
  contractAddress: "0xBa00602f6b8ee3FC57D70b93e82Ff65d32140B35",
  marketplaceIdentifier: "my-nft-token",
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
