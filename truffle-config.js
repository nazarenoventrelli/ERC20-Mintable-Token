const path = require("path");
require("dotenv").config({path: "./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", AccountIndex)
      },
      network_id: '*'
    },
    ganache_local_2: {
      provider: function() {
        return new HDWalletProvider(process.env.GANACHE_MNEMONIC, "http://127.0.0.1:7545", AccountIndex)
      },
      network_id: '*'
    },
    goerli_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://goerli.infura.io/v3/ffa60321cbbd4cfda3352014c556e3c3", AccountIndex)
      },
      network_id: 5
    },
    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/ffa60321cbbd4cfda3352014c556e3c3", AccountIndex)
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "0.6.2"
    }
  }
};
