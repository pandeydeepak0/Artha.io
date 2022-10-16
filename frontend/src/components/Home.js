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

   useEffect(() => { }, [address]);

   // Render Methods
   return (
      <div className="">
         <Header />

         <section className='h-screen gradientGreen flex flex-col items-center justify-center'>
            <div className='font-Roboto text-center'>
               <h1 className='text-7xl max-w-3xl font-semibold tracking-tighter font-Roboto text-gray-200'>Artha is the better way to build Web3 brands</h1>
               <h2 className='text-gray-200 mt-5 text-xl'>One click dApp marketplace for digital brands</h2>
               <div className='pt-10 flex items-center justify-center gap-x-4'>
                  <button onClick={toMintBrandPage} className='px-4 py-2 rounded-lg bg-green-400 font-semibold transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/50'>Mint your brand</button>
                  <button onClick={toBrandPage} className='px-4 py-2 rounded-lg bg-green-400 font-semibold transition duration-200 hover:-translate-y-1 hover:shadow-lg'>Explore marketplace</button>
               </div>
            </div>

         </section>

         <section className='my-10  font-Roboto  md:max-w-4xl lg:max-w-5xl xl:max-w-6xl w-11/12 mx-auto'>
            <h1 className='text-center pb-10 text-4xl md:text-6xl max-w-6xl font-semibold tracking-tighter font-Roboto text-gray-800'>Give your Brand the <br />
               identity it deserves</h1>
            <div className='flex flex-col gap-4 justify-between items-center md:flex-row'>
               <div className='rounded-lg shadow-md p-5 max-w-xs cursor-pointer border border-gray-200 transition duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500'>
                  <img src='/001.jpeg' className='h-48 rounded-xl'></img>
                  <h1 className='pt-2 font-bold'>Identity</h1>
                  <p className='pt-2 text-sm text-gray-700'>Allow brands to have a unique
                     identity on the decentralized
                     internet.</p>
               </div>
               <div className='rounded-lg shadow-md p-5 max-w-xs cursor-pointer border border-gray-200 transition duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500'>
                  <img src='/002.jpeg' className='h-48 rounded-xl'></img>
                  <h1 className='pt-2 font-bold'>Create</h1>
                  <p className='pt-2 text-sm text-gray-700'>Allow brands to create and own
                     Web3 apps.</p>
               </div>
               <div className='rounded-lg shadow-md p-5 max-w-xs cursor-pointer border border-gray-200 transition duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500'>
                  <img src='/003.jpeg' className='h-48 rounded-xl'></img>
                  <h1 className='pt-2 font-bold'>Expand</h1>
                  <p className='pt-2 text-sm text-gray-700'>Allow brands to be future-ready by
                     expanding on the internet of
                     tomorrow.</p>
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


         <Footer />
      </div>
   );
};

export default Home;
