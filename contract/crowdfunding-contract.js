import { crowdfundingAbi } from "./crowdfunding_abi";
import { useContractRead } from "wagmi";
import { CROWDFUNDING_ADDRESS } from "./constants";

export function getIndexOfCampaign() {
  const response = useContractRead({
    abi: crowdfundingAbi,
    address: CROWDFUNDING_ADDRESS,
    functionName: "indexOfCampaigns",
  });

  return response;
}
