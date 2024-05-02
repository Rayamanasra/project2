// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControl.sol";                         

contract CandidateRegistrationContract {
    AccessControl public accessControl; // Reference to the AccessControl contract

    // Event to notify when a candidate is registered
    event CandidateRegistered(uint indexed _id, string _name, address _address);

    // Modifier to ensure only admin can register candidates
    modifier onlyAdmin() {
        require(accessControl.isAdmin(msg.sender), "Only admin can call this function");
        _;
    }

    // Constructor to set the AccessControl contract address
    constructor(address _accessControlAddress) {
        accessControl = AccessControl(_accessControlAddress);
    }
    
  // Function for candidate registration with name and address
    function registerCandidate(string memory _name, address _address) public onlyAdmin {
        accessControl.addCandidate(_name, _address); // Provide both name and address parameters
        emit CandidateRegistered(0, _name, _address); // Emit candidate name and address
    }



}
