import Campaign from "@/components/campaign/campaign";
import CampaignSelector from "@/components/campaign/campaign-selector";
import { useSelector } from "react-redux";

export default function Donate() {
  const indexOfCampaign = useSelector(
    (state) => state.indexOfCampaign.indexOfCampaign
  );

  return (
    <div>
      <CampaignSelector />
      {indexOfCampaign !== undefined && (
        <Campaign campaignIndex={indexOfCampaign} />
      )}
    </div>
  );
}
