import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
   return (
      <header className='fixed w-screen top-0 z-30 backdrop-blur-sm shadow-md'>
         <div className='md:max-w-4xl lg:max-w-5xl xl:max-w-6xl w-11/12 mx-auto'>
            <div className='flex items-center justify-between h-14'>

               <a href="/" className='flex items-center justify-center gap-x-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-6 h-6 text-green-400">
                     <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                  </svg>
                  <h2 className="font-Rubik text-2xl font-extrabold text-green-400">Artha.io</h2>
               </a>
               <ConnectButton />
            </div>
            <div>
            </div>
         </div>
      </header>
   );
};

export default Header;

