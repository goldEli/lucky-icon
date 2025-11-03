// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.4.0
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract LuckyCoin is ERC20, Ownable {
    event Mint(uint256 indexed amount);
    event Burn(uint256 indexed amount);

    string public constant _symbol = "LC";
    string public constant _name = "LuckyCoin";

    constructor(address initialOwner) ERC20(_name, _symbol) Ownable(initialOwner) {}

    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);

        emit Mint(amount);
    }

    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);

        emit Burn(amount);
    }
}
