import React, { useState, useEffect } from "react";
import * as wagmi from "wagmi";
import { useSigner, useProvider,  } from "wagmi";


const Feedback = (props) => {

    const _signer = useSigner();
    const _provider = useProvider();

    const provider = _provider;
    const signer = _signer;
    
    const [ allBrands, setAllBrands ] = useState();

  return (
    <div>
        <label htmlFor="brandname" className="text-sm">Comment</label>
        <input onChange={(e) => setRewardAmount(e.target.value)} value={rewardAmount} className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-indigo-600" />
        <label htmlFor="brandname" className="text-sm">Rating (1-5)</label>
        <input onChange={(e) => setSeedAmount(e.target.value)} value={seedAmount} className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-indigo-600" />
        
        <button type="button" className="px-8 py-3 font-semibold rounded-md bg-green-400 text-gray-900" onClick={(e) => addFeedbackApp(props.owner, props.tokenID)}>Add</button>
    </div>
    
  );

};

export default Feedback;
