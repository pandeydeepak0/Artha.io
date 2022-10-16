import React from "react";
import { useHistory } from 'react-router-dom';

const BrandCard = (props) => {
   // Add components in the component folder

   const history = useHistory();

   const toBrand = (_tokenID) => {
      history.push(`/brands/${_tokenID - 1}`);
   }

   return (
      <div className="min-h-full rounded-lg shadow-md bg-gray-100 text-gray-700 cursor-pointer transition duration-200 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500  ">
         <img src={props.logo} alt="" className="object-cover w-full rounded-t-lg h-48 bg-gray-500" />
         <div className="flex flex-col justify-between p-4">
            <h2 className="text-2xl font-bold tracking-wide pb-2">{props.name}</h2>
            <p className="pb-2">{props.description}</p>
            <button type="button" onClick={(e) => toBrand(props.tokenID)} className="px-4 py-2 font-semibold rounded-lg bg-green-400 text-gray-900">
               Open NFT
            </button>
         </div>
      </div>
   );
};

export default BrandCard;
