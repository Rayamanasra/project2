// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControl {
    address public admin; // The address of the administrator

    // Mapping to store whether an address has admin privileges
    mapping(address => bool) public isAdmin;

    // Arrays to store registered voters and candidates
    address[] public registeredVoters;
    address[] public registeredCandidates;

    // Mapping to store candidate names by their addresses
    mapping(address => string) public candidateNames;

    // Mapping to store voter names by their addresses
    mapping(address => string) public voterNames;

    // Mapping to store the vote count for each candidate
    mapping(address => uint) public voteCounts;

    // Mapping to track whether a voter has cast their vote
    mapping(address => bool) public hasVoted;

    // Variable to keep track of the total number of candidates
    uint public candidateCount;

    // Flag to indicate whether the result has been finalized
    bool public resultFinalized;

    // Event to notify when admin privileges are granted or revoked
    event AdminUpdated(address indexed _admin, bool _isAdmin);

    // Event to notify when a new candidate is added
    event CandidateAdded(string _name, address _candidate);

    // Event to notify when a voter is registered
    event VoterRegistered(string _name, address indexed _voter);

    // Event to notify when a vote is cast
    event VoteCast(address indexed _candidate, address indexed _voter);

    // Event to notify when the result is finalized
    event ResultFinalized(address[] _electedCandidates, uint[] _voteCounts);

    // Define a struct to represent the result of the election
    struct Result {
        string candidateName;
        uint voteCount;
    }

    // Modifier to restrict access to the admin
    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can call this function");
        _;
    }

    constructor() {
        admin = msg.sender;
        isAdmin[msg.sender] = true;
        resultFinalized = false; // Add this line to initialize resultFinalized
        emit AdminUpdated(msg.sender, true);
    }

    // Function to grant admin privileges to an address (only accessible to the current admin)
    function grantAdmin(address _user) public onlyAdmin {
        isAdmin[_user] = true;
        emit AdminUpdated(_user, true);
    }

    // Function to revoke admin privileges from an address (only accessible to the current admin)
    function revokeAdmin(address _user) public onlyAdmin {
        require(_user != admin, "Cannot revoke admin privileges from the main admin");
        isAdmin[_user] = false;
        emit AdminUpdated(_user, false);
    }

    // Function to add a new candidate with name and address (only accessible to the admin)
    function addCandidate(string memory _name, address _address) public onlyAdmin {
        require(!isVoter(_address), "Address is already registered as a voter");
        require(!isCandidate(_address), "Address is already registered as a candidate");

        registeredCandidates.push(_address);
        candidateNames[_address] = _name;
        candidateCount++;
        emit CandidateAdded(_name, _address);
    }

    // Function to register a voter using name and address (only accessible to the admin)
    function registerVoter(string memory _name, address _voter) public onlyAdmin {
        require(!isVoter(_voter), "Address is already registered as a voter");
        require(!isCandidate(_voter), "Address is already registered as a candidate");

        registeredVoters.push(_voter);
        voterNames[_voter] = _name;
        emit VoterRegistered(_name, _voter);
    }

    // Function to cast a vote (accessible to registered voters)
    function castVote(address _candidate) public {
        require(isVoter(msg.sender), "Only registered voters can cast votes");
        require(isCandidate(_candidate), "Invalid candidate address");
        require(!hasVoted[msg.sender], "You have already cast your vote");

        voteCounts[_candidate]++;
        hasVoted[msg.sender] = true; // Mark the voter as voted
        emit VoteCast(_candidate, msg.sender);
    }

    // Function to check if an address is a registered voter
    function isVoter(address _address) public view returns (bool) {
        for (uint i = 0; i < registeredVoters.length; i++) {
            if (registeredVoters[i] == _address) {
                return true;
            }
        }
        return false;
    }

    // Function to check if an address is a registered candidate
    function isCandidate(address _address) public view returns (bool) {
        for (uint i = 0; i < registeredCandidates.length; i++) {
            if (registeredCandidates[i] == _address) {
                return true;
            }
        }
        return false;
    }

    // Function to get the total vote count for a candidate
    function getVoteCountForCandidate(address _candidate) public view returns (uint) {
        require(isCandidate(_candidate), "Invalid candidate address");
        return voteCounts[_candidate];
    }

    // Function to get the name of a candidate based on their address
    function getCandidateName(address _candidate) public view returns (string memory) {
        require(isCandidate(_candidate), "Invalid candidate address");
        return candidateNames[_candidate];
    }

    // Function to get the name of a voter based on their address
    function getVoterName(address _voter) public view returns (string memory) {
        for (uint i = 0; i < registeredVoters.length; i++) {
            if (registeredVoters[i] == _voter) {
                return voterNames[_voter];
            }
        }
        revert("Invalid voter address");
    }

    // Adjusted finalizeResult function
    function finalizeResult() public onlyAdmin {
        require(!resultFinalized, "Result has already been finalized");
        require(candidateCount > 0, "No candidates registered");

        uint totalVotes = 0;
        for (uint i = 0; i < candidateCount; i++) {
            totalVotes += voteCounts[registeredCandidates[i]];
        }

        require(totalVotes > 0, "No votes cast");

        uint decisionRate = totalVotes * 8 / 100;
        require(decisionRate > 0, "Decision rate is too low");

        address[] memory electedCandidates = new address[](candidateCount); // Initialize with fixed length
        uint electedCount = 0;
        for (uint i = 0; i < candidateCount; i++) {
            if (voteCounts[registeredCandidates[i]] >= decisionRate) {
                electedCandidates[electedCount] = registeredCandidates[i];
                electedCount++;
            }
        }

        require(electedCount > 0, "No candidates elected");

        // Update resultFinalized flag
        resultFinalized = true;

        // Emit the ResultFinalized event with the addresses and vote counts of elected candidates
        address[] memory electedCandidatesAddresses = new address[](electedCount);
        uint[] memory electedCandidatesVotes = new uint[](electedCount);
        for (uint i = 0; i < electedCount; i++) {
            electedCandidatesAddresses[i] = electedCandidates[i];
            electedCandidatesVotes[i] = voteCounts[electedCandidates[i]];
        }
        emit ResultFinalized(electedCandidatesAddresses, electedCandidatesVotes);
    }

    // Function to calculate the result based on the votes each candidate received
    function calculateResult() public view returns (Result[] memory) {
        // Ensure that the result has not already been finalized
        require(!resultFinalized, "Result has already been finalized");

        // Create a dynamic array to store candidate names and their corresponding vote counts
        Result[] memory result = new Result[](candidateCount);

        // Populate the result array with candidate names and their vote counts
        for (uint i = 0; i < candidateCount; i++) {
            address candidate = registeredCandidates[i];
            string memory name = candidateNames[candidate];
            uint voteCount = voteCounts[candidate];
            result[i] = Result(name, voteCount);
        }

        return result;
    }

    // Function to sort the result array based on the vote counts
    function sortResult(Result[] memory _result) internal pure {
        uint length = _result.length;
        for (uint i = 0; i < length; i++) {
            for (uint j = i + 1; j < length; j++) {
                if (_result[i].voteCount < _result[j].voteCount) {
                    Result memory temp = _result[i];
                    _result[i] = _result[j];
                    _result[j] = temp;
                }
            }
        }
    }

    // Function to convert a uint to a string
    function toString(uint _value) internal pure returns (string memory) {
        if (_value == 0) {
            return "0";
        }
        uint temp = _value;
        uint digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (_value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + _value % 10));
            _value /= 10;
        }
        return string(buffer);
    }

    function getRegisteredCandidates() public view returns (address[] memory) {
        return registeredCandidates;
    }

    function getRegisteredVoters() public view returns (address[] memory) {
        return registeredVoters;
    }

    // Function to get the total count of registered candidates
    function getCandidateCount() public view returns (uint) {
        return candidateCount;
    }
}
