import data from "./data.json";
import NFTCard from "./components/NFTCard";

import { useState } from "react";
import { ethers } from "ethers";
import roboPunksNFT from "./RoboPunksNFT.json";
const roboPunksNFTAddress = "0x196E863Dc5e888743ae6C3ceE5D9F0C4601F21c3";
function App() {
	const [accounts, setAccounts] = useState([]);
	const isConnected = Boolean(accounts[0]);
	const [mintAmount, setMintAmount] = useState(1);

	const handleMint = async (index, metadata_url) => {
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
					index,
					metadata_url
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

	return (
		<div className="">
			<div className="flex justify-end mb-4">
				{isConnected ? (
					<p className="text-xl pt-4 pr-4">Conectado</p>
				) : (
					<button onClick={connectAccount}>Conectar METAMASK</button>
				)}
			</div>
			<h1 className="text-5xl font-extrabold text-center">Chavaleria</h1>

			<div className="lg:grid lg:grid-cols-3 w-screen ">
				{data.map((nft, i) => (
					<NFTCard handleMint={handleMint} key={i} NFT={nft} index={i}/>
				))}
			</div>
		</div>
	);
}

export default App;
