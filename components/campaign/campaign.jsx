import styles from "./campaign.module.css";
import { useContractRead } from "wagmi";
import { crowdfundingAbi } from "@/contract/crowdfunding_abi";
import { CROWDFUNDING_ADDRESS } from "@/contract/constants";
import { polygonMumbai } from "wagmi/chains";
import { ethers } from "ethers";
import { useAccount, useContractWrite } from "wagmi";
import { useState } from "react";

export default function Campaign({ campaignIndex }) {
  const { isConnected, isDisconnected } = useAccount();

  const [donatedAmount, setDonatedAmount] = useState(0);

  const handleDonatedAmountInput = (event) => {
    setDonatedAmount(Number(event.target.value));
  };

  const { data: campaignData } = useContractRead({
    abi: crowdfundingAbi,
    address: CROWDFUNDING_ADDRESS,
    functionName: "campaigns",
    args: [campaignIndex],
    chainId: polygonMumbai.id,
    watch: true,
  });

  const {
    data: donateData,
    isLoading: donateIsLoading,
    isSuccess: donateIsSuccess,
    write: donateWrite,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: CROWDFUNDING_ADDRESS,
    abi: crowdfundingAbi,
    functionName: "donate",
    chainId: polygonMumbai.id,
  });

  const handleDonateButton = () => {
    donateWrite({
      recklesslySetUnpreparedArgs: [campaignIndex],
      recklesslySetUnpreparedOverrides: {
        value: ethers.utils.parseEther(donatedAmount.toString()),
      },
    });
  };

  if (campaignData === undefined || campaignData.state === 0) {
    return (
      <div>
        <p> Campaign does not exists! </p>
      </div>
    );
  } else {
    return (
      <div className={styles.card}>
        <div className={styles.header}>Campaign Name</div>
        <div className={styles.body}>
          <div className={styles.field}>
            <div className={styles.field_key}>ID</div>
            <div className={styles.field_value}>
              {parseInt(campaignData.id)}
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.field_key}>Name</div>
            <div className={styles.field_value}>{campaignData.name}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.field_key}>Goal</div>
            <div className={styles.field_value}>
              {campaignData.goal.toNumber()}
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.field_key}>Balance</div>
            <div className={styles.field_value}>
              {ethers.utils.formatEther(campaignData.balance)}
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.field_key}>Owner</div>
            <div className={styles.field_value}>{campaignData.owner}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.field_key}>Donors count</div>
            <div className={styles.field_value}>
              {campaignData.donorsCount.toNumber()}
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.field_key}>State</div>
            <div className={styles.field_value}>
              {campaignData.state ? "Open" : "Closed"}
            </div>
          </div>
          {isDisconnected && (
            <h2>In order to donate, please connect wallet first</h2>
          )}

          {isConnected && (
            <div className={styles.donate}>
              <input
                className={styles.input}
                type="number"
                step="0.001"
                id="donatedAmount"
                name="donatedAmount"
                placeholder="Amount (MATIC)"
                onChange={handleDonatedAmountInput}
              ></input>
              <button className={styles.button} onClick={handleDonateButton}>
                Donate
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
