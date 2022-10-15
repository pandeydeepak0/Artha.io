import React, { useState, useEffect } from "react";
import abi from '../utils/GreeterFactory.json';
import { ethers } from 'ethers';
import AppPage from "./AppPage";
import { useHistory } from 'react-router-dom';

const AddApps = (props) => {

  const history = useHistory();

  const toApp = (_tokenID, _appName) => {
     history.push(`/brands/${_tokenID}/apps/${_appName}`);
  }

  
  // Render Methods
  const [ currentAccount, setCurrentAccount ] = useState("");

  //App Support - Greeter.io
  const [ greeterRenderFlag, setGreeterRenderFlag ] = useState(0);
  const [ greeterAddress, setGreeterAddress ] = useState("");

  const contractAddress = "0xEa1dD8b5c94741D81DCE06720645AbaAd65E9e53";
  const contractABI = abi.abi;

  const checkIfWalletIsConnect = async (owner, tokenID) => {
    // we have to check if we have access to window.ethereum

    try {
      const { ethereum } = window;
      if(!ethereum) {
        console.log("Make sure you have MetaMask!");
      } else {
        console.log("We have an ethereum Object", ethereum);
      }

      const accounts = await ethereum.request({method : "eth_accounts"});

      if(accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized Account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try{
      const{ ethereum } = window;

      if(!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const addGreeterApp = async (_owner, _tokenID) => {
      console.log("Adding Greeter.io App, this may take some time.");
         //run the contract factory to Adding Apps
         //deploy the greeter smart contract
         //get the contract address and abi
      try {
         const { ethereum } = window;
         if (ethereum) {
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner();
         const GreeterFactory = new ethers.Contract(contractAddress, contractABI, signer);

         //const greeter = await GreeterFactory.createGreeter(_owner, _tokenID);
         
         let contractID = await GreeterFactory.contractID();
         console.log("contract ID %s deployed", contractID);

         let greeterContract = await GreeterFactory.getContractAddress(contractID - 1);
         console.log("Greeter App is successfully created at", greeterContract);
         
         setGreeterAddress(greeterContract);
         setGreeterRenderFlag(1);
         
         toApp(_tokenID, "Greeter.io")
        }
      } catch(error) {     
         console.log(error);
      }
   }

  useEffect(() => {
    checkIfWalletIsConnect();
  },[]);

  return (
    //setup route to App on "Open App Button click"

    <div className="flex flex-col justify-center p-3 mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="relative flex flex-col items-center lg:m-10 max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-900 text-gray-100">
          <button className="absolute top-2 right-2">		
          </button>	
          <h2 className="text-2xl font-semibold leading-tight tracking-wide">Greeter.io</h2>
          <p className="flex-1 text-center text-gray-400">Greet your customers, let them know that you care for them.</p>
          {greeterRenderFlag === 0 && (
              <button type="button" className="px-8 py-3 font-semibold rounded-md bg-green-400 text-gray-900" onClick={(e) => addGreeterApp(props.owner, props.tokenID)}>Add</button>
            )}

          {!greeterRenderFlag === 0 && (
              <button type="button" className="px-8 py-3 font-semibold rounded-md bg-green-400 text-gray-900" onClick={(e) => toApp(props.tokenID, "Greeter.io")}>Open</button>
         )}
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

        
<div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="w-1/3 bg-cover bg-landscape">
    </div>
    <div className="w-2/3 p-4">
        <h1 className="text-gray-900 font-bold text-2xl">
            Tomorow
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
            You can&#x27;t buy your future, but you can do it. Money is nothing, you&#x27;r everything.
        </p>
        <div className="flex item-center mt-2">
            <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                </path>
            </svg>
            <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                </path>
            </svg>
            <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                </path>
            </svg>
            <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                </path>
            </svg>
            <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                </path>
            </svg>
        </div>
        <div className="flex item-center justify-between mt-3">
            <h1 className="text-gray-700 font-bold text-xl">
                $220
            </h1>
            <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                Add to Card
            </button>
        </div>
    </div>
</div>

      </div>
    </div>


  );

};

export default AddApps;
