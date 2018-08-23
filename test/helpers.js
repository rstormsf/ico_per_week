const Web3 = require('web3');

const getWeb3 = () => {
  const myWeb3 = new Web3(web3.currentProvider)
  return myWeb3
}

const getContractInstance = (web3) => (contractName, from) => {
  const artifact = artifacts.require(contractName)

  const instance = new web3.eth.Contract(artifact.abi, {
    data: artifact.bytecode,
    gas: 5000000,
    from
  })

  return instance
}

module.exports = {getWeb3, getContractInstance}