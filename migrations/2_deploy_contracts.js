
module.exports = (deployer, network, accounts) => {
    // skip deploy for tests
    if(network === 'test') {
      return deployer;
    }

    const Token = artifacts.require("crypto-blizToken");
    const CryptoWrapper = artifacts.require("Cryptowrapper");
    const PromissoryToken = artifacts.require("PromissoryToken");

    const _pWallet = accounts[9];
    const _ceiling = web3.utils.toWei('20', 'ether'); 	//20 * 10 ** 18; // 500 ETH
    const _priceFactor = String(7500  / 10); 			//
    const _softCap = web3.utils.toWei('1000', 'ether'); 	//1000 * 10 ** 18; // 1000 ETH 
    const _promissoryAddresses = {
      1: "0x0348B55AbD6E1A99C6EBC972A6A4582Ec0bcEb5c"
    };


    return deployer.deploy(Token).then(async () => {
        await deployer.deploy(CryptoWrapper, _pWallet, _ceiling, _priceFactor, _softCap);


        const token = await Token.deployed();
        const CryptoWrapper = await CryptoWrapper.deployed();

        //Handle promissory instance across networks
        let promissoryToken;
        if (_promissoryAddresses[network]) {
          promissoryToken = await PromissoryToken.at(_promissoryAddresses[network]);
        } else {
          await deployer.deploy(PromissoryToken);
          promissoryToken = await PromissoryToken.deployed();

          // Set PromissaryToken Instance
          //await CryptoWrapper.setPromissoryTokenInstance(promissoryToken.address);
        }

        console.log('-------------------------------');
        console.log('REACT_APP_TOKEN_CONTRACT_ADDRESS='+token.address);
        console.log('REACT_APP_CRYPTO_CONTRACT_ADDRESS='+CryptoWrapper.address);
        console.log('REACT_APP_POMISSORYTOKEN_CONTRACT_ADDRESS='+promissoryToken.address);
        console.log('--------------------------------');

        // console.log('PromissoryToken price : ', (await promissoryToken.lastPrice()).toNumber() );

        // Mint 10 million  Tokens for Cryptowrapper
        await token.mint(CryptoWrapper.address, web3.utils.toWei('10000000', 'ether'));

        // // Transfer 100  tokens to crypto-bliz
        //await token.transfer(CryptoWrapper.address, 5000000 * 10**18 );
        // console.log('Crypto Wrapper Balance : ',  (await token.balanceOf(CryptoWrapper.address)).toNumber() );

        //Setup  CRYPTO
        await CryptoWrapper.setup(token.address);

        //Start CRYPTO
        await CryptoWrapper.startCRYPTO();

        // Setup Finished !
        // Next go to tests ...


    });
};