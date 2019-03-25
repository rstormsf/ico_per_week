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