//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "hardhat/console.sol";


import "hardhat/console.sol";
contract FeedbackFactory{

   // instantiate Bank contract
   Feedbacks public newFeedbackApp;

   Feedbacks[] public feedbackArray;
   mapping(uint256 => address) feedbackAppContract;

   // function arguments are passed to the constructor of the new created contract 
   function createFeedbackApp(address _owner, uint256 _tokenID, uint256 _rewardAmount) public {

         //create a new Feedback app
         newFeedbackApp = new Feedbacks(_owner, _rewardAmount);

         feedbackArray.push(newFeedbackApp);
         feedbackAppContract[_tokenID] = address(newFeedbackApp);

   }

   function getContractAddress(uint256 _tokenID) view public returns(address) {
      return feedbackAppContract[_tokenID];
   }
}



import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Feedbacks{

   struct Feedback {
      string comment;
      uint256 rating;
      address fromAddress;
   }

   event feedbackAdded(string comment, uint256 rating, address fromAddress, uint256 reward); 

   Feedback[] public allFeedbacks;  

   address payable owner;
   uint256 private rewardAmount;
   uint256 private seedAmount;
   
   constructor(address _owner, uint256 _rewardAmount) {
      owner = payable(_owner); 
      rewardAmount = _rewardAmount;
      console.log("The contract is on", address(this));
   }

   function fundContract(uint256 _seedAmount) external payable {
      require(msg.value >= _seedAmount, "Not enough funds provided");

      seedAmount = _seedAmount;
   }

   function addFeedback(string calldata _comment, uint256 _rating) public {

      require(seedAmount > 0, "All the seed ended");

      Feedback memory newFeedback = Feedback({
         comment: _comment,
         rating: _rating,
         fromAddress: msg.sender
      });   

      allFeedbacks.push(newFeedback);
   
      (bool sent, ) = owner.call{value: rewardAmount}("");
      require(sent, "The transaction failed");

      seedAmount -= rewardAmount;
            
      emit feedbackAdded(_comment, _rating, msg.sender, rewardAmount);
   } 

   function getFeedback() public view returns (Feedback[] memory) {
      return allFeedbacks;
   }

   receive() external payable {}

   fallback() external payable {}

}
