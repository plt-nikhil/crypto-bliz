const crypto-blizToken = artifacts.require('./crypto-blizToken.sol');
const assert = require('chai').assert;
const expect = require('chai').expect;

const ETHER = Math.pow(10,18);

contract('crypto-blizToken', function(accounts) {

  const owner = accounts[0];
  let crypto-blizToken;


  before(async function() {
    await crypto-blizToken.new({
      from: owner,
    })
    .then(function(instance) {
      crypto-blizToken = instance
      assert.isNotNull(crypto-blizToken.address, 'Failed to deploy crypto-blizToken with address');
      console.log('Web3: ', web3.version.api ? web3.version.api : web3.version);
    })
  })

  describe('setWhitelistedOnly()', function(){
    it('should fail to setWhitelistedOnly()', async function() {
      try {
        await crypto-blizToken.setWhitelistedOnly(true, {
          from: accounts[1]
        });
        assert.isNotOk(true, 'Expected function to fail');
      } catch(e) {
        assert.exists(e, 'Expected error to exist from throw');
      };
    })

    it('should setWhitelistedOnly()', async function() {
      const oldIsTransferWhitelistOnly = await crypto-blizToken.isTransferWhitelistOnly.call();
      try {
        await crypto-blizToken.setWhitelistedOnly(true, {
          from: owner
        });

        const isTransferWhitelistOnly = await crypto-blizToken.isTransferWhitelistOnly.call();
        assert.isTrue(isTransferWhitelistOnly, 'New TransferWhitelistOnly not successfully set');
        assert.notEqual(oldIsTransferWhitelistOnly, isTransferWhitelistOnly, 'TransferWhitelistOnly value did not change as expected');
      } catch(e) {
        assert.isNotOk(true, `Expected function to complete: ${e.message || e}`);
      };
    })
  });

  describe('whitelistUserForTransfers', function() {
    it('should fail to whitelistUserForTransfers()', async function() {
      try {
        await crypto-blizToken.whitelistUserForTransfers( accounts[5], {
          from: accounts[1]
        })
        assert.isNotOk(true, 'Expected function to fail');
      } catch (e) {
        assert.exists(e, 'Expected error to exist from throw');
      }
    })

    it('should successfully whitelistUserForTransfers()', async function() {
      const oldIsUserAllowedToTransfer = await crypto-blizToken.isUserAllowedToTransfer.call(accounts[5])
      assert.isFalse(oldIsUserAllowedToTransfer, 'User already granted Transfer permission');
      try {
        await crypto-blizToken.whitelistUserForTransfers( accounts[5], {
          from: owner
        })
        const isUserAllowedToTransfer = await crypto-blizToken.isUserAllowedToTransfer.call(accounts[5])
        assert.isTrue(isUserAllowedToTransfer, 'User not successfully granted Transfer permission');
      } catch (e) {
        assert.isNotOk(true, `Expected function to complete: ${e.message || e}`);
      }
    })

    it('should fail to call whitelistUserForTransfers() twice on same address', async function() {
      try {
        await crypto-blizToken.whitelistUserForTransfers( accounts[5], {
          from: owner
        })
        assert.isNotOk(true, 'Expected function to fail');
      } catch (e) {
        assert.exists(e, 'Expected error to exist from throw');
      }
    })
  })

  describe('blacklistUserForTransfers()', function(){
    it('should fail to blacklistUserForTransfers()', async function() {
      try {
        await crypto-blizToken.blacklistUserForTransfers(accounts[5], {
          from: accounts[1]
        });
        assert.isNotOk(true, 'Expected function to fail');
      } catch(e) {
        assert.exists(e, 'Expected error to exist from throw');
      };
    })

    it('should fail to blacklistUserForTransfers() non-whitelisted user', async function() {
      try {
        await crypto-blizToken.blacklistUserForTransfers(accounts[1], {
          from: owner
        });
        assert.isNotOk(true, 'Expected function to fail');
      } catch(e) {
        assert.exists(e, 'Expected error to exist from throw');
      };
    })

    it('should successfully blacklistUserForTransfers()', async function() {
      const oldIsUserAllowedToTransfer = await crypto-blizToken.isUserAllowedToTransfer.call(accounts[5])
      assert.isTrue(oldIsUserAllowedToTransfer, 'User not granted Transfer permission');
      try {
        await crypto-blizToken.blacklistUserForTransfers(accounts[5], {
          from: owner
        });

        const isUserAllowedToTransfer = await crypto-blizToken.isUserAllowedToTransfer.call(accounts[5])
        assert.isFalse(isUserAllowedToTransfer, 'User not successfully blacklisted from Transfers');
      } catch(e) {
        assert.isNotOk(true, `Expected function to complete: ${e.message || e}`);
      };
    })
  });

  describe('isTransferWhitelistOnly()', function(){
    const tokenOwner = accounts[5];
    before(async function() {
      const toMint = web3.utils.toWei('1000000', 'ether');
      await crypto-blizToken.mint(tokenOwner, toMint);
      const accountBalance = await crypto-blizToken.balanceOf.call(tokenOwner);

      assert.equal(toMint, accountBalance, `Failed to mint correct number of tokens to ${tokenOwner}`)
    })

    const ensureWhitelistOnly = async function () {
      const isTransferWhitelistOnly = await crypto-blizToken.isTransferWhitelistOnly.call();
      assert.isTrue(isTransferWhitelistOnly, 'TransferWhitelistOnly not activated');
    }

    const setWhitelist = async function (account, whitelist) {
      if (whitelist) {
        await crypto-blizToken.whitelistUserForTransfers(account, {
          from: owner
        })
      } else {
        await crypto-blizToken.blacklistUserForTransfers(account, {
          from: owner
        })
      }
      const isUserAllowedToTransfer = await crypto-blizToken.isUserAllowedToTransfer.call(account);
      assert.equal(whitelist, isUserAllowedToTransfer, 'Failed to set whitelist state');
    }

    describe('transfer()', function() {

      it('should fail to transfer from non-Whitelisted', async function() {
        await ensureWhitelistOnly();
        try {
          await crypto-blizToken.transfer(accounts[3], web3.utils.toWei('100', 'ether'), {
            from: tokenOwner
          });
          assert.isNotOk(true, 'Expected function to fail');
        } catch(e) {
          assert.exists(e, 'Expected error to exist from throw');
        };
      })

      it('should transfer from whiteListed', async function() {
        await ensureWhitelistOnly();
        await setWhitelist(tokenOwner, true);
        const receiver = accounts[3];
        const balance = await crypto-blizToken.balanceOf.call(receiver);

        try {
          await crypto-blizToken.transfer(receiver, web3.utils.toWei('100', 'ether'), {
            from: tokenOwner
          });

          const newBalance = await crypto-blizToken.balanceOf.call(receiver);
          assert.equal(balance.add(web3.utils.toBN(web3.utils.toWei('100', 'ether'))).toString(), newBalance.toString(), 'Wrong amount of tokens transferred to receiver');
        } catch(e) {
          assert.isNotOk(true, `Expected function to complete: ${e.message || e}`);
        };
      })
    })

    describe('transferFrom()', function() {
      const spender = accounts[4];
      const toSend = web3.utils.toWei('1000', 'ether');

      before(async function () {
        await setWhitelist(tokenOwner, false);
        await crypto-blizToken.approve(spender,toSend, {
          from: accounts[5]
        });
        const allowance = await crypto-blizToken.allowance(tokenOwner, spender);
        assert.equal(toSend, allowance, 'Wrong amount of tokens approved to spender');
      })

      it('should fail to transferFrom non-Whitelisted', async function() {
        await ensureWhitelistOnly();
        try {
          await crypto-blizToken.transferFrom(tokenOwner, accounts[3], toSend, {
            from: spender
          });
          assert.isNotOk(true, 'Expected function to fail');
        } catch(e) {
          assert.exists(e, 'Expected error to exist from throw');
        };
      })

      it('should transferFrom whiteListed', async function() {
        await ensureWhitelistOnly();
        await setWhitelist(tokenOwner, true);
        const receiver = accounts[3];
        const balance = await crypto-blizToken.balanceOf.call(receiver);

        try {
          await crypto-blizToken.transferFrom(tokenOwner, receiver, toSend, {
            from: spender
          });

          const newBalance = await crypto-blizToken.balanceOf.call(receiver);
          assert.equal(balance.add(web3.utils.toBN(toSend)).toString(), newBalance.toString(), 'Wrong amount of tokens transferred to receiver');
        } catch(e) {
          assert.isNotOk(true, `Expected function to complete: ${e.message || e}`);
        };
      })
    })

    describe.skip('approvePreSigned()', function() {
    })

    describe.skip('transferPreSigned()', function() {
    })

  });
})