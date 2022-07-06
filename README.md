<div align="center">
  <h1>⚜️ DApp + NFT Smart Contract Boilerplate</h1>
  <p>Quick-start solution with ERC721 Solidity contract and minting DApp packed with useful tools for quick development</p>
  <p>Made by <a href="https://github.com/steezy2401">steezy2401</a></p>
</div>
</br>

An all-in-one solution for `ERC721` NFT collections. Build, test and deploy your smart contract, together with a totally integrated DAPP within a simple yet powerful workspace.


## 📜 Solidity contract
[➡️ Go to folder](./smart-contract/)

Bullet-prof automated solidity environment packed with:

- 👷 Hardhat
- ✨ Typescript
- 🔗 Auto-generated typechain — For strong contract typing
- 📉 Extremely high gas efficiency
- 🔍 Automated contract verification — Source code verification through block explorers (e.g. Etherscan)
- 📝 Whitelist — With customizable list size (using a Merkle Tree for verification)
- ⚙️ CLI commands — Automating development process and all the sale steps (whitelist, pre-sale, public sale)
- 🔮 Block explorer support — Full support for contract interaction through block explorers (e.g. Etherscan)

See contract 👉 [📄README](./smart-contract/README.md) 👈 for more.

## 🕹️ Minting DApp
[➡️ Go to folder](./dapp/)

Fully customizable minting DApp packed with:

- ⚡️ Next.js 12
- ⚛️ React 18
- ✨ TypeScript
- 🤝 useDApp — [Framework](https://usedapp-docs.netlify.app/docs) for rapid DApp development
- 🔗 Typechain — For strong contract typing
- 💨 Tailwind CSS 3 
- 🏗️ Radix primitives — Highly flexible unstyled component primitives
- 💎 Pre-built Components with Radix primitives
- 🃏 Jest — Configured for unit testing
- 📈 Absolute Import and Path Alias — Import components using prefixes (`@/`  `~/`  `$/`)
- 📏 ESLint — Find and fix problems in your code, also will **auto sort** your imports
- 💖 Prettier — Format your code consistently
- 🔥 Snippets — A collection of useful snippets
- ♻️ Plop generators — Generate hooks to interact with the contract with one command
- 🗺️ Site Map — Automatically generate sitemap.xml

See Minting DApp 👉 [📄README](./dapp/README.md) 👈 for more.


### 🧰 Services

🔸 Etherscan free API key _(optional: used for the automated contract verificiation, as well as retrieving the current values for gas cost estimation)_

🔸 Infura free basic plan or higher _(optional: used by the CLI commands in order to perform operations on real blockchains, you can skip this if you deploy and manage your contract manually)_

🔸 Coin Market Cap free API key _(optional: used for retrieving the current token price for gas cost estimation in USD)_

## ⚙️ Workflow

>⚠️ Make sure to follow the steps of **both** contract and DApp modules as they strongly rely on each-other

1. Setup the contract (see [Contract 📄README](./smart-contract/README.md))
2. Compile the contract and deploy to the blockchain
3. Setup your DApp (see [DApp 📄README](./dapp/README.md))
4. Build your DApp with pre-build components and hook templates or customize it on your own
5. Deploy and mint! 🚀

### Credits
*Huge shout-out to [Hashlips](https://github.com/hashlips-lab/nft-erc721-collection) for providing the boilerplate template*