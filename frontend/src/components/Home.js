import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useAccount } from 'wagmi';
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {

   const history = useHistory();

   const toMintBrandPage = () => {
      history.push("/mint-brand");
   }

   const toBrandPage = () => {
      history.push("/brands");
   }
   // Render Methods
   const { address, isConnected } = useAccount();

   useEffect(() => {},[address]);
 
  // Render Methods
   return (
      <div className="bg-gray-800">
         <Header/>
         <section className="bg-gray-800 text-gray-100">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
               <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                  <h1 className="text-5xl font-bold leading-none sm:text-6xl">Bring your Brand to
                     <span className="text-green-400"> Web3</span> with us
                  </h1>
                  <p className="mt-6 mb-8 text-lg sm:mb-12">One click dApp marketplace for digital brands
                     
                  </p>
                  <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">

                     {isConnected && (
                        <div className="flex flex-row space-x-4">
                           <button type="button" className="px-8 py-3 justify-right font-semibold rounded-full bg-green-400 text-gray-800" onClick={toMintBrandPage}>Mint My Brand</button>
                           <button type="button" className="px-8 py-3 justify-right font-semibold rounded-full bg-gray-400 text-gray-800" onClick={toBrandPage}>All Brands</button>
                        </div>
                     )}   
                  </div>
               </div>
               <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                  <img src="assets/Business_SVG.svg" alt="" className="object-contain h-72 sm:h-80 lg:mr-40 lg:h-96 xl:h-112 2xl:h-128" />
               </div>
            </div>
         </section>

         <section className="bg-gray-800 text-gray-100">
            <div className="container flex flex-col-reverse mx-auto lg:flex-row">
               <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5 bg-green-400 text-gray-900">
                  <div className="flex space-x-2 sm:space-x-4">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                     </svg>
                     <div className="space-y-2">
                        <p className="text-lg font-medium leading-snug">Create unique NFT for your Brand</p>
                        <p className="leading-snug">Enter the world of decentralized world by minting your unique NFT</p>
                     </div>
                  </div>
                  <div className="flex space-x-2 sm:space-x-4">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                     </svg>
                     <div className="space-y-2">
                        <p className="text-lg font-medium leading-snug">Add Web3 plugins to your digital brand</p>
                        <p className="leading-snug">Choose from our web3 apps, and add them to your business, you will be the owning these apps, no strings attached.</p>
                     </div>
                  </div>
                  <div className="flex space-x-2 sm:space-x-4">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                     </svg>
                     <div className="space-y-2">
                        <p className="text-lg font-medium leading-snug">Bring your customers to Web3</p>
                        <p className="leading-snug">Create better customer relations with the power of decentralized network.</p>
                     </div>
                  </div>
               </div>
               <div className="lg:w-1/2 xl:w-3/5 bg-gray-800">
                  <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
                     <img src="https://techiia.com/assets/images/6131554beef00/nft_1320x742.jpeg" alt="" className="rounded-lg shadow-lg bg-gray-500 aspect-video sm:min-h-96" />
                  </div>
               </div>
            </div>
         </section>


         <Footer/>
      </div>
   );
};

export default Home;
