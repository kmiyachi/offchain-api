const Access = artifacts.require("Access");
const SafeMath = artifacts.require("SafeMath");
const SysAdmin = artifacts.require("SysAdmin")
const Organizations = artifacts.require("Organization");
const Members = artifacts.require("Member");
const Researchers = artifacts.require("Researcher");
//const externalDB = artifacts.require("externalDB");

module.exports = function(deployer) {
  deployer.deploy(Access);
  deployer.deploy(SafeMath);
  deployer.deploy(SysAdmin);
};
