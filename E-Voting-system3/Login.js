window.addEventListener('load', async () => {
    // Check if Web3 is injected by MetaMask
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
        } catch (error) {
            console.error('User denied account access');
            return;
        }
    } else if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error('No web3 provider detected. Please install MetaMask or use a web3-enabled browser.');
        return;
    }

    const contractAddress = '0x392858ABD26D6a08a2DE27094eab4cB68252D863'; // Replace with your AccessControl contract address
    const contractAbi = [
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
    const accessControlContract = new web3.eth.Contract(contractAbi, contractAddress);

    // Function to check if the user is an admin
    async function checkAdmin(userAddress) {
        try {
            const isAdmin = await accessControlContract.methods.isAdmin(userAddress).call();
            return isAdmin;
        } catch (error) {
            console.error('Error checking admin status:', error);
            throw new Error('An error occurred while checking admin status');
        }
    }

    // Function to check if the user is a registered voter
    async function checkVoter(userAddress) {
        try {
            const isVoter = await accessControlContract.methods.isVoter(userAddress).call();
            return isVoter;
        } catch (error) {
            console.error('Error checking voter status:', error);
            throw new Error('An error occurred while checking voter status');
        }
    }

    document.getElementById("loginForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const userAddress = document.getElementById("userAddress").value;
        const userRole = document.getElementById("userRole").value;

        try {
            if (userRole === "admin") {
                const isAdmin = await checkAdmin(userAddress);
                if (isAdmin) {
                    window.location.href = "Admin.html"; // Redirect to admin dashboard
                } else {
                    alert("You are not authorized as an admin");
                }
            } else if (userRole === "voter") {
                const isVoter = await checkVoter(userAddress);
                if (isVoter) {
                    window.location.href = "Voter.html"; // Redirect to voter dashboard
                } else {
                    alert("You are not registered as a voter");
                }
            } else {
                alert("Invalid user role");
            }
        } catch (error) {
            console.error('Login error:', error);
            alert("An error occurred. Please try again.");
        }
    });
});
