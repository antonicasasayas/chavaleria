import "./App.css";
import { useState } from "react";
import { ethers} from "ethers";
import roboPunksNFT from "./RoboPunksNFT.json";
const roboPunksNFTAddress = "0x196E863Dc5e888743ae6C3ceE5D9F0C4601F21c3";
function App() {
	const [accounts, setAccounts] = useState([]);
	const isConnected = Boolean(accounts[0]);
	const [mintAmount, setMintAmount] = useState(1);

	const handleMint = async () => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				roboPunksNFTAddress,
				roboPunksNFT.abi,
				signer
			);
			try {
				const response = await contract.mint(
					accounts[0],
					1,
					"ipfs://bafkreicirnoudxeareo375iffa3hkvtyxptau2klc4qk3zxvjukvmv7g54"
				);
				console.log("response", response);
			} catch (err) {
				console.log(err);
			}
		}
	};
	const connectAccount = async () => {
		if (window.ethereum) {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setAccounts(accounts);
		}
	};

	const handleDecrement = async () => {
		if (mintAmount <= 1) return;
		setMintAmount((prevAmount) => prevAmount - 1);
	};

	const handleIncrement = async () => {
		if (mintAmount >= 3) return;
		setMintAmount((prevAmount) => prevAmount + 1);
	};
	console.log(accounts[0]);

	return (
		<div className="App">
			{isConnected ? (
				<p>Connected</p>
			) : (
				<button onClick={connectAccount}>Connect</button>
			)}
			{isConnected ? (
				<div>
					<button onClick={handleDecrement}>-</button>
					<input type="number" value={mintAmount} />
					<button onClick={handleIncrement}>+</button>
					<button onClick={handleMint}>Mint</button>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default App;
