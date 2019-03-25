## How to optimize ethereum infura queries

Stop using `web3.eth.getBalance` if you need to get balance for more than 5 addresses.  
Use the power of solidity to get any necessary data from ethereum blockchain.  

Checkout [this](https://youtu.be/pL1dZhodxvI) video tutorial: https://youtu.be/pL1dZhodxvI  
[]()

Example:   
Query eth balances and erc20 token balances in batches.  

We need solidity contract:  
```solidity
pragma solidity >=0.4.22 <0.6.0;
interface ERC20 {
    function balanceOf(address owner) external view returns (uint256);
}
contract BalanceOracle {
    
    function exploreBalances(address[] calldata users) external view returns(uint256[] memory balances) {
        balances = new uint256[](users.length);
        for(uint i = 0; i < users.length; i++) {
            balances[i] = users[i].balance;
        }
    }
    
    function erc20Balances(address _token, address[] calldata users) external view returns(uint256[] memory balances) {
        ERC20 erc20 = ERC20(_token);
        balances = new uint256[](users.length);
        for(uint i = 0; i < users.length; i++) {
            balances[i] = erc20.balanceOf(users[i]);
        }
    }
}
```

Javascript example:

```js
const ethers = require('ethers')
const {formatEther} = ethers.utils
const fs = require('fs')
let provider = new ethers.providers.InfuraProvider('mainnet')

const abi = [
    "function exploreBalances(address[] users) external view returns (uint256[] balances)"
]

const BALANCE_ORACLE_ADDRESS = "0x292c4fc2198998d2dc38ac1f302fddf843abbaa3"
const contract = new ethers.Contract(BALANCE_ORACLE_ADDRESS, abi, provider)

async function main() {
    let addresses = fs.readFileSync('./addresses.csv', {encoding: 'utf8'})
    addresses = addresses.split('\n')
    let balances = await contract.exploreBalances(addresses)
    let addressesWithBalances = []
    balances.forEach((balance, index) => 
        {
            return addressesWithBalances.push({
                address: addresses[index], balance: formatEther(balance)
            })
        }
    )
    
    console.log(addressesWithBalances)

}

main()
```

Profit!

Sponsored by https://peppersec.com
