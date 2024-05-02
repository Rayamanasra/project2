// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdminContract {
    address public admin; // The address of the administrator

    // Struct to represent a candidate
    struct Candidate {
        uint id;
        string name;
        address candidateAddress; // Added address field
    }

    // Array to store the candidates
    Candidate[] public candidates;

    // Mapping to store whether a voter is registered
    mapping(address => bool) public voters;

    // Event to notify when a candidate is added
    event CandidateAdded(uint indexed _id, string _name, address _candidateAddress); // Updated event
    // Event to notify when a candidate is deleted
    event CandidateDeleted(uint indexed _id);
    // Event to notify when a voter is registered
    event VoterRegistered(address _voter);
    // Event to notify when a voter is unregistered
    event VoterUnregistered(address _voter);

    // Modifier to restrict access to the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // Constructor to set the administrator
    constructor() {
        admin = msg.sender;
    }

    // Function to add a candidate (only accessible to admin)
    function addCandidate(string memory _name, address _candidateAddress) public onlyAdmin {
        candidates.push(Candidate(candidates.length + 1, _name, _candidateAddress)); // Updated
        emit CandidateAdded(candidates.length, _name, _candidateAddress); // Updated
    }

    // Function to get the total number of candidates
    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }

    // Function to get a candidate by ID
    function getCandidate(uint _id) public view returns (uint id, string memory name, address candidateAddress) { // Updated return values
        require(_id > 0 && _id <= candidates.length, "Invalid candidate ID");
        Candidate memory candidate = candidates[_id - 1];
        return (candidate.id, candidate.name, candidate.candidateAddress); // Updated
    }

    // Function to delete a candidate (only accessible to admin)
    function deleteCandidate(uint _id) public onlyAdmin {
        require(_id > 0 && _id <= candidates.length, "Invalid candidate ID");
        delete candidates[_id - 1];
        emit CandidateDeleted(_id);
    }

    // Function to register a voter
    function registerVoter(address _voter) public onlyAdmin {
        voters[_voter] = true;
        emit VoterRegistered(_voter);
    }

    // Function to unregister a voter
    function unregisterVoter(address _voter) public onlyAdmin {
        delete voters[_voter];
        emit VoterUnregistered(_voter);
    }

    // Function to check if an address is a registered voter
    function isVoter(address _address) public view returns (bool) {
        return voters[_address];
    }

    // Function to get voters' statuses
    function getVoters() public view returns (bool[] memory) {
        bool[] memory voterStatus = new bool[](candidates.length);
        for (uint i = 0; i < candidates.length; i++) {
            voterStatus[i] = voters[msg.sender];
        }
        return voterStatus;
    }
}
