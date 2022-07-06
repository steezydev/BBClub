<div align="center">
  <h1>📜 NFT Solidity Smart Contract</h1>
  <p>Solidity smart contract environment packed with automation scripts and robust development tools</p>
</div>
</br>

Out of the box deploy-ready `ERC721` Solidity NFT smart contract. Provided with tests, deploy script and automation features. Based on [Hashlips NFT ERC721 Collection](https://github.com/hashlips-lab/nft-erc721-collection)

## ✨ Features

Bullet-prof automated solidity environment packed with:

- 👷 Hardhat
- ✨ Typescript
- 🔗 Auto-generated typechain — For strong contract typing
- 📉 Extremely high gas efficiency
- 🔍 Automated contract verification — Source code verification through block explorers (e.g. Etherscan)
- 📝 Whitelist — With customizable list size (using a Merkle Tree for verification)
- ⚙️ CLI commands — Automating development process and all the sale steps (whitelist, pre-sale, public sale)
- 🔮 Block explorer support — Full support for contract interaction through block explorers (e.g. Etherscan)

## ⚙️ Getting started

### 1. Install the dependencies
Using yarn in preferable but not necessary
```bash
yarn install
```

### 2. Setup `.env` file
>⚠️ Manage your `.env` carefully as it will contain your private keys and other sensitive data. Make sure it is added to `.gitignore` and will not be pushed to your public repository

Create a new `.env` file by copying the contents of the `.env.example` file. Populate it with your data (here's a [⤵️ detailed instruction](#🔑-how-to-populate-env))

### 3. ❗Rename your contract (must-read)
Due to the way contract name is treated by the environment and its strong relation with the DApp, the contract **SHOULD NOT** be renamed manually. Use the command instead. *(Remove brackets)*

```bash
yarn rename-contract <new contract name>
```

This will replace all occurrences of the previous contract name to a new one.

### 4. Edit your configs
>⚠️ **Don't change** `contractName` property **manually**. Use `yarn rename-contract <new contract name>` instead.

Edit the config file [`CollectionConfig.ts`](./config/CollectionConfig.ts) in `config` folder.

### 5. Edit the whitelist

You can add a `JSON` array of whitelisted wallet addresses in `./config/whitelist.json` file. These wallets will be able to mint during the whitelist stage. More on how to manage whitelist mint [⤵️ here](#📝-whitelist)

### 6. Compile
After your configuration is done you are ready to compile the contract.

```bash
yarn compile
```

This will create `artifacts` folder with a compiled contract and `typechain` with contract typings.

### 7. Deploy 🚀
Now it's time to deploy your contract. 

It is recommended to deploy your contract to the `testnet` first to play around and test your contract. The only difference of the `testnet` from the `mainnet` is that it doesn't use real ether but test ether which can be obtained for FREE from foucets (ex. [Rinkeby Faucet](https://rinkebyfaucet.com/) by ⚗️ Alchemy)


#### 🥼 Testnet:
```bash
yarn deploy --network testnet
```

#### 👔 Mainnet:
```bash
yarn deploy --network mainnet
```

### 8. Verify the contract
After your contract was deployed to the blockchain it's time to verify its source code.

The contract is deployed to the blockchain in a form of bytecode so the source code can not be viewed by others. To make users trust your smart contract and make it possible to interact with your smart contract through a block explorer (ex. Etherscan) you should provide your deployed contract with the source code and **verify** it. Luckily Etherscan gives us such opportunity. You can use a **CLI command** or do it manually

```bash
yarn verify <contract address> --network <testnet or mainnet> 
```

### 9. Continue with DApp
When your contract is deployed you can start developing your DApp. Before switching to DApp run:

```bash
yarn export-abi
```

This will export your contract's ABI to your DApp folder.

## 🔑 How to populate `.env` 
Create a copy of `.env.example` file in the root of the project, rename it to `.env` and delete all the comments *(starting with `#`)*

### Variables

`COLLECTION_URI_PREFIX` - An `IPFS` url of your collection metadata. 

> ⚠️ This contract supports NFT reveal. So that minters see the spoof image and metadata at first which then will be replaced with the proper images and metadata. This variable represents the **proper** metadata IPFS url *(Hidden metadata url can be changed in a config file)*

If you have no idea what is that make sure to check [🎞️Hashlips video guide](https://www.youtube.com/watch?v=sZz2JriHvR0) on creating an NFT collection

`NETWORK_TESTNET_URL` - API url of your blockchain API provider for `testnet`

> ⚠️ This project has `Rinkeby` as a default `testnet` network 

You can use [⚗️ Alchemy](https://alchemy.com/?r=DU4NjI4ODE2MzQ4N) as your provider. It is completely free at the start and you can pay as your DApp grows. Here's an [📄instruction](https://docs.alchemy.com/alchemy/introduction/getting-started#1.create-an-alchemy-key) on obtaining you API url or you can check a [🎞️video guide](https://www.youtube.com/watch?v=tfggWxfG9o0)

`NETWORK_TESTNET_PRIVATE_KEY` - A private key of your ethereum wallet for `testnet`. Here's an [📄instruction](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) for Metamask wallet.

`NETWORK_MAINNET_URL` - API url of your blockchain API provider for `mainnet`. Follow the same steps as for the `testnet` url

`NETWORK_MAINNET_PRIVATE_KEY` - A private key of your ethereum wallet for `mainnet`. Follow the same steps as for the private key for `testnet`

`GAS_REPORTER_COIN_MARKET_CAP_API_KEY` - [CoinMarketCap API](https://coinmarketcap.com/api/) key for getting current gas price of the contract

`BLOCK_EXPLORER_API_KEY` - [Etherscan API](https://info.etherscan.com/etherscan-developer-api-key/) key for automated contract verification 

## 📝 Whitelist 

You can add a `JSON` array of whitelisted wallet addresses in `./config/whitelist.json` file. These wallets will be able to mint during the whitelist stage.

After you have added addresses to the array you have to generate a `Merkle root` 

```bash
yarn root-hash
```

Copy the root hash and pass it to your deployed contract with `setMerkleRoot` method. You can use Etherscan to communicate with your contract functions.

## 📕 Scripts

Let's take a closer look at the available scripts:

```bash
# Compiles the contract
yarn compile

# Deploys the contract to the chosen network
yarn deploy --network <mainnet / testnet>

# Verifies the contract source code via block explorer
yarn verify <contract address> --network <mainnet / testnet>

# Start whitelist minting stage of the contract
yarn whitelist-open --network <mainnet / testnet>

# Ends whitelist minting stage of the contract
yarn whitelist-close --network <mainnet / testnet>

# Start pre-sale minting stage of the contract
yarn presale-open --network <mainnet / testnet>

# Ends pre-sale minting stage of the contract
yarn presale-close --network <mainnet / testnet>

# Start public minting stage of the contract
yarn public-sale-open --network <mainnet / testnet>

# Ends public minting stage of the contract
yarn public-sale-close --network <mainnet / testnet>

# Reveals the original metadata and image of NFTs
yarn reveal --network <mainnet / testnet>

# Runs contract tests
yarn test
```

## 🛠️ Project structure and customization

### `config`
`CollectionConfig.ts` contains the configuration of the contract. You can add new properties or delete existing ones.

Configs are passed to the contract through `ContractArguments.ts`, so if you add/remove properties in the `CollectionConfig.ts` make sure you pass them to `ContractArguments.ts`

Contract accepts config properties in a `construct` method on compile

### `contract`
>⚠️ **Don't rename** the contract **manually**. Use `yarn rename-contract <new contract name>` instead.

You are free to modify the code of the contract, add new features or remove existing ones.

### `lib`
- `CollectionConfigInterface.ts` - contains a typescript interface of the `CollectionConfig`. Should be modified along with adding/removing properties.

- `Marketplaces.ts` - used to generate a link to OpenSea page of your collection

- `Networks.ts` - contains constant network objects

### `scripts`

Contains scripts to deploy the contract and manage the its state. The scripts use `ethers.js` library to communicate with the contract

### `test`

Contains single test file which uses `ethers.js` and `chai` to test contract functions