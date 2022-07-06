import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import * as Networks from "../lib/Networks";
import * as Marketplaces from "../lib/Marketplaces";
import whitelistAddresses from "./whitelist.json";

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.ethereumTestnet,
  mainnet: Networks.ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: "BeanzDeployer",
  tokenName: "Based Beanz Club",
  tokenSymbol: "BBC",
  maxSupply: 5555,
  metadataUri: "ipfs://QmeQpBiSF7ELgcgs4pwF6EoGFegcBFSbYxeUbStBCuTHdc/",

  // ? FREE MINT
  whitelistReserved: 1110,
  maxFree: 445,
  maxFreeMintAmountPerTx: 2,
  maxFreePerWallet: 10,

  whitelistSale: {
    price: 0,
    maxMintAmountPerTx: 2,
    maxPerWallet: 2,
  },
  publicSale: {
    price: 0.00001,
    maxMintAmountPerTx: 5,
    maxPerWallet: 50
  },
  contractAddress: "0xacd304447177Ab0604F1A195Ccf8899Ed89EfC80",
  marketplaceIdentifier: "my-nft-token",
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
