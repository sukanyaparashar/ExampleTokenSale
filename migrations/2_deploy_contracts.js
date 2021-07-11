var ExampleToken = artifacts.require("./ExampleToken.sol");
var ExampleTokenSale= artifacts.require("./ExampleTokenSale.sol");
var ExampleKycContract = artifacts.require("./KycContract.sol");
require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(ExampleToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(ExampleKycContract);
    await deployer.deploy(ExampleTokenSale, 1, addr[0], ExampleToken.address, ExampleKycContract.address);
    let instance = await ExampleToken.deployed();
    await instance.transfer(ExampleTokenSale.address, process.env.INITIAL_TOKENS);
};