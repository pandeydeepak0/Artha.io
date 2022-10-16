import React from "react";
import { useParams } from 'react-router-dom';
import AddApps from "./AddApps";
import { useAccount, useSigner, useProvider } from 'wagmi';
import Header from "./Header";
import Footer from "./Footer";


const BrandDetails = () => {
   // Add components in the component folder
   const LOCAL_STORAGE_KEY = "allBrands";
   const allBrands = (localStorage.getItem(LOCAL_STORAGE_KEY) !== '') ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : [];

   let params = useParams();

   const retriveBrands = allBrands;
   console.log(retriveBrands);

   const brandDetail = retriveBrands[Number(params.tokenID)];

   console.log(Number(params.tokenID));

   const { address } = useAccount();
   const _signer = useSigner();

   // An ethers.Provider instance. This will be the same provider that is  
   // passed as a prop to the WagmiProvider.
   const _provider = useProvider();

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

  useEffect(() => {
   checkIfWalletIsConnect();
 },[]);
*/

   return (


      <div className="bg-gray-800">

         <Header />

         <div className="mt-14 bg-gray-800 text-gray-50 lg:pb-10 rounded-3xl">
            <div className="container grid grid-cols-12 mx-auto bg-gray-900 rounded-lg">
               <img src={brandDetail.tokenLogo} alt="" className="object-cover lg:p-10 lg:col-span-4 w-50 rounded-lg" />
               <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10 ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mb-8 text-green-400">
                     <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <h1 className="text-5xl font-semibold lg:mb-10">{brandDetail.tokenName}</h1>
                  <div className="flex justify-start">
                     <p className="flex-1 pt-2">{brandDetail.tokenDescription}</p>
                  </div>
               </div>
            </div>

            {address.toLowerCase() === brandDetail.owner.toLowerCase() && (
               <AddApps owner={brandDetail.owner} tokenID={brandDetail.tokenID} />)}
         </div>
         <Footer />


      </div>

   );
};

export default BrandDetails;
