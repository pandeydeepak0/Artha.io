import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { useHistory } from 'react-router-dom';
import feedbackContractABI from '../utils/FeedbackFactory.json';
import * as wagmi from "wagmi";
import { useSigner, useProvider,  } from "wagmi";


const AddApps = (props) => {

  const history = useHistory();

  const toApp = (_tokenID, _appName) => {
     history.push(`/brands/${_tokenID-1}/apps/${_appName}`);
  }

  const [ rewardAmount, setRewardAmount ] = useState(0);
  const [ seedAmount, setSeedAmount ] = useState(0);

  const feedbackFactoryContractAddress = "0x4d1f0Ae538769332fb229D5553A0C6487e249171";
  const feedbackFactoryContractABI = feedbackContractABI.abi;

  const _signer = useSigner();
  const _provider = useProvider();

  const provider = _provider;
  const signer = _signer;
  
  const [ allBrands, setAllBrands ] = useState();

  const FeedbackFactoryContract = wagmi.useContract({
    addressOrName: feedbackFactoryContractAddress,
    contractInterface: feedbackFactoryContractABI,
    signerOrProvider: signer.data || provider,
  });


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

       toApp(_tokenID, "Feedback.io")
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
          <h2 className="text-2xl font-semibold leading-tight tracking-wide">Greeter.io</h2>
          <p className="flex-1 text-center text-gray-400">Greet your customers, let them know that you care for them.</p>

              <label htmlFor="brandname" className="text-sm">Reward Amount</label>
              <input onChange={(e) => setRewardAmount(e.target.value)} value={rewardAmount} className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-indigo-600" />
              <label htmlFor="brandname" className="text-sm">Total Price</label>
              <input onChange={(e) => setSeedAmount(e.target.value)} value={seedAmount} className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-indigo-600" />
              
              <button type="button" className="px-8 py-3 font-semibold rounded-md bg-green-400 text-gray-900" onClick={(e) => addFeedbackApp(props.owner, props.tokenID)}>Add</button>
        </div>

        <div className="relative flex flex-col items-center lg:m-10 max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-900 text-gray-100">
          <button className="absolute top-2 right-2">		
          </button>	
          <h2 className="text-2xl font-semibold leading-tight tracking-wide">Review.io</h2>
          <p className="flex-1 text-center text-gray-400">Allow your customers to write verifiable testimonails on blockchain. </p>
          <button type="button" className="px-8 py-3 font-semibold rounded-md bg-green-400 text-gray-900 disabled">Coming Soon</button>
        </div>

        <div className="relative flex flex-col items-center lg:m-10 max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-900 text-gray-100">
          <button className="absolute top-2 right-2">		
          </button>	
          <h2 className="text-2xl font-semibold leading-tight tracking-wide">Sales.io</h2>
          <p className="flex-1 text-center text-gray-400">Create counterfeit-proof sales coupons with blockchain.</p>
          <button type="button" className="px-8 py-3 font-semibold rounded-md bg-green-400 text-gray-900 disabled">Coming Soon</button>
        </div>

      </div>
    </div>


  );

};

export default AddApps;
