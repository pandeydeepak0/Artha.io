
import React, { useState, useEffect } from "react";
import abi from './utils/BrandNFT.json';
import { ethers } from 'ethers';
import AddBrand from './components/AddBrand';
import AddApps from './components/AddApps';

const App = () => {
  // Render Methods
  const [ currentAccount, setCurrentAccount ] = useState("");
  const [ allBrands, setAllBrands ] = React.useState([]);

  const contractAddress = "0x1C53D4BdCe09827059046998b3832AB9Df00793A";
  const contractABI = abi.abi;

  const checkIfWalletIsConnect = async () => {
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
        setCurrentAccount(account)
        getMintedBrands()
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

  const getMintedBrands = async () => {
    try {
      const { ethereum } = window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const BrandNFTContract = new ethers.Contract(contractAddress, contractABI, signer);

        const mintedBrands = await BrandNFTContract.getMintedBrands();
        
        console.log(mintedBrands);

        let mintedBrandsClean=[];
        mintedBrands.forEach(mintedBrand => {
          mintedBrandsClean.push({
            owner: mintedBrand.nftOwner,
            tokenID: mintedBrand.tokenId.toString(),
            tokenUri: mintedBrand.tokenURI
          });
        });

        setAllBrands(mintedBrandsClean);

        console.log(allBrands);
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    checkIfWalletIsConnect();
  },[]);

  // Add components in the component folder

  return (
    <div className="mainContainer">
      <section className="bg-gray-100 text-gray-800">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img src="assets/Business_SVG.svg" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
          </div>
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl">Ac mattis
              <span className="text-purple-600">senectus</span>erat pharetra
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
              
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded bg-purple-600 text-gray-50">Suspendisse</a>
              <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded border-gray-800">Malesuada</a>
            </div>
          </div>
        </div>
      </section>


      {!currentAccount && (
                  <button className="connectWallet" onClick={connectWallet}>
                    Connect with MetaMask Wallet
      </button>)}

      {currentAccount && (
        <AddBrand/>
      )}

      <div className="messageContainer">
      {allBrands.map((brand, index) => {
          return (
            
            <div className="brandContainer">
              <div key={index} style={{ background: "linear-gradient(154deg, #02c4fb, #826df3)", marginTop: "16px", padding: "8px"}}>
                <div style={{color: "#bbb"}}>Owner: {brand.owner}</div>
                <div style={{color: "#bbb"}}>tokenID: {brand.tokenID}</div>
                <div style={{color: "#bbb"}}>tokenURI: {brand.tokenUri}</div>
              </div>

              {currentAccount.toLowerCase() === brand.owner.toLowerCase() && (
                <AddApps owner={brand.owner} tokenID={brand.tokenID}/>)}
            </div>
          )
        })}
      </div>

    </div>
  );

};

export default App;
