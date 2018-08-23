pragma solidity ^0.4.23;

contract VersionManager { 

    uint public currentVersion = 1;

    function setVersion(uint _newVersion) public {
        currentVersion = _newVersion;
    }
}