// Define the ABI of the AccessControl contract
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

    const accessControlAddress = '0x392858ABD26D6a08a2DE27094eab4cB68252D863'; // Replace with the deployed address of your AccessControl contract
    const accessControlContract = new web3.eth.Contract(accessControlAbi, accessControlAddress);

    // Function to cast a vote
    async function vote(candidateAddress) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const fromAddress = accounts[0];
            await accessControlContract.methods.castVote(candidateAddress).send({ from: fromAddress });
            alert("Vote cast successfully");
        } catch (error) {
            console.error('Error casting vote:', error);
            alert("An error occurred. Please try again.");
        }
    }

	async function showResult() {
		try {
			const candidateCount = await accessControlContract.methods.getCandidateCount().call();
			const resultList = document.getElementById("resultList");
			resultList.innerHTML = ''; // Clear previous results
	
			// Fetch candidate details and vote count
			const candidates = [];
			for (let i = 0; i < candidateCount; i++) {
				const candidateAddress = await accessControlContract.methods.getRegisteredCandidates().call();
				const candidateName = await accessControlContract.methods.getCandidateName(candidateAddress[i]).call();
				const voteCount = await accessControlContract.methods.getVoteCountForCandidate(candidateAddress[i]).call();
				candidates.push({ name: candidateName, voteCount: parseInt(voteCount) });
			}
	
			// Sort candidates by vote count (descending)
			candidates.sort((a, b) => b.voteCount - a.voteCount);
	
			// Display sorted candidates with vote count
			candidates.forEach((candidate, index) => {
				const listItem = document.createElement("li");
				listItem.textContent = `Candidate ${index + 1}: ${candidate.name} - Votes: ${candidate.voteCount}`;
				resultList.appendChild(listItem);
			});
	
			document.getElementById("result").style.display = "block";
	
			// After showing the result, also show the candidates
			await showCandidates();
		} catch (error) {
			console.error('Error showing result:', error);
			alert("An error occurred. Please try again.");
		}
	}
	

	async function showCandidates() {
		try {
			const batchSize = 10; // Adjust the batch size as needed
			const candidateCount = await accessControlContract.methods.getCandidateCount().call();
			const candidateList = document.getElementById("candidateList");
			candidateList.innerHTML = ''; // Clear previous candidate list
	
			// Fetch and display candidate names in batches
			for (let i = 0; i < candidateCount; i += batchSize) {
				const candidateAddresses = await accessControlContract.methods.getRegisteredCandidates().call({ from: web3.eth.defaultAccount });
				for (let j = i; j < Math.min(i + batchSize, candidateCount); j++) {
					const candidateAddress = candidateAddresses[j];
					const candidateName = await accessControlContract.methods.getCandidateName(candidateAddress).call();
					const listItem = document.createElement("li");
					listItem.textContent = `Candidate ${j + 1}: ${candidateName}`;
	
					// Create a vote button for each candidate
					const voteButton = document.createElement("button");
					voteButton.textContent = "Vote";
					voteButton.addEventListener("click", () => {
						vote(candidateAddress); // Call the vote function with candidate address
					});
	
					// Append the vote button to the list item
					listItem.appendChild(voteButton);
	
					// Append the list item to the candidate list
					candidateList.appendChild(listItem);
				}
			}
	
			document.getElementById("candidates").style.display = "block";
		} catch (error) {
			console.error('Error showing candidates:', error);
			alert("An error occurred. Please try again.");
		}
	}
	
   // Event listener for showing result
   document.getElementById("showResult").addEventListener("click", showResult);

   // Event listener for showing candidates
   document.getElementById("showCandidates").addEventListener("click", showCandidates);

   // Event listener for voting button
   document.getElementById("voteButton").addEventListener("click", async () => {
	   try {
		   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		   const fromAddress = accounts[0];
		   const candidateSelect = document.getElementById("candidateSelect");
		   const candidateAddress = candidateSelect.value;
		   const hasVoted = await accessControlContract.methods.hasVoted(fromAddress).call();
		   if (hasVoted) {
			   alert("You have already cast your vote.");
		   } else {
			   await vote(candidateAddress);
		   }
	   } catch (error) {
		   console.error('Error voting:', error);
		   alert("An error occurred. Please try again.");
	   }
   });
});