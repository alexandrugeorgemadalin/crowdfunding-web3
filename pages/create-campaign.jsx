import { useAccount } from "wagmi";
import CreateCampaignForm from "@/components/create-campaign/create-campaign";

export default function CreateCampaign() {
  const { address, isConnected, isDisconnected } = useAccount();

  if (isDisconnected === true) {
    return (
      <div align="center">
        <h3>In order to use the platform, please connect your wallet first</h3>
      </div>
    );
  } else {
    return (
      <div>
        <h3 align="center">Connected with address:{address}</h3>
        <CreateCampaignForm />
      </div>
    );
  }
}
