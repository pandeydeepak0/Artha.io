import React from "react";
import { useParams } from 'react-router-dom';
import Feedback from "../dApps/Feedback/Feedback";

const AppPage = (props) => {
  // Add components in the component folder

  let params = useParams();

  return (
         <div className="max-w-xs rounded-md shadow-md bg-gray-900 text-gray-100 ">
            <Feedback contractAddress={props.contractAddress} />
         </div>
   );
};

export default AppPage;
