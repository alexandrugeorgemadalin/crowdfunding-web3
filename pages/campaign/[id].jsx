import { useRouter } from "next/router";
import { CROWDFUNDING_ADDRESS } from "@/contract/constants";
import { crowdfundingAbi } from "@/contract/crowdfunding_abi";
import { polygonMumbai } from "wagmi/chains";
import { ethers } from "ethers";
import { useState } from "react";
import Loader from "@/components/Loader";
import { useContractReads, useAccount } from "wagmi";
import InfoBox from "@/components/InfoBox";
import { daysLeft, countBackers } from "@/utils";
import ProgressBar from "@/components/ProgressBar";
import DonateCard from "@/components/DonateCard";
import CampaignInfo from "@/components/CampaignInfo";
import FinishCampaignCard from "@/components/FinishCampaignCard";
import { useSelector, useDispatch } from "react-redux";
import { closeDonateModal } from "@/actions/donateModalAction";
import Modal from "@/components/Modal";
import Image from "next/image";

export default function Campaign() {
  const router = useRouter();
  const id = router.query.id;
  const [campaign, setCampaign] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [remainingDays, setRemainingDays] = useState(0);
  const [donations, setDonations] = useState([]);
  const [backers, setBackers] = useState(0);
  const { isConnected, address } = useAccount();
  const dispatch = useDispatch();

  const donateModalIsClosed = useSelector(
    (state) => state.donateModalIsClosed.donateModalIsClosed
  );

  const donateIsLoading = useSelector(
    (state) => state.donateIsLoading.donateIsLoading
  );

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
        image_url: data[0].imageURL,
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
      {donateIsLoading && <Loader message="Transaction is in progress" />}
      {!donateModalIsClosed && (
        <Modal
          message="Your support is making a meaningful difference in the lives of others."
          handleCloseModal={() => {
            dispatch(closeDonateModal(true));
          }}
        />
      )}

      <div className="flex flex-col justify-center rounded-[15px] mx-20 my-10 p-10 bg-gray-500 bg-opacity-30 backdrop-blur-lg drop-shadow-lg">
        <div className="mx-10">
          <div className="flex justify-center items-center p-[16px]">
            <h1 className="font-epilogue font-bold text-[30px] text-black">
              {campaign.title}
            </h1>
          </div>
          <div className="flex flex-col justify-center px-[150px] pt-[70px] gap-7">
            <div className="flex lg:flex-row flex-col gap-5 justify-between">
              <div className="flex flex-1 relative">
                <Image
                  src={campaign.image_url}
                  alt="campaign_image"
                  fill="responsive"
                  className="rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-5">
                <InfoBox
                  value={campaign.balance}
                  description={`Raised out of ${campaign.target}`}
                />

                <InfoBox value={remainingDays} description="Days Left" />
                <InfoBox value={backers} description="Total backers" />
                <InfoBox
                  value={campaign.donationsCount}
                  description="Donations"
                />
              </div>
            </div>

            <div>
              <ProgressBar raised={campaign.balance} target={campaign.target} />
            </div>

            <div className="flex flex-wrap lg:flex-row flex-col gap-5">
              <CampaignInfo
                description={campaign.description}
                donations={donations}
              />
              <div className="flex-1">
                <DonateCard idOfCampaign={id} />
                {/* {isConnected && address === campaign.owner && (
                <FinishCampaignCard idOfCampaign={id} />
              )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
