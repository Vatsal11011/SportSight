export const MarketContract = {
    address: '0xefFa39e97ce0FC4cF32779765b1D4866A79dffaA',
    abi: [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ReentrancyGuardReentrantCall",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "marketId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Claimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "marketId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "question",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "optionA",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "optionB",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			}
		],
		"name": "MarketCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "marketId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum SportSight.MarketOutcome",
				"name": "outcome",
				"type": "uint8"
			}
		],
		"name": "MarketResolved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "marketId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isOptionA",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "SharesPurchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_marketId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isOptionA",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "buyShares",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_marketId",
				"type": "uint256"
			}
		],
		"name": "claimWinnings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_question",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_optionA",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_optionB",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			}
		],
		"name": "createMarket",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_marketId",
				"type": "uint256"
			}
		],
		"name": "getMarketInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "question",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "optionA",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "optionB",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"internalType": "enum SportSight.MarketOutcome",
				"name": "outcome",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "optionAshares",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "optionBshares",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "resolved",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_marketId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getSharesBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "optionAshares",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "optionBshares",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "marketCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_marketId",
				"type": "uint256"
			},
			{
				"internalType": "enum SportSight.MarketOutcome",
				"name": "_outcome",
				"type": "uint8"
			}
		],
		"name": "resolveMarket",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
} as const