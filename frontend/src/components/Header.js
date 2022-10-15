import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork, useSignMessage } from 'wagmi';

const Header = () => {
  return (
      <header className="p-4 bg-gray-800 text-gray-100">
         <div className="container flex justify-between h-16 mx-auto">
            <div className="flex">
               <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 text-green-400">
                     <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                  </svg>
                  <h2 className="px-15 py-6 lg:p-10 text-3xl font-semibold rounded bg-grey-800 text-green-400">Artha.io</h2>
               </a>
            </div>
            <div className="items-center flex-shrink-0 hidden lg:flex">   
               <ConnectButton />
            </div>
            <button className="p-4 lg:hidden">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-100">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
               </svg>
            </button>
         </div>
      </header>
   );
};

export default Header;

