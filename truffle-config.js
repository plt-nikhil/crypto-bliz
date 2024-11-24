var path = require('path');

module.exports = {
  
  contracts_build_directory: path.join(__dirname, "./src/contracts/"),
  
  compilers: {
    solc: {
      version: '^0.5.5',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {

    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // match any network
      gas: 7700000
    }
    
  },

  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
  
};
