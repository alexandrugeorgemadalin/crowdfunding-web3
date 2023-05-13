import styles from "./create-campaign.module.css";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";
import { crowdfundingAbi } from "@/contract/crowdfunding_abi";
import { CROWDFUNDING_ADDRESS } from "@/contract/constants";
import { polygonMumbai } from "wagmi/chains";
import { ethers } from "ethers";

export default function CreateCampaignForm() {
  const [campaignName, setCampaignName] = useState("");
  const [campaignGoal, setCampaignGoal] = useState(0);

  const handleCampaignNameInput = (event) => {
    setCampaignName(event.target.value);
  };

  const handleCampaignGoalInput = (event) => {
    setCampaignGoal(Number(event.target.value));
  };

  const {
    data: campaignData,
    isLoading: campaignIsLoading,
    isSuccess: campaignIsSuccess,
    write: createCampaignWrite,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: CROWDFUNDING_ADDRESS,
    abi: crowdfundingAbi,
    functionName: "createCampaign",
    chainId: polygonMumbai.id,
    onSuccess() {
      console.log("Campaign created: ", campaignData);
    },
  });

  const handleCreateCampaignButton = () => {
    createCampaignWrite({
      recklesslySetUnpreparedArgs: [
        campaignName,
        ethers.utils.parseEther(campaignGoal.toString()),
      ],
    });
  };

  return (
    <div>
      <div className={styles.form}>
        <p className={styles.heading}>Create new campaign</p>
        <input
          className={styles.input}
          placeholder="Campaign name"
          type="text"
          id="campaign-name"
          name="campaign-name"
          onChange={handleCampaignNameInput}
        />
        <input
          className={styles.input}
          placeholder="Campaign goal (in MATIC)"
          type="number"
          step="0.01"
          id="campaign-goal"
          name="campaign-goal"
          onChange={handleCampaignGoalInput}
        />
        <button className={styles.btn} onClick={handleCreateCampaignButton}>
          Create
        </button>
      </div>
      {campaignIsSuccess && (
        <div> Campaign created: {JSON.stringify(campaignData)}</div>
      )}
    </div>
  );
}
