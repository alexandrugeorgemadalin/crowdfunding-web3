import { useDispatch } from "react-redux";
import styles from "./campaign-selector.module.css";
import { campaignSelector } from "@/actions/campaignSelectorAction";
import { useState } from "react";

export default function CampaignSelector() {
  const dispatch = useDispatch();

  const [campaignIndex, setCampaignIndex] = useState("");

  const handleCampaignInput = (event) => {
    setCampaignIndex(event.target.value);
  };

  const handleCampaignButton = () => {
    dispatch(
      campaignSelector(
        campaignIndex === "" ? undefined : parseInt(campaignIndex)
      )
    );
  };

  return (
    <div className={styles.selector}>
      <input
        className={styles.input}
        type="number"
        step="1"
        id="indexOfCampaign"
        name="indexOfCampaign"
        placeholder="Index of campaign"
        onChange={handleCampaignInput}
      ></input>
      <button className={styles.button} onClick={handleCampaignButton}>
        Select
      </button>
    </div>
  );
}
