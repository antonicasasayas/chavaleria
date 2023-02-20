//SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChavaleriaNFT is ERC721URIStorage, Ownable {
    constructor() payable ERC721("La Chavaleria", "CH") {}

    function mint(
        address _to,
        uint256 _tokenId,
        string calldata _uri
    ) external {
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _uri);
    }
}
