require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

const infuraProvider = network => providerWithMnemonic(
  process.env.MNEMONIC || '',
  `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
);


const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
  new HDWalletProvider(mnemonic, rpcEndpoint);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
    },
    kovan: {
      provider: infuraProvider('kovan'),
      gasPrice: 1000000000,
      network_id: '42', // eslint-disable-line camelcase
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
