pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/token/MintableToken.sol";

contract BlockchainLabsToken is MintableToken {
    string public constant name = "BlockchainLabsToken";
    string public constant symbol = "BLS";
    uint8 public constant decimals = 18;
}
