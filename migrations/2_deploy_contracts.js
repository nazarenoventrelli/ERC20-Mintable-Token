var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");
var MyKycContract = artifacts.require("KycContract.sol");

require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();
    let token = await deployer.deploy(MyToken);
    await deployer.deploy(MyKycContract);
    let tokenSale = await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, MyKycContract.address);

    let instance = await MyToken.deployed()
    await instance.addMinter(MyTokenSale.address);
}