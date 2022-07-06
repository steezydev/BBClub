// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BeanzDeployer is ERC721A, Ownable, ReentrancyGuard {
    using Strings for uint256;

    bytes32 public merkleRoot;
    mapping(address => bool) public whitelistClaimed;

    string public uriPrefix = "";
    string public uriSuffix = ".json";

    uint256 public cost;
    uint256 public maxSupply;
    uint256 public maxMintAmountPerTx;

    uint256 public maxFree;
    uint256 public maxFreeMintAmountPerTx;
    uint256 public maxPerWallet;
    uint256 public maxFreePerWallet;
    uint256 public whitelistReserved;

    bool public paused = true;
    bool public whitelistMintEnabled = false;

    mapping(address => uint256) public mintedWallets;

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _cost,
        uint256 _maxSupply,
        uint256 _maxMintAmountPerTx,
        uint256 _maxFree,
        uint256 _whitelistReserved,
        uint256 _maxFreeMintAmountPerTx,
        uint256 _maxPerWallet,
        uint256 _maxFreePerWallet,
        string memory _metadataUri
    ) ERC721A(_tokenName, _tokenSymbol) {
        setCost(_cost);
        maxSupply = _maxSupply;
        setMaxMintAmountPerTx(_maxMintAmountPerTx);
        setUriPrefix(_metadataUri);
        setMaxFreeMintAmountPerTx(_maxFreeMintAmountPerTx);
        setMaxPerWallet(_maxPerWallet);
        setMaxFreePerWallet(_maxFreePerWallet);
        setMaxFree(_maxFree);
        setWhitelistReserved(_whitelistReserved);
    }

    modifier mintCompliance(uint256 _mintAmount) {
        bool isFree = ((totalSupply() + _mintAmount < maxFree + 1) &&
            (mintedWallets[_msgSender()] + _mintAmount <= maxFreePerWallet)) && !whitelistMintEnabled;

        if (isFree) {
            require(
                _mintAmount <= maxFreeMintAmountPerTx,
                "Invalid free mint amount!"
            );
            require(
                mintedWallets[_msgSender()] + _mintAmount <= maxFreePerWallet,
                "Max free amount per wallet exceeded!"
            );
        } else {
            require(
                _mintAmount > 0 && _mintAmount <= maxMintAmountPerTx,
                "Invalid mint amount!"
            );
            require(
                mintedWallets[_msgSender()] + _mintAmount <= maxPerWallet,
                "Max amount per wallet exceeded!"
            );
        }

        require(
            totalSupply() + _mintAmount <= maxSupply,
            "Max supply exceeded!"
        );
        _;
    }

    modifier mintPriceCompliance(uint256 _mintAmount) {
        bool isFree = ((totalSupply() + _mintAmount < maxFree + 1) &&
            (mintedWallets[_msgSender()] + _mintAmount <= maxFreePerWallet)) && !whitelistMintEnabled;

        uint256 price = cost;

        if (isFree) {
            price = 0;
        }

        require(msg.value >= price * _mintAmount, "Insufficient funds!");
        _;
    }

    function whitelistMint(uint256 _mintAmount, bytes32[] calldata _merkleProof)
        public
        payable
        mintCompliance(_mintAmount)
        mintPriceCompliance(_mintAmount)
    {
        // Verify whitelist requirements
        require(whitelistMintEnabled, "The whitelist sale is not enabled!");
        require(!whitelistClaimed[_msgSender()], "Address already claimed!");
        bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Invalid proof!"
        );

        whitelistClaimed[_msgSender()] = true;
        _safeMint(_msgSender(), _mintAmount);
    }

    function mint(uint256 _mintAmount)
        public
        payable
        mintCompliance(_mintAmount)
        mintPriceCompliance(_mintAmount)
    {
        require(!paused, "The contract is paused!");

        mintedWallets[msg.sender] = mintedWallets[msg.sender] + _mintAmount;

        _safeMint(_msgSender(), _mintAmount);
    }

    function mintForAddress(uint256 _mintAmount, address _receiver)
        public
        mintCompliance(_mintAmount)
        onlyOwner
    {
        _safeMint(_receiver, _mintAmount);
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
        uint256 currentTokenId = _startTokenId();
        uint256 ownedTokenIndex = 0;
        address latestOwnerAddress;

        while (
            ownedTokenIndex < ownerTokenCount && currentTokenId < _currentIndex
        ) {
            TokenOwnership memory ownership = _ownerships[currentTokenId];

            if (!ownership.burned) {
                if (ownership.addr != address(0)) {
                    latestOwnerAddress = ownership.addr;
                }

                if (latestOwnerAddress == _owner) {
                    ownedTokenIds[ownedTokenIndex] = currentTokenId;

                    ownedTokenIndex++;
                }
            }

            currentTokenId++;
        }

        return ownedTokenIds;
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        _tokenId.toString(),
                        uriSuffix
                    )
                )
                : "";
    }

    function setCost(uint256 _cost) public onlyOwner {
        cost = _cost;
    }

    function setMaxFree(uint256 _maxFree) public onlyOwner {
        maxFree = _maxFree;
    }

    function setWhitelistReserved(uint256 _whitelistReserved) public onlyOwner {
        whitelistReserved = _whitelistReserved;
    }

    function setMaxFreePerWallet(uint256 _maxFreePerWallet) public onlyOwner {
        maxFreePerWallet = _maxFreePerWallet;
    }

    function setMaxPerWallet(uint256 _maxPerWallet) public onlyOwner {
        maxPerWallet = _maxPerWallet;
    }

    function setMaxFreeMintAmountPerTx(uint256 _maxFreeMintAmountPerTx)
        public
        onlyOwner
    {
        maxFreeMintAmountPerTx = _maxFreeMintAmountPerTx;
    }

    function setMaxMintAmountPerTx(uint256 _maxMintAmountPerTx)
        public
        onlyOwner
    {
        maxMintAmountPerTx = _maxMintAmountPerTx;
    }

    function setUriPrefix(string memory _uriPrefix) public onlyOwner {
        uriPrefix = _uriPrefix;
    }

    function setUriSuffix(string memory _uriSuffix) public onlyOwner {
        uriSuffix = _uriSuffix;
    }

    function setPaused(bool _state) public onlyOwner {
        paused = _state;
    }

    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function setWhitelistMintEnabled(bool _state) public onlyOwner {
        whitelistMintEnabled = _state;
    }

    function withdraw() public onlyOwner nonReentrant {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return uriPrefix;
    }
}