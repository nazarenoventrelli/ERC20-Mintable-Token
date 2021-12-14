const Token = artifacts.require("MyToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;
const truffleAssert = require('truffle-assertions');
require("dotenv").config({ path: "../.env" });



contract("Token Test", async (accounts) => {

  const [deployerAccount, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    this.myToken = await Token.new();
  })

  it("It's not possible to send more tokens than account 1 has", async () => {
    let instance = this.myToken;

    await instance.transfer(recipient,3);

    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(0));
  })

  it('is possible to mint tokens for the minter role', async () => {
    let instance = this.myToken;
    await instance.mint(deployerAccount, 1);

    return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(1));
  })

  it('isn´t possible to mint tokens without the minter role', async () => {
    let instance = this.myToken;
    await instance.renounceMinter();
    await instance.mint(deployerAccount, 1);

    return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
  })


  it("I can send tokens from Account 1 to Account 2", async () => {
    let instance = this.myToken;

    await instance.mint(deployerAccount, 1);

    await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(0));
    await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(1));
    await expect(instance.transfer(recipient, 1)).to.eventually.be.fulfilled;
    await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    return await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(1));
  })


});