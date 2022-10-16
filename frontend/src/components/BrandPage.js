import React, { useState, useEffect } from "react";
import abi from '../utils/BrandNFT.json';
import axios from "axios";
import BrandCard from "./BrandCard";
import { useSigner, useProvider } from 'wagmi';
import * as wagmi from "wagmi";
import Header from "./Header";
import Footer from "./Footer";


const BrandPage = () => {

   // Render Methods
   const LOCAL_STORAGE_KEY = "allBrands";
   const retriveBrands = (localStorage.getItem(LOCAL_STORAGE_KEY) !== '') ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : [];


   const _signer = useSigner();

   // An ethers.Provider instance. This will be the same provider that is  
   // passed as a prop to the WagmiProvider.
   const _provider = useProvider();

   const provider = _provider;
   const signer = _signer;
   //const BrandNFTContract = new ethers.Contract(contractAddress, contractABI, signer);
   

   const [ allBrands, setAllBrands ] = useState(retriveBrands);

   const contractAddress = "0x11e3d82ebed1e82da57e2512554ede03846a00bf";
   const contractABI = abi.abi;

   const BrandNFTContract = wagmi.useContract({
      addressOrName: contractAddress,
      contractInterface: contractABI,
      signerOrProvider: signer.data || provider,
      });

   /*
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
   */

  const reloadPage = () => {
     getmintedBrands(); 
   }
   
  const getmintedBrands = async () => {
   try {
   const { ethereum } = window;
      if(ethereum) {
         const mintedBrands = await BrandNFTContract.getMintedBrands();
         
         console.log(mintedBrands);

         let mintedBrandsClean=[];
         mintedBrands.forEach(async mintedBrand => {

            //fetch data from ipfs and store in state variable

            //getBrandMetadata(`${mintedBrand.tokenURI}%7D`);
            const response = await axios.get(`${mintedBrand.tokenURI}%7D`);

            mintedBrandsClean.push({
            owner: mintedBrand.nftOwner,
            tokenID: mintedBrand.tokenId.toString(),
            tokenName: response.data.brandName,
            tokenDescription: response.data.brandDescription,
            tokenLogo: response.data.logoUrl
            });

            setAllBrands([...mintedBrandsClean]);

         })

      }
    } catch (error) {
      console.log(error);
      }
   }

   useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allBrands));
   }, [allBrands]);
   
   return (
      <div className="bg-gray-800">
         <Header/>
          <button className="px-3 py-3 font-semibold rounded bg-green-400 text-gray-900 lg:ml-10" onClick={(e)=> reloadPage()}> Get All NFTs</button>

         <div className="flex justify-center items-center h-screen bg-gray-800 text-gray-100 items-stretch lg:mt-10">
            {allBrands && allBrands
               .sort((a, b) => Number(a.tokenID) > Number(b.tokenID) ? 1 : -1)
               .map((brand, index) => {
                  return (
                     <div key={index} className="col-span-full sm:col-span-3 lg:ml-5 ">
                        <BrandCard name={brand.tokenName} description={brand.tokenDescription} logo={brand.tokenLogo} tokenID={brand.tokenID}></BrandCard>
                     </div>
                  )
               })}
         </div>
         <Footer/>
         
      </div>
   );
};

export default BrandPage;
