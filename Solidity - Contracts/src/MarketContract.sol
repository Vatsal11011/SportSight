// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";

contract Token is Ownable, ReentrancyGuard {
    enum MarketOutcome {
        UNRESOLVED,
        OPTION_A,
        OPTION_B
    }

    struct Market {
        string question;
        uint256 endTime;
        MarketOutcome outcome;
        string optionA;
        string optionB;
        uint256 optionAshares;
        uint256 optionBshares;
        bool resolved;
        mapping(address => uint256) optionAsharesBalance;
        mapping(address => uint256) optionBsharesBalance;
        mapping(address => bool) claimed;
    }

    IERC20 public token;
    uint256 public marketCount;
    mapping(uint256 => Market) private markets;

    event MarketCreated(
        uint256 indexed marketId,
        string question,
        string optionA,
        string optionB,
        uint256 endTime
    );

    event SharesPurchased(
        uint256 indexed marketId,
        address indexed buyer,
        bool isOptionA,
        uint256 amount
    );

    event MarketResolved(uint256 indexed marketId, MarketOutcome outcome);

    event Claimed(
        uint256 indexed marketId,
        address indexed user,
        uint256 amount
    );

    constructor(address _token) {
        token = IERC20(_token);
        _transferOwnership(msg.sender);
    }

    function createMarket(
        string memory _question,
        string memory _optionA,
        string memory _optionB,
        uint256 _duration
    ) external onlyOwner returns (uint256) {
        require(_duration > 0, "Duration must be positive");
        require(
            bytes(_optionA).length > 0 && bytes(_optionB).length > 0,
            "Options cannot be empty"
        );

        uint256 marketId = marketCount++;
        Market storage market = markets[marketId];

        market.question = _question;
        market.optionA = _optionA;
        market.optionB = _optionB;
        market.endTime = block.timestamp + _duration;
        market.outcome = MarketOutcome.UNRESOLVED;

        emit MarketCreated(
            marketId,
            _question,
            _optionA,
            _optionB,
            market.endTime
        );

        return marketId;
    }

    function buyShares(
        uint256 _marketId,
        bool isOptionA,
        uint256 _amount
    ) external {
        Market storage market = markets[_marketId];

        require(block.timestamp < market.endTime, "Market trading ended");
        require(!market.resolved, "Market already resolved");
        require(_amount > 0, "Amount must be > 0");
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );

        if (isOptionA) {
            market.optionAsharesBalance[msg.sender] += _amount;
            market.optionAshares += _amount;
        } else {
            market.optionBsharesBalance[msg.sender] += _amount;
            market.optionBshares += _amount;
        }

        emit SharesPurchased(_marketId, msg.sender, isOptionA, _amount);
    }

    function resolveMarket(
        uint256 _marketId,
        MarketOutcome _outcome
    ) external onlyOwner {
        Market storage market = markets[_marketId];

        require(block.timestamp >= market.endTime, "Market not ended");
        require(!market.resolved, "Market already resolved");
        require(_outcome != MarketOutcome.UNRESOLVED, "Invalid outcome");

        market.outcome = _outcome;
        market.resolved = true;

        emit MarketResolved(_marketId, _outcome);
    }

    function claimWinnings(uint256 _marketId) external nonReentrant {
        Market storage market = markets[_marketId];
        require(market.resolved, "Market not resolved yet");
        require(!market.claimed[msg.sender], "Already claimed");

        uint256 userShares;
        uint256 winningShares;
        uint256 losingShares;

        if (market.outcome == MarketOutcome.OPTION_A) {
            userShares = market.optionAsharesBalance[msg.sender];
            winningShares = market.optionAshares;
            losingShares = market.optionBshares;
            market.optionAsharesBalance[msg.sender] = 0;
        } else if (market.outcome == MarketOutcome.OPTION_B) {
            userShares = market.optionBsharesBalance[msg.sender];
            winningShares = market.optionBshares;
            losingShares = market.optionAshares;
            market.optionBsharesBalance[msg.sender] = 0;
        } else {
            revert("Invalid market outcome");
        }

        require(userShares > 0, "No winnings to claim");

        uint256 rewardRatio = (losingShares * 1e18) / winningShares;
        uint256 winnings = userShares + (userShares * rewardRatio) / 1e18;

        market.claimed[msg.sender] = true;

        require(token.transfer(msg.sender, winnings), "Token transfer failed");

        emit Claimed(_marketId, msg.sender, winnings);
    }

    function getMarketInfo(
        uint256 _marketId
    )
        external
        view
        returns (
            string memory question,
            string memory optionA,
            string memory optionB,
            uint256 endTime,
            MarketOutcome outcome,
            uint256 optionAshares,
            uint256 optionBshares,
            bool resolved
        )
    {
        Market storage market = markets[_marketId];
        return (
            market.question,
            market.optionA,
            market.optionB,
            market.endTime,
            market.outcome,
            market.optionAshares,
            market.optionBshares,
            market.resolved
        );
    }

    function getSharesBalance(
        uint256 _marketId,
        address _user
    ) external view returns (uint256 optionAshares, uint256 optionBshares) {
        Market storage market = markets[_marketId];
        return (
            market.optionAsharesBalance[_user],
            market.optionBsharesBalance[_user]
        );
    }
}
