// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

enum State {
    Finished,
    Ongoing
}

struct Campaign {
    uint256 id;
    string name;
    uint256 goal;
    uint256 balance;
    address payable owner;
    uint256 donorsCount;
    State state;
    // mapping(address => uint256) donors;
}

contract Crowdfunding {
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256))
        public userDonationPerCampaign;

    uint256 public indexOfCampaigns;
    address public owner;

    // declarations of events
    event CreateCampaign(uint256 id, string name, address owner, uint256 goal);
    event Donate(uint256 _idOfCampaign, address _address, uint256 _amount);
    event FundsClaimed(uint256 _idOfCampaign, address _owner, uint256 _amount);
    event EndCampaign(uint256 _idOfCampaign, address _owner);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner of the contract");

        _;
    }

    function changeOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function createCampaign(
        string memory _nameOfCampaign,
        uint256 _goalOfCampaign
    ) public {
        campaigns[indexOfCampaigns] = Campaign({
            id: indexOfCampaigns,
            name: _nameOfCampaign,
            goal: _goalOfCampaign,
            balance: 0,
            donorsCount: 0,
            owner: payable(msg.sender),
            state: State.Ongoing
        });

        ++indexOfCampaigns;

        emit CreateCampaign(
            indexOfCampaigns - 1,
            _nameOfCampaign,
            msg.sender,
            _goalOfCampaign
        );
    }

    //write a receive function
    receive() external payable {}

    function getCampaign(
        uint256 _idOfCampaign
    ) public view returns (Campaign memory) {
        return campaigns[_idOfCampaign];
    }

    // TODO: donate
    function donate(uint256 _idOfCampaign) public payable {
        require(msg.value > 0, "Donated amount must be positive");

        Campaign storage campaign = campaigns[_idOfCampaign];

        require(campaign.state == State.Ongoing, "Campaign does not exist");

        campaign.balance += msg.value;
        ++campaign.donorsCount;

        userDonationPerCampaign[_idOfCampaign][msg.sender] += msg.value;

        (bool send, ) = address(this).call{value: msg.value}("");
        require(send, "Failed to send Ether");

        emit Donate(_idOfCampaign, msg.sender, msg.value);
    }

    function getBalanceOfContract() public view returns (uint256) {
        return address(this).balance;
    }

    function getUserDonationPerCampaign(
        uint256 _idOfCampaign,
        address _user
    ) public view returns (uint256) {
        return userDonationPerCampaign[_idOfCampaign][_user];
    }

    // TODO: claim funds
    function claimFundsFromCampaign(uint256 _idOfCampaign) public payable {
        Campaign storage campaign = campaigns[_idOfCampaign];

        require(campaign.state == State.Ongoing, "Campaign does not exist");
        require(msg.sender == campaign.owner, "Not the owner of campaign");
        require(campaign.balance > 0, "Balance of campaign is 0");

        (bool sent, ) = msg.sender.call{value: campaign.balance}("");
        require(sent, "Failed to send Ether");

        uint256 balance = campaign.balance;
        campaign.balance = 0;

        emit FundsClaimed(_idOfCampaign, msg.sender, balance);
    }

    // TODO: end campaign, claim funds, delete campaign
    function endCampaign(uint256 _idOfCampaign) public payable {
        Campaign storage campaign = campaigns[_idOfCampaign];

        require(campaign.state == State.Ongoing, "Campaign does not exist");
        require(msg.sender == campaign.owner, "Not the owner of campaign");

        if (campaign.balance > 0) {
            claimFundsFromCampaign(_idOfCampaign);
        }

        delete campaigns[_idOfCampaign];

        emit EndCampaign(_idOfCampaign, msg.sender);
    }
}
