pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import "zeppelin-solidity/contracts/token/MintableToken.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

import "./BlockchainLabsToken.sol";

contract BlockchainLabsCrowdsale is Crowdsale, Ownable {
    mapping(address => bool) public addresses;
    bool whitelistInitialized = false;
    function BlockchainLabsCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet) 
        Crowdsale(_startTime, _endTime, _rate, _wallet)
    {
    }
    // Can only call once. If not needed, remove `require(!whitelistInitialized)`
    function whitelistAddresses(address[] _addresses) onlyOwner {
        require(!whitelistInitialized);
        for (uint256 i = 0; i < _addresses.length; i++) {
            addresses[_addresses[i]] = true;
        }
        whitelistInitialized = true;
    }

    function buyTokens(address beneficiary) payable {
        require(addresses[beneficiary] == true);
        super.buyTokens(beneficiary);
    }

    function changeWhitelistAddress(address _address, bool state) onlyOwner {
        require(_address != 0x0);
        addresses[_address] = state;
    }

    function createTokenContract() internal returns (MintableToken) {
        return new BlockchainLabsToken();
    }
}
