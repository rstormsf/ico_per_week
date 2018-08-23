const {getWeb3, getContractInstance} = require('./helpers');
const web3_1_0 = getWeb3();
const getInstance = getContractInstance(web3_1_0);
const Web3Utils = require('web3-utils')



contract("VersionManager", async (accounts) => {
  var VersionManager = getInstance('VersionManager', accounts[0])

  it('changes currentVersion', async () => {
    const instance = await VersionManager.deploy().send();
    let currentVersion = await instance.methods.currentVersion().call();
    assert.equal(currentVersion.toString(), '1')

    const newVersion = Web3Utils.toWei('1', 'ether')
    await instance.methods.setVersion(newVersion).send({from: accounts[1]});

    currentVersion = await instance.methods.currentVersion().call();
    assert.equal(currentVersion.toString(), newVersion.toString())
  })
})