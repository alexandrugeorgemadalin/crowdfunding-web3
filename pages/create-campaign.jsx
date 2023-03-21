import { useAccount } from "wagmi";
import CreateCampaignForm from "@/components/create-campaign/create-campaign";

export default function CreateCampaign() {
  const { address, isConnected, isDisconnected } = useAccount();
  if (isDisconnected === true) {
    return (
      <div>
        <h2>In order to create a new campaign, please connect first</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Connected with address:{address}</h2>
        <CreateCampaignForm />
      </div>
    );
  }
}
