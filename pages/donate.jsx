import CampaignCard from "../components/CampaignCard";

import { useContractRead } from "wagmi";
import { CROWDFUNDING_ADDRESS } from "@/contract/constants";
import { crowdfundingAbi } from "@/contract/crowdfunding_abi";
import { polygonMumbai } from "wagmi/chains";
import { ethers } from "ethers";
import { useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import WarningCard from "@/components/WarningCard";

export default function Donate() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const contractRead = useContractRead({
    address: CROWDFUNDING_ADDRESS,
    abi: crowdfundingAbi,
    functionName: "getCampaigns",
    chainId: polygonMumbai.id,
    watch: true,
    onSuccess: (data) => {
      // parse data and keep only the name, target, deadline, balance, owner
      const campaigns = data.map((campaign, i) => {
        return {
          title: campaign.name,
          target: ethers.utils.formatEther(campaign.goal),
          deadline: campaign.deadline.toNumber(),
          balance: ethers.utils.formatEther(campaign.balance),
          owner: campaign.owner,
        };
      });
      setCampaigns(campaigns);
      setIsLoading(false);
    },
  });

  return (
    <div className="flex flex-wrap mt-[20px] mx-[200px] gap-[40px]">
      {isLoading && <Loader message="Fetching data" />}
      {campaigns.length == 0 && (
        <WarningCard message="There are no campaigns yet" />
      )}
      {campaigns.map((campaign, i) => (
        <Link href={`/campaign/${i}`} key={i}>
          <CampaignCard key={i} {...campaign} />
        </Link>
      ))}
    </div>
  );
}
