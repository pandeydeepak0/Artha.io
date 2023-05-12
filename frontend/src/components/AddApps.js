import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { useHistory } from 'react-router-dom';
import feedbackContractABI from '../utils/FeedbackFactory.json';
import * as wagmi from "wagmi";
import { useSigner, useProvider,  } from "wagmi";
import { useAccount } from "wagmi";

const AddApps = ({owner, tokenID}) => {

  console.log(owner);
  const history = useHistory();

  const toApp = (_tokenID, _address, _appName) => {
     history.push(`/brands/${_tokenID-1}/${_address}/apps/${_appName}`);
  }

  const [ rewardAmount, setRewardAmount ] = useState(0);
  const [ seedAmount, setSeedAmount ] = useState(0);

  const feedbackFactoryContractAddress = "0x4d1f0Ae538769332fb229D5553A0C6487e249171";
  const feedbackFactoryContractABI = feedbackContractABI.abi;

  const { address, isConnected } = useAccount();

  const _signer = useSigner();
  const _provider = useProvider();

  const provider = _provider;
  const signer = _signer;
  
  const [ allBrands, setAllBrands ] = useState();
  const [ Rating, setRating  ] = useState(0);
  const [Comment, setComment ] = useState("");
  const [ FeedbackAppAddress, setFeedbackAppAddress ] = useState(undefined);

  const FeedbackFactoryContract = wagmi.useContract({
    addressOrName: feedbackFactoryContractAddress,
    contractInterface: feedbackFactoryContractABI,
    signerOrProvider: signer.data || provider,
  });

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


   const addFeedbackApp = async (_owner, _tokenID) => {
    console.log("Adding Feedback.io App, this may take some time.");
       //run the contract factory to Adding Apps
       //deploy the greeter smart contract
       //get the contract address and abi
    try {
       const { ethereum } = window;
       if (ethereum) {
       
       const feedbackContractAddress = await FeedbackFactoryContract.createFeedbackApp(_owner, _tokenID, ethers.utils.parseUnits(rewardAmount.toString())); 
       
       await feedbackContractAddress.wait();

       console.log("app created at", feedbackContractAddress);

       const FeedbackAppAddress = await FeedbackFactoryContract.getContractAddress(_tokenID);
       console.log("You app is successfully created at %s", FeedbackAppAddress);

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
       
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner();
       const FeedbackContract = new ethers.Contract(FeedbackAppAddress, FeedbackABI, signer);

       console.log("Initial Funding");
       const fundingTxn = await FeedbackContract.fundContract(ethers.utils.parseUnits(seedAmount.toString()), {
            value: ethers.utils.parseUnits(seedAmount.toString()),
        });
       
        await fundingTxn.wait();

        setFeedbackAppAddress(FeedbackAppAddress);

     
       //toApp(_tokenID, FeedbackAppAddress, "Feedback.io");

      }
    } catch(error) {     
       console.log(error);
    }
   }


    const submitFeedback = async (comment, rating) => {
      console.log("Adding fedback");
         //run the contract factory to Adding Apps
         //deploy the greeter smart contract
         //get the contract address and abi
      try {
         const { ethereum } = window;
         if (ethereum) {
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner();
         const FeedbackContract = new ethers.Contract(FeedbackAppAddress, FeedbackABI, signer);
  
         console.log("Add comment");
         const feedbackTxn = await FeedbackContract.addFeedback("Feedback", 5);
         
         await feedbackTxn.wait();

         console.log("FeedbackAdded, and matic transferred")
         console.log("See transaction", feedbackTxn);

        }
      } catch(error) {     
         console.log(error);
      }  
  }

  return (
    //setup route to App on "Open App Button click"

    <div className="flex flex-col justify-center p-3 mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="relative flex flex-col items-center lg:m-10 max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-900 text-gray-100">
          <button className="absolute top-2 right-2">		
          </button>	
          <h2 className="text-2xl font-semibold leading-tight tracking-wide">Feedback.io</h2>
          <p className="flex-1 text-center text-gray-400">Get feedback from your users and award them in crypto.</p>
          {address.toLowerCase() === owner.toString().toLowerCase() && (
            <>
              <label className="text-sm">Reward Amount</label>
              <input onChange={(e) => setRewardAmount(e.target.value)} value={rewardAmount} className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-indigo-600" />
              <label className="text-sm">Total Price</label>
              <input onChange={(e) => setSeedAmount(e.target.value)} value={seedAmount} className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-indigo-600" />
              
              <button type="button" className="px-8 py-3 font-semibold rounded-md bg-green-400 text-gray-900" onClick={(e) => addFeedbackApp(owner, tokenID)}>Add</button>
            </>
          )}

          {address.toLowerCase() !== owner.toString().toLowerCase() && (
            <>
            <label className="text-sm">Comment</label>
            <input onChange={(e) => setComment(e.target.value)} value={Comment} className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-indigo-600" />
            <label className="text-sm">Rating (1-5)</label>
            <input onChange={(e) => setRating(e.target.value)} value={Rating} className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-indigo-600" />
            
            <button type="button" className="px-8 py-3 font-semibold rounded-md bg-green-400 text-gray-900" onClick={(e) => submitFeedback(Comment, Rating)}>Add</button>
          </>
          )}

        </div>
      </div>
    </div>


  );

};

export default AddApps;
