export default [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "destAddr",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ERC20Withdrawal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "destAddr",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenAddr",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "ERC721Withdrawal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "destAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "EthWithdrawal",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "arbOSVersion",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getTransactionCount",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "destAddr",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "calldataForL1",
        "type": "bytes"
      }
    ],
    "name": "sendTxToL1",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "dest",
        "type": "address"
      }
    ],
    "name": "withdrawEth",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
