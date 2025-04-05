//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// We import this library to be able to use console.log
import "hardhat/console.sol";

/**
 * @title The Amazing Bet Game Token
 * @dev Gaming token for The Amazing Bet platform
 * @custom:ui-color #ffc107 
 * @custom:ui-background #212529 
 */
contract Token {
    // Basic token details
    string public name = "The Amazing Bet"; 
    string public symbol = "TAB";                

    // The fixed amount of tokens stored in an unsigned integer type variable.
    uint256 public totalSupply = 1000000;

    // An address type variable is used to store ethereum accounts.
    address public owner;
    uint256 public chainId;

    // Add an error for wrong network
    error WrongNetwork(uint256 expected, uint256 actual);
    
    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint256) balances;

    // The Transfer event helps off-chain aplications understand
    // what happens within your contract.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /**
     * Contract initialization.
     * @dev Sets up the token with matching UI theme from Transfer.js (dark background, gold highlights)
     */
    constructor() {
        // Store the chain ID during deployment
        chainId = block.chainid;
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    modifier onSameNetwork() {
        if (block.chainid != chainId) {
            revert WrongNetwork(chainId, block.chainid);
        }
        _;
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from outside
     * the contract.
     */
    function transfer(address to, uint256 amount) external onSameNetwork {
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // We can print messages and values using console.log, a feature of
        // Hardhat Network:
        console.log(
            "Transferring from %s to %s %s tokens",
            msg.sender,
            to,
            amount
        );

        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Notify off-chain applications of the transfer.
        emit Transfer(msg.sender, to, amount);
    }

    /**
     * Read only function to retrieve the token balance of a given account.
     *
     * The `view` modifier indicates that it doesn't modify the contract's
     * state, which allows us to call it without executing a transaction.
     */
    function balanceOf(address account) external view onSameNetwork returns (uint256) {
        return balances[account];
    }
}
