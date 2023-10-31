const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Token", function () {
  let token;
  let owner;
  let attacker;
  let user;

  before(async () => {
    [owner, attacker, user] = await ethers.getSigners();

    const ERC20Token = await ethers.getContractFactory("ERC20");
    token = await ERC20Token.deploy("Test Token", "TT", 18);
    await token.deployed();
  });

  describe("Basic ERC20 Functions", function () {
    it("Should return the correct name, symbol, and decimals", async () => {
      expect(await token.name()).to.equal("Test Token");
      expect(await token.symbol()).to.equal("TT");
      expect(await token.decimals()).to.equal(18);
    });

    it("Should allow transfers and update balances correctly", async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      const transferAmount = 100;

      await token.transfer(user.address, transferAmount);
      const newOwnerBalance = await token.balanceOf(owner.address);
      const newUserBalance = await token.balanceOf(user.address);

      expect(newOwnerBalance).to.equal(initialOwnerBalance.sub(transferAmount));
      expect(newUserBalance).to.equal(transferAmount);
    });

    it("Should allow approvals and transfersFrom correctly", async () => {
      const approvalAmount = 100;

      await token.approve(user.address, approvalAmount);
      await token
        .connect(user)
        .transferFrom(owner.address, attacker.address, approvalAmount);

      const newOwnerBalance = await token.balanceOf(owner.address);
      const newAttackerBalance = await token.balanceOf(attacker.address);

      expect(newOwnerBalance).to.equal(0);
      expect(newAttackerBalance).to.equal(approvalAmount);
    });
  });

  describe("Vulnerability Testing", function () {
    it("Should not allow self-transfer", async () => {
      const initialBalance = await token.balanceOf(owner.address);

      try {
        await token.transfer(owner.address, 100); // Try to transfer to self
      } catch (error) {
        expect(error.message).to.include("ERC20: transfer to the zero address");
      }

      const newBalance = await token.balanceOf(owner.address);
      expect(newBalance).to.equal(initialBalance);
    });

    it("Should not allow minting by unauthorized addresses", async () => {
      const mintAmount = 100;
      try {
        await token.mint(attacker.address, mintAmount);
      } catch (error) {
        expect(error.message).to.include("!minter");
      }
    });

    it("Should not allow unauthorized changes to governance", async () => {
      try {
        await token.setGovernance(attacker.address);
      } catch (error) {
        expect(error.message).to.include("!governance");
      }
    });

    it("Should not allow unauthorized additions/removals of minters", async () => {
      try {
        await token.addMinter(attacker.address);
      } catch (error) {
        expect(error.message).to.include("!governance");
      }

      try {
        await token.removeMinter(attacker.address);
      } catch (error) {
        expect(error.message).to.include("!governance");
      }
    });
  });
});
