import React from "react";
import { useParams } from 'react-router-dom';
import Greeter from "../dApps/Greeter/Greeter";

const AppPage = (props) => {
  // Add components in the component folder

  let params = useParams();

  return (
         <div className="max-w-xs rounded-md shadow-md bg-gray-900 text-gray-100 ">
            <Greeter contractAddress={props.contractAddress} />
         </div>
   );
};

export default AppPage;
