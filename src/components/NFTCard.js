import React from "react";

const NFTCard = ({ handleMint, NFT, index }) => {
	return (
		<div className="flex justify-center w-11/12 mx-auto  lg:w-96 h:96 border-gray-300 rounded-xl border shadow-xl  p-4 lg:p-6 items-center my-12 flex-col gap-y-4">
			<img
				className="w-full h-full rounded-xl"
				src={`/images/${NFT.imgSrc}`}
				alt="carlos"
			/>
			<h3 className="font-bold text-xl">{NFT.name}</h3>
			<p className="text-center">{NFT.description}</p>
			<button className="border border-gray-300 font-semibold bg-gray-300 py-2 px-4 rounded" onClick={() => handleMint(index, NFT.metadata_url)}>
				Mintear
			</button>
		</div>
	);
};

export default NFTCard;
