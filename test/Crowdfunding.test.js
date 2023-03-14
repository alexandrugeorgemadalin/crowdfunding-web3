const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowdfunding", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCrowdfundingFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();

    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    const crowdfunding = await Crowdfunding.deploy();

    return { crowdfunding, owner, account1, account2 };
  }

  describe("Deployment", () => {
    it("Contract should have the owner", async () => {
      const { crowdfunding, owner } = await loadFixture(
        deployCrowdfundingFixture
      );

      const ownerOfContract = await crowdfunding.owner();

      expect(ownerOfContract).to.equal(owner.address);
    });

    it("Should change the owner", async () => {
      const { crowdfunding, owner, account1 } = await loadFixture(
        deployCrowdfundingFixture
      );

      await crowdfunding.changeOwner(account1.address);

      expect(await crowdfunding.owner()).to.be.equal(account1.address);
    });

    it("Only owner can change the owner", async () => {
      const { crowdfunding, owner, account1 } = await loadFixture(
        deployCrowdfundingFixture
      );

      await expect(
        crowdfunding.connect(account1).changeOwner(account1.address)
      ).to.be.revertedWith("Not the owner of the contract");
    });
  });

  describe("Campaigns", () => {
    it("Should create new campaign", async () => {
      const { crowdfunding, owner, account1 } = await loadFixture(
        deployCrowdfundingFixture
      );

      await crowdfunding
        .connect(account1)
        .createCampaign("Test campaign", ethers.utils.parseEther("10"));

      const campaign = await crowdfunding.getCampaign(0);
      expect(campaign.id).to.be.equal(0);
      expect(campaign.name).to.be.equal("Test campaign");
      expect(campaign.goal).to.be.equal(ethers.utils.parseEther("10"));
      expect(campaign.balance).to.be.equal(0);
      expect(campaign.owner).to.be.equal(account1.address);
      expect(campaign.donorsCount).to.be.equal(0);
      expect(campaign.exists).to.be.equal(true);
    });

    it("Should add new campaign to existing ones", async () => {
      const { crowdfunding, owner, account1, account2 } = await loadFixture(
        deployCrowdfundingFixture
      );

      crowdfunding
        .connect(account1)
        .createCampaign("Test campaign", ethers.utils.parseEther("10"));

      await expect(
        crowdfunding
          .connect(account2)
          .createCampaign("New campaign", ethers.utils.parseEther("2"))
      )
        .emit(crowdfunding, "CreateCampaign")
        .withArgs(
          1,
          "New campaign",
          account2.address,
          ethers.utils.parseEther("2")
        );
      const campaign = await crowdfunding.getCampaign(1);
      expect(campaign.id).to.be.equal(1);
      expect(campaign.name).to.be.equal("New campaign");
      expect(campaign.goal).to.be.equal(ethers.utils.parseEther("2"));
      expect(campaign.balance).to.be.equal(0);
      expect(campaign.owner).to.be.equal(account2.address);
      expect(campaign.donorsCount).to.be.equal(0);
      expect(campaign.exists).to.be.equal(true);
    });

    it("Contract can receive ethers", async () => {
      const { crowdfunding, owner, account1, account2 } = await loadFixture(
        deployCrowdfundingFixture
      );

      let transaction = await account1.sendTransaction({
        to: crowdfunding.address,
        value: ethers.utils.parseEther("2"),
      });

      expect(await crowdfunding.getBalanceOfContract()).to.be.equals(
        ethers.utils.parseEther("2")
      );
    });

    it("Donate to specific campaign", async () => {
      const { crowdfunding, owner, account1, account2 } = await loadFixture(
        deployCrowdfundingFixture
      );

      crowdfunding
        .connect(account1)
        .createCampaign("Test campaign", ethers.utils.parseEther("10"));

      await crowdfunding
        .connect(account2)
        .donate(0, { value: ethers.utils.parseEther("1") });

      const campaing = await crowdfunding.getCampaign(0);
      expect(campaing.balance).to.be.equal(ethers.utils.parseEther("1"));
      expect(campaing.donorsCount).to.be.equal(1);
      expect(await crowdfunding.getBalanceOfContract()).to.be.equal(
        ethers.utils.parseEther("1")
      );

      const donationPerCampaign = await crowdfunding.getUserDonationPerCampaign(
        0,
        account2.address
      );
      expect(donationPerCampaign).to.be.equal(ethers.utils.parseEther("1"));
    });

    it("Owner can claim funds from campaign", async () => {
      const { crowdfunding, owner, account1, account2 } = await loadFixture(
        deployCrowdfundingFixture
      );

      crowdfunding
        .connect(account1)
        .createCampaign("Test campaign", ethers.utils.parseEther("10"));

      await crowdfunding
        .connect(account2)
        .donate(0, { value: ethers.utils.parseEther("1") });

      const balanceOfAccountBeforeClaim = await ethers.provider.getBalance(
        account1.address
      );
      const balanceOfContractBeforeClaim =
        await crowdfunding.getBalanceOfContract();

      await crowdfunding.connect(account1).claimFundsFromCampaign(0);

      const campaing = await crowdfunding.getCampaign(0);
      expect(campaing.balance).to.be.equal(0);

      const balanceOfAccountAfterClaim = await ethers.provider.getBalance(
        account1.address
      );
      expect(balanceOfAccountAfterClaim).to.be.greaterThan(
        balanceOfAccountBeforeClaim
      );
      console.log(
        `Balance of account before claim: ${balanceOfAccountBeforeClaim}`
      );
      console.log(
        `Balance of account after claim: ${balanceOfAccountAfterClaim}`
      );

      expect(await crowdfunding.getBalanceOfContract()).to.be.equal(
        balanceOfContractBeforeClaim - ethers.utils.parseEther("1")
      );
    });

    it("Only the owner can claim the funds from campaign", async () => {
      const { crowdfunding, owner, account1, account2 } = await loadFixture(
        deployCrowdfundingFixture
      );

      crowdfunding
        .connect(account1)
        .createCampaign("Test campaign", ethers.utils.parseEther("10"));

      await crowdfunding
        .connect(account2)
        .donate(0, { value: ethers.utils.parseEther("1") });

      await expect(
        crowdfunding.connect(account2).claimFundsFromCampaign(0)
      ).to.be.revertedWith("Not the owner of campaign");
    });

    it("Can not claim funds from campaign with balance 0", async () => {
      const { crowdfunding, owner, account1, account2 } = await loadFixture(
        deployCrowdfundingFixture
      );

      crowdfunding
        .connect(account1)
        .createCampaign("Test campaign", ethers.utils.parseEther("10"));

      await expect(
        crowdfunding.connect(account1).claimFundsFromCampaign(0)
      ).to.be.revertedWith("Balance of campaign is 0");
    });
  });

  describe("Events", () => {
    it("Donate should emit event", async () => {
      const { crowdfunding, owner, account1, account2 } = await loadFixture(
        deployCrowdfundingFixture
      );

      crowdfunding
        .connect(account1)
        .createCampaign("Test campaign", ethers.utils.parseEther("10"));

      await expect(
        crowdfunding
          .connect(account1)
          .donate(0, { value: ethers.utils.parseEther("1") })
      )
        .emit(crowdfunding, "Donate")
        .withArgs(0, account1.address, ethers.utils.parseEther("1"));
    });

    it("Should emit event when creating a new campaign", async () => {
      const { crowdfunding, owner, account1 } = await loadFixture(
        deployCrowdfundingFixture
      );

      await expect(
        crowdfunding
          .connect(account1)
          .createCampaign("Test campaign", ethers.utils.parseEther("10"))
      )
        .emit(crowdfunding, "CreateCampaign")
        .withArgs(
          0,
          "Test campaign",
          account1.address,
          ethers.utils.parseEther("10")
        );
    });

    it("Should emit event when claiming funds from campaign", async () => {
      const { crowdfunding, owner, account1, account2 } = await loadFixture(
        deployCrowdfundingFixture
      );

      crowdfunding
        .connect(account1)
        .createCampaign("Test campaign", ethers.utils.parseEther("10"));

      await crowdfunding
        .connect(account2)
        .donate(0, { value: ethers.utils.parseEther("1") });

      await expect(crowdfunding.connect(account1).claimFundsFromCampaign(0))
        .emit(crowdfunding, "FundsClaimed")
        .withArgs(0, account1.address, ethers.utils.parseEther("1"));
    });
  });

  describe("Transfers", () => {});
});
