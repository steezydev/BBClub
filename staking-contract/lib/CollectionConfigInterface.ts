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

  NftContractAddress: string;
  TokenContractAddress: string;
  rewPerHour: string;

  contractName: string;
  contractAddress: string | null;
  marketplaceIdentifier: string;
  marketplaceConfig: MarketplaceConfigInterface;
  whitelistAddresses: string[];
}
