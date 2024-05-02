window.addEventListener('load', async () => {
    // Check if Web3 is injected by MetaMask
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
        } catch (error) {
            console.error('User denied account access');
        }
    } else if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error('No web3 provider detected. Please install MetaMask or use a web3-enabled browser.');
    }

    const accessControlAddress = '0x392858ABD26D6a08a2DE27094eab4cB68252D863'; // Replace with your new deployed AccessControl contract address
    const accessControlAbi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_admin",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "_isAdmin",
                    "type": "bool"
                }
            ],
            "name": "AdminUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_candidate",
                    "type": "address"
                }
            ],
            "name": "CandidateAdded",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_candidate",
                    "type": "address"
                }
            ],
            "name": "castVote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "finalizeResult",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "grantAdmin",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_voter",
                    "type": "address"
                }
            ],
            "name": "registerVoter",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address[]",
                    "name": "_electedCandidates",
                    "type": "address[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "_voteCounts",
                    "type": "uint256[]"
                }
            ],
            "name": "ResultFinalized",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "revokeAdmin",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_candidate",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_voter",
                    "type": "address"
                }
            ],
            "name": "VoteCast",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_voter",
                    "type": "address"
                }
            ],
            "name": "VoterRegistered",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "calculateResult",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "candidateName",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "voteCount",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct AccessControl.Result[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "candidateCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "candidateNames",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCandidateCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_candidate",
                    "type": "address"
                }
            ],
            "name": "getCandidateName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRegisteredCandidates",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRegisteredVoters",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_candidate",
                    "type": "address"
                }
            ],
            "name": "getVoteCountForCandidate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_voter",
                    "type": "address"
                }
            ],
            "name": "getVoterName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "hasVoted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "isAdmin",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "isCandidate",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "isVoter",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "registeredCandidates",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "registeredVoters",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "resultFinalized",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voteCounts",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voterNames",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const accessControlContract = new web3.eth.Contract(accessControlAbi, accessControlAddress);


    async function displayRegisteredCandidates() {
        const registeredCandidatesList = document.getElementById('registeredCandidatesList');
        registeredCandidatesList.innerHTML = '<p>Loading registered candidates...</p>'; // Placeholder text or loading animation
    
        try {
            // Fetch the list of registered candidates from the smart contract
            const registeredCandidates = await accessControlContract.methods.getRegisteredCandidates().call();
            console.log("Registered Candidates:", registeredCandidates); // Log the fetched candidates
            
            // Clear the placeholder text or loading animation
            registeredCandidatesList.innerHTML = '';
    
            // Iterate through the list of registered candidates and add their names to the HTML list
            registeredCandidates.forEach(async candidateAddress => {
                // Fetch candidate name from the contract data
                const candidateName = await accessControlContract.methods.getCandidateName(candidateAddress).call();
                
                // Create a list item element for the candidate
                const listItem = document.createElement('li');
                listItem.textContent = `Candidate: ${candidateName}`;
                
                // Append the list item to the list of registered candidates
                registeredCandidatesList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching registered candidates:', error);
            alert("An error occurred while fetching registered candidates. Please try again.");
        }
    }
    
    
    
    async function displayRegisteredVoters() {
        const registeredVotersList = document.getElementById('registeredVotersList');
        registeredVotersList.innerHTML = '<p>Loading registered voters...</p>'; // Placeholder text or loading animation
    
        try {
            // Fetch the list of registered voters from the smart contract
            const registeredVoters = await accessControlContract.methods.getRegisteredVoters().call();
            console.log("Registered Voters:", registeredVoters); // Log the fetched voters
    
            // Clear the placeholder text or loading animation
            registeredVotersList.innerHTML = '';
    
            // Iterate through the list of registered voters and add their names to the HTML list
            for (let i = 0; i < registeredVoters.length; i++) {
                // Fetch voter name from the contract data
                const voterName = await accessControlContract.methods.getVoterName(registeredVoters[i]).call();
    
                // Create a list item element for the voter
                const listItem = document.createElement('li');
                listItem.textContent = `Voter: ${voterName}`;
    
                // Append the list item to the list of registered voters
                registeredVotersList.appendChild(listItem);
            }
        } catch (error) {
            console.error('Error fetching registered voters:', error);
            alert("An error occurred while fetching registered voters. Please try again.");
        }
    }
    
    
    // Call the functions to initially display registered candidates and voters
    displayRegisteredCandidates();
    displayRegisteredVoters();

    document.getElementById("addCandidateBtn").addEventListener("click", async () => {
        const candidateName = prompt("Enter candidate name:");
        const candidateAddress = prompt("Enter candidate address:");
        
        try {
            // Request access to user accounts from MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const fromAccount = accounts[0]; // Get the first account
            
            // Send transaction with the specified from address
            await accessControlContract.methods.addCandidate(candidateName, candidateAddress).send({ from: fromAccount });
            
            alert("Candidate added successfully");
            displayRegisteredCandidates(); // Refresh candidate list
        } catch (error) {
            console.error('Error adding candidate:', error);
            alert("An error occurred. Please try again.");
        }
    });

    document.getElementById("registerVoterBtn").addEventListener("click", async () => {
        const voterName = prompt("Enter voter name:");
        const voterAddress = prompt("Enter voter address:");
    
        // Check if the provided address is valid
        if (!web3.utils.isAddress(voterAddress)) {
            alert("Invalid address. Please enter a valid Ethereum address.");
            return;
        }
    
        // Ensure MetaMask is installed and available
        if (typeof window.ethereum === 'undefined') {
            alert("MetaMask is not installed or not available. Please install MetaMask and try again.");
            return;
        }
    
        try {
            // Request access to user accounts from MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const fromAccount = accounts[0]; // Get the first account
    
            // Use MetaMask provider to send transaction with the specified from address
            await accessControlContract.methods.registerVoter(voterName, voterAddress).send({ from: fromAccount });
    
            alert("Voter registered successfully");
            displayRegisteredVoters(); // Refresh voter list
        } catch (error) {
            console.error('Error registering voter:', error);
            alert("An error occurred. Please try again.");
        }
    });

    document.getElementById("finalizeResultBtn").addEventListener("click", async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const fromAccount = accounts[0];
            const result = await accessControlContract.methods.finalizeResult().send({ from: fromAccount });
            console.log("Result finalized successfully");
            console.log("Transaction hash:", result.transactionHash);
            alert("Result finalized successfully");
        } catch (error) {
            console.error('Error finalizing result:', error);
            alert("An error occurred. Please try again.");
        }
    });
    
    document.getElementById("testFinalizeResultBtn").addEventListener("click", async () => {
        try {
            console.log("Simulating finalize result with a small number of votes...");
            const result = await accessControlContract.methods.calculateResult().call();
            console.log("Finalize result simulation completed successfully");
            console.log("Result:", result);
            displayResult(result);
            alert("Finalize result simulation completed successfully");
        } catch (error) {
            console.error('Error simulating finalize result:', error);
            alert("An error occurred. Please try again.");
        }
    });
    
    async function displayResult(result) {
        // Convert the array elements into objects
        const formattedResult = result.map(item => ({
            name: item[0], // Access the candidate name from the first element of the inner array
            votes: parseInt(item[1]) // Convert voteCount to a number
        }));
    
        // Sort formatted result array by vote counts in descending order
        formattedResult.sort((a, b) => b.votes - a.votes);
    
        // Display result in HTML list
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = ''; // Clear previous results
    
        formattedResult.forEach(candidate => {
            const listItem = document.createElement('li');
            listItem.textContent = `${candidate.name}: ${candidate.votes} votes`;
            resultContainer.appendChild(listItem);
        });
    }
    
    
    
    
    document.getElementById("grantAdminBtn").addEventListener("click", async () => {
        const addressToGrant = prompt("Enter address to grant admin access:");
    
        try {
            // Request access to user accounts from MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const fromAccount = accounts[0]; // Get the first account
    
            // Use MetaMask provider to send transaction with the specified from address
            await accessControlContract.methods.grantAdmin(addressToGrant).send({ from: fromAccount });
    
            alert("Admin access granted successfully");
        } catch (error) {
            console.error('Error granting admin access:', error);
            alert("An error occurred. Please try again.");
        }
    });

    document.getElementById("revokeAdminBtn").addEventListener("click", async () => {
        const addressToRevoke = prompt("Enter address to revoke admin access:");
    
        try {
            // Request access to user accounts from MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const fromAccount = accounts[0]; // Get the first account
    
            // Use MetaMask provider to send transaction with the specified from address
            await accessControlContract.methods.revokeAdmin(addressToRevoke).send({ from: fromAccount });
    
            alert("Admin access revoked successfully");
        } catch (error) {
            console.error('Error revoking admin access:', error);
            alert("An error occurred. Please try again.");
        }
    });
});