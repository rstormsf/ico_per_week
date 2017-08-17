var BlockchainLabsCrowdsale = artifacts.require("./BlockchainLabsCrowdsale.sol");

module.exports = function(deployer, network, accounts) {
  return liveDeploy(deployer, accounts);
};

function latestTime() {
  return web3.eth.getBlock('latest').timestamp;
}

const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours:   function(val) { return val * this.minutes(60) },
  days:    function(val) { return val * this.hours(24) },
  weeks:   function(val) { return val * this.days(7) },
  years:   function(val) { return val * this.days(365)} 
};

async function liveDeploy(deployer, accounts) {
  const BigNumber = web3.BigNumber;
  const RATE = 1;
  const startTime = latestTime() + duration.minutes(1);
  const endTime =  startTime + duration.weeks(1);
  console.log([startTime, endTime, RATE, accounts[0]]);
  // uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet) 
  
  return deployer.deploy(BlockchainLabsCrowdsale, startTime, endTime, RATE, accounts[0]).then( async () => {
    const instance = await BlockchainLabsCrowdsale.deployed();
    const token = await instance.token.call();
    console.log('Token Address', token);
  })
}