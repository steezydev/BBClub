import NetworkConfigInterface from "../lib/NetworkConfigInterface";
import MarketplaceConfigInterface from "../lib/MarketplaceConfigInterface";

interface SaleConfig {
  price: number;
  maxMintAmountPerTx: number;
  maxPerWallet: number
}

export default interface CollectionConfigInterface {
  testnet: NetworkConfigInterface;
  mainnet: NetworkConfigInterface;

  // ? FREE MINT
  whitelistReserved: number;
  maxFree: number;
  maxFreeMintAmountPerTx: number;
  maxFreePerWallet: number;
  metadataUri: string;

  contractName: string;
  tokenName: string;
  tokenSymbol: string;
  maxSupply: number;
  whitelistSale: SaleConfig;
  publicSale: SaleConfig;
  contractAddress: string | null;
  marketplaceIdentifier: string;
  marketplaceConfig: MarketplaceConfigInterface;
  whitelistAddresses: string[];
}
