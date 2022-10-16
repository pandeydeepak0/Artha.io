const { utils } = require("ethers");
const { ethers } = require("hardhat")
const { BigNumber } = require("ethers")


const main = async() => {
   const [owner, randomAddr] = await ethers.getSigners();
   console.log("The smart contract is deployed by %s", owner.address);

   const FeedbackFactoryContract = await ethers.getContractFactory("FeedbackFactory");
   const FeedbackFactory = await FeedbackFactoryContract.deploy();

   await FeedbackFactory.deployed();

   console.log("The smart contract is deployed on %s", FeedbackFactory.address);

   const seedAmount = 0.01;
   const rewardAmount = 0.005;
   
   const tx = await FeedbackFactory.createFeedbackApp(owner.address, 0, utils.parseUnits(rewardAmount.toString()));
   
   await tx.wait();
   
   const FeedbackAddress = await FeedbackFactory.getContractAddress(0);
   console.log("The address for feedback app is", await FeedbackFactory.getContractAddress(0));

   const signer = await ethers.getSigner();
   const FeedbackABI = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_rewardAmount",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "comment",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "rating",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "fromAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "reward",
            "type": "uint256"
          }
        ],
        "name": "feedbackAdded",
        "type": "event"
      },
      {
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_comment",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_rating",
            "type": "uint256"
          }
        ],
        "name": "addFeedback",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "allFeedbacks",
        "outputs": [
          {
            "internalType": "string",
            "name": "comment",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "rating",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "fromAddress",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_seedAmount",
            "type": "uint256"
          }
        ],
        "name": "fundContract",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getFeedback",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "comment",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "rating",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
              }
            ],
            "internalType": "struct Feedbacks.Feedback[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ];

   const FeedbackContract = new ethers.Contract(FeedbackAddress, FeedbackABI, signer);

   console.log("Initial Funding");
   const txn3 = await FeedbackContract.fundContract(utils.parseUnits(seedAmount.toString()), {
      value: utils.parseUnits(seedAmount.toString()),
   });
   await txn3.wait();

   console.log("Review");
   const txn4 = await FeedbackContract.addFeedback("This is a good app", 5);
   await txn4.wait();

   console.log("Test Run successful.");

};

const runMain = async() => {
   try {
      await main();
      process.exit(0);
   } catch (error) {
      console.log(error);
      process.exit(1);
   } 
};

runMain();