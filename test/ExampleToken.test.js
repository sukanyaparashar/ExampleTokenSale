const Token = artifacts.require("ExampleToken");
require("dotenv").config({path: "../.env"});

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Token Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async () => {
        this.exampleToken = await Token.new(process.env.INITIAL_TOKENS);
    });

    it("all tokens should be in my account", async () => {
        let instance = this.exampleToken;
        let totalSupply = await instance.totalSupply();
        //let balance = await instance.balanceOf(account[0]);
        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("is possible to send tokens between accounts", async () => {
        const sendTokens = 1;
        let instance = this.exampleToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("is not possible to send more tokens than available in total", async () => {
        let instance = this.exampleToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
        await expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });
});