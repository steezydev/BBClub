// SPDX-License-Identifier: MIT
// Creator: andreitoma8
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BeanzStaker is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Interfaces for ERC20 and ERC721
    IERC20 public immutable rewardsToken;
    IERC721 public immutable nftCollection;

    // Staker info
    struct Staker {
        // Staked assets
        uint256[] assets;
        // Mapping of assets indexes
        mapping(uint256 => uint256) indexOfAsset;
        // Amount of ERC721 Tokens staked
        uint256 amountStaked;
        // Last time of details update for this User
        uint256 timeOfLastUpdate;
        // Calculated, but unclaimed rewards for the User. The rewards are
        // calculated each time the user writes to the Smart Contract
        uint256 unclaimedRewards;
    }

    // Rewards per hour per token deposited in wei.
    // Rewards are cumulated once every hour.
    uint256 private rewardsPerHour;

    // Rewards per token burn deposited in wei.
    uint256 private rewardsPerBurn;

    // Max amount of tokens per burn
    uint256 public maxBurnTokens;

    // Mapping of User Address to Staker info
    mapping(address => Staker) public stakers;
    // Mapping of Token Id to staker. Made for the SC to remeber
    // who to send back the ERC721 Token to.
    mapping(uint256 => address) public stakerAddress;

    //Null address for burned tokens
    address public immutable nullAddr =
        0x000000000000000000000000000000000000dEaD;

    bool public stakePaused = true;
    bool public burnPaused = true;

    // Constructor function
    constructor(
        IERC721 _nftCollection,
        IERC20 _rewardsToken,
        uint256 _rewardsPerHour,
        uint256 _rewardsPerBurn,
        uint256 _maxBurnTokens
    ) {
        nftCollection = _nftCollection;
        rewardsToken = _rewardsToken;
        rewardsPerHour = _rewardsPerHour;
        rewardsPerBurn = _rewardsPerBurn;
        maxBurnTokens = _maxBurnTokens;
    }

    // If address already has ERC721 Token/s staked, calculate the rewards.
    // For every new Token Id in param transferFrom user to this Smart Contract,
    // increment the amountStaked and map msg.sender to the Token Id of the staked
    // Token to later send back on withdrawal. Finally give timeOfLastUpdate the
    // value of now.
    function stake(uint256[] calldata _tokenIds) external nonReentrant {
        require(!stakePaused, "Staking is paused");
        if (stakers[msg.sender].amountStaked > 0) {
            uint256 rewards = calculateRewards(msg.sender);
            stakers[msg.sender].unclaimedRewards += rewards;
        }
        uint256 len = _tokenIds.length;
        for (uint256 i; i < len; ++i) {
            require(
                nftCollection.ownerOf(_tokenIds[i]) == msg.sender,
                "Can't stake tokens you don't own!"
            );
            nftCollection.transferFrom(msg.sender, address(this), _tokenIds[i]);
            //stakers[msg.sender].tokenIds.push(_tokenIds[i]);
            stakers[msg.sender].assets.push(_tokenIds[i]);
            stakers[msg.sender].indexOfAsset[_tokenIds[i]] =
                stakers[msg.sender].assets.length -
                1;

            stakerAddress[_tokenIds[i]] = msg.sender;
        }
        stakers[msg.sender].amountStaked += len;
        stakers[msg.sender].timeOfLastUpdate = block.timestamp;
    }

    // User can burn from 1 to <maxBurnTokens> tokens
    // The number of tokens will increase the chance of getting the reward
    function burn(uint256[] calldata _tokenIds) external nonReentrant {
        require(!burnPaused, "Burn is paused");
        uint256 len = _tokenIds.length;
        require(len > 0 && len < maxBurnTokens - 1, "Invalid number of tokens");

        for (uint256 i; i < len; ++i) {
            nftCollection.transferFrom(msg.sender, nullAddr, _tokenIds[i]);
        }

        uint256 random = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, msg.sender)
            )
        ) % 100;

        bool success = len == maxBurnTokens
            ? true
            : random < ((len * 100) / maxBurnTokens);
        if (success) {
            rewardsToken.safeTransfer(msg.sender, rewardsPerBurn);
        }
    }

    // Returns user's staked token Ids
    function getStakedTokens(address _user)
        public
        view
        returns (uint256[] memory tokenIds)
    {
        return stakers[_user].assets;
    }

    // Check if user has any ERC721 Tokens Staked and if he tried to withdraw,
    // calculate the rewards and store them in the unclaimedRewards and for each
    // ERC721 Token in param: check if msg.sender is the original staker, decrement
    // the amountStaked of the user and transfer the ERC721 token back to them
    function withdraw(uint256[] calldata _tokenIds) external nonReentrant {
        require(
            stakers[msg.sender].amountStaked > 0,
            "You have no tokens staked"
        );
        uint256 rewards = calculateRewards(msg.sender);
        stakers[msg.sender].unclaimedRewards += rewards;
        uint256 len = _tokenIds.length;
        for (uint256 i; i < len; ++i) {
            require(stakerAddress[_tokenIds[i]] == msg.sender);

            removeAssetFromArray(_tokenIds[i], msg.sender);

            stakerAddress[_tokenIds[i]] = address(0);
            nftCollection.transferFrom(address(this), msg.sender, _tokenIds[i]);
        }
        stakers[msg.sender].amountStaked -= len;
        stakers[msg.sender].timeOfLastUpdate = block.timestamp;
    }

    // Calculate rewards for the msg.sender, check if there are any rewards
    // claim, set unclaimedRewards to 0 and transfer the ERC20 Reward token
    // to the user.
    function claimRewards() external {
        uint256 rewards = calculateRewards(msg.sender) +
            stakers[msg.sender].unclaimedRewards;
        require(rewards > 0, "You have no rewards to claim");
        stakers[msg.sender].timeOfLastUpdate = block.timestamp;
        stakers[msg.sender].unclaimedRewards = 0;
        rewardsToken.safeTransfer(msg.sender, rewards);
    }

    /////////////
    // Setters //
    /////////////

    //Set the rewardsPerHour variable
    function setMaxBurnTokens(uint256 _maxBurnTokens) public onlyOwner {
        maxBurnTokens = _maxBurnTokens;
    }

    //Set the rewardsPerHour variable
    function setRewardsPerHour(uint256 _newValue) public onlyOwner {
        rewardsPerHour = _newValue;
    }

    //Set the stakedPaused variable
    function setStakedPaused(bool _state) public onlyOwner {
        stakePaused = _state;
    }

    //Set the burnPaused variable
    function setBurnPaused(bool _state) public onlyOwner {
        burnPaused = _state;
    }

    //////////
    // View //
    //////////

    function userStakeInfo(address _user)
        public
        view
        returns (uint256 _tokensStaked, uint256 _availableRewards)
    {
        return (stakers[_user].amountStaked, availableRewards(_user));
    }

    function availableRewards(address _user) internal view returns (uint256) {
        uint256 _rewards = stakers[_user].unclaimedRewards +
            calculateRewards(_user);
        return _rewards;
    }

    /////////////
    // Internal//
    /////////////

    // Calculate rewards for param _staker by calculating the time passed
    // since last update in hours and mulitplying it to ERC721 Tokens Staked
    // and rewardsPerHour.
    function calculateRewards(address _staker)
        internal
        view
        returns (uint256 _rewards)
    {
        return (((
            ((block.timestamp - stakers[_staker].timeOfLastUpdate) *
                stakers[_staker].amountStaked)
        ) * rewardsPerHour) / 3600);
    }

    // Remove the withdrawn asset from the array of assets
    function removeAssetFromArray(uint256 _assetToDelete, address _staker)
        internal
    {
        uint256 index = stakers[_staker].indexOfAsset[_assetToDelete];
        uint256 assetsLength = stakers[_staker].assets.length;

        if (assetsLength > 1) {
            stakers[_staker].assets[index] = stakers[_staker].assets[
                assetsLength - 1
            ];
        }
        stakers[_staker].assets.pop(); // Implicitly recovers gas from last element storage
    }
}
