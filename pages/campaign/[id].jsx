import { useRouter } from "next/router";
import { CROWDFUNDING_ADDRESS } from "@/contract/constants";
import { crowdfundingAbi } from "@/contract/crowdfunding_abi";
import { polygonMumbai } from "wagmi/chains";
import { ethers } from "ethers";
import { useState } from "react";
import Loader from "@/components/Loader";
import { useContractReads } from "wagmi";
import InfoBox from "@/components/InfoBox";
import { daysLeft, countBackers } from "@/utils";
import ProgressBar from "@/components/ProgressBar";
import DonateCard from "@/components/DonateCard";
import CampaignInfo from "@/components/CampaignInfo";

export default function Campaign() {
  const router = useRouter();
  const id = router.query.id;
  const [campaign, setCampaign] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [remainingDays, setRemainingDays] = useState(0);
  const [donations, setDonations] = useState([]);
  const [backers, setBackers] = useState(0);

  const readFromContract = useContractReads({
    contracts: [
      {
        address: CROWDFUNDING_ADDRESS,
        abi: crowdfundingAbi,
        chainId: polygonMumbai.id,
        functionName: "campaigns",
        args: [id],
      },
      {
        address: CROWDFUNDING_ADDRESS,
        abi: crowdfundingAbi,
        chainId: polygonMumbai.id,
        functionName: "getDonationsPerCampaign",
        args: [id],
      },
    ],
    watch: true,
    onSuccess: (data) => {
      setCampaign({
        title: data[0].name,
        target: ethers.utils.formatEther(data[0].goal),
        deadline: data[0].deadline.toNumber(),
        balance: ethers.utils.formatEther(data[0].balance),
        owner: data[0].owner,
        donationsCount: data[0].donationsCount.toString(),
        description: data[0].description,
      });
      setRemainingDays(daysLeft(data[0].deadline.toNumber()));

      setDonations(
        data[1].map((donation) => {
          return {
            amount: ethers.utils.formatEther(donation[0]),
            donor: donation[1],
          };
        })
      );
      setBackers(countBackers(data[1]));
      setIsLoading(false);
    },
  });

  return (
    <div>
      {isLoading && <Loader message="Fetching campaign data" />}
      <div className="flex flex-col justify-center rounded-[15px] mx-20 my-10 p-10 bg-gray-500 bg-opacity-30 backdrop-blur-lg drop-shadow-lg">
        <div className="flex justify-center items-center p-[16px]">
          <h1 className="font-epilogue font-bold text-[30px] text-black">
            {campaign.title}
          </h1>
        </div>

        <div className="flex flex-col justify-center px-[150px] pt-[70px] gap-10">
          <div className="flex flex-row justify-center gap-10">
            <div className="flex">
              <InfoBox
                value={campaign.balance}
                description={`Raised out of ${campaign.target}`}
              />
            </div>

            <div className="flex flex-col gap-10 ">
              <div>
                <ProgressBar
                  raised={campaign.balance}
                  target={campaign.target}
                />
              </div>
              <div className="flex flex-row justify-around gap-10">
                <InfoBox value={remainingDays} description="Days Left" />
                <InfoBox value={backers} description="Total backers" />
                <InfoBox
                  value={campaign.donationsCount}
                  description="Donations"
                />
              </div>
            </div>
          </div>
          <div className="mt-[20px] flex flex-wrap lg:flex-row flex-col gap-5">
            <CampaignInfo
              description={campaign.description}
              donations={donations}
            />
            <div className="flex-1">
              <DonateCard idOfCampaign={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
