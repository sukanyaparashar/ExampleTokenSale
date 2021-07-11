// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExampleToken is ERC20 {

    constructor(uint256 initialSupply) ERC20("Example Token", "EXTO") {
        _mint(msg.sender, initialSupply);
        decimals();
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}