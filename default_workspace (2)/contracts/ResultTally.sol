// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControl.sol";

contract ResultTallyContract {
    AccessControl public accessControl; // Reference to the AccessControl contract

    // Struct to represent the result of an election
    struct ElectionResult {
        address[] candidateAddresses;
        uint[] voteCounts;
        bool finalized;
    }

    ElectionResult public electionResult; // Variable to store the result of the election

    // Event to notify when the election result is finalized
    event ElectionResultFinalized(address[] _candidateAddresses, uint[] _voteCounts);

    // Modifier to ensure only admin can perform certain actions
    modifier onlyAdmin() {
        require(accessControl.isAdmin(msg.sender), "Only admin can call this function");
        _;
    }

    // Constructor to set the AccessControl contract address
    constructor(address _accessControlAddress) {
        accessControl = AccessControl(_accessControlAddress);
    }

    // Function to finalize the election result
    function finalizeResult() public onlyAdmin {
        require(!electionResult.finalized, "Result has already been finalized");

        // Get the list of registered candidates from the AccessControl contract
        address[] memory registeredCandidates = accessControl.getRegisteredCandidates();

        // Step 1: Basic data collection
        uint totalVotes = 0;
        uint candidateCount = registeredCandidates.length;
        electionResult.candidateAddresses = new address[](candidateCount);
        electionResult.voteCounts = new uint[](candidateCount);
        for (uint i = 0; i < candidateCount; i++) {
            address candidateAddress = registeredCandidates[i];
            electionResult.candidateAddresses[i] = candidateAddress;
            uint voteCount = accessControl.getVoteCountForCandidate(candidateAddress);
            electionResult.voteCounts[i] = voteCount;
            totalVotes += voteCount;
        }

        // Step 2: Determine the decision rate (8% of total votes)
        uint decisionRate = totalVotes * 8 / 100;

        // Step 3: Determine eligible candidates and exclude those below the threshold
        address[] memory eligibleCandidates = new address[](candidateCount);
        uint eligibleCount = 0;
        for (uint i = 0; i < candidateCount; i++) {
            if (electionResult.voteCounts[i] >= decisionRate) {
                eligibleCandidates[eligibleCount] = electionResult.candidateAddresses[i];
                eligibleCount++;
            }
        }

        // Step 4: Sort eligible candidates by vote counts (descending order)
        sortCandidates(eligibleCandidates, 0, eligibleCount - 1);

        // Step 5: Allocate seats to candidates based on Saint-Louis method

        // Step 6: Handle quotient equality

        // Step 7: Allocate seats to candidates

        // Step 8: Emit event and mark result as finalized
        electionResult.finalized = true;
        emit ElectionResultFinalized(electionResult.candidateAddresses, electionResult.voteCounts);
    }

    // Function to recursively sort candidates based on vote counts (descending order)
    function sortCandidates(address[] memory _candidates, uint _left, uint _right) internal pure {
        if (_left < _right) {
            uint _pivotIndex = partition(_candidates, _left, _right);
            sortCandidates(_candidates, _left, _pivotIndex);
            sortCandidates(_candidates, _pivotIndex + 1, _right);
        }
    }

    // Function to partition candidates array for sorting
    function partition(address[] memory _candidates, uint _left, uint _right) internal pure returns (uint) {
        uint _pivotValue = 0;
        uint _i = _left;
        uint _j = _right;
        while (_i < _j) {
            while (_i <= _j && uint(uint160(_candidates[_i])) >= _pivotValue) _i++;
            while (_i <= _j && uint(uint160(_candidates[_j])) < _pivotValue) _j--;
            if (_i < _j) {
                ( _candidates[_i], _candidates[_j]) = (_candidates[_j], _candidates[_i]);
                _i++;
                _j--;
            }
        }
        return _i - 1;
    }
}
