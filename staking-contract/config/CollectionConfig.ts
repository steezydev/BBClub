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

  NftContractAddress: "0xabEc6a9052efe275FAA2D975ad2326eb8cb299a3",
  TokenContractAddress: "0x899888082D59390ABC7F0749F47ae0791269e061",
  rewPerHour: '10000000000000000',
  rewPerBurn: '1000000000000000000',
  maxBurnTokens: 4,

  contractAddress: "0xAa056fA74F86b0a2eDEC1BA6bb6af5b291B542Fb",
  marketplaceIdentifier: "my-nft-token",
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
