import { crowdfundingAbi } from "@/contract/crowdfunding_abi";
import { CROWDFUNDING_ADDRESS } from "@/contract/constants";
import { polygonMumbai } from "wagmi/chains";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useDispatch } from "react-redux";
import { closeModal } from "@/actions/modalAction";
import { setLoader } from "@/actions/loaderAction";

export default function FinishCampaignCard({ idOfCampaign }) {
  const dispatch = useDispatch();

  const { data, write } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: CROWDFUNDING_ADDRESS,
    abi: crowdfundingAbi,
    functionName: "endCampaign",
    chainId: polygonMumbai.id,
    onError: () => {
      console.log("error");
      console.log(data);
      dispatch(setLoader(false, ""));
    },
  });

  const transactionWait = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      dispatch(
        closeModal(
          false,
          "Your campaign has been successfully completed. You can use the funds now."
        )
      );
    },
    onSettled: () => {
      dispatch(setLoader(false, ""));
    },
  });

  const handleFinishCampaign = (e) => {
    e.preventDefault();
    dispatch(setLoader(true, "Transaction is in progress"));
    write({
      recklesslySetUnpreparedArgs: [idOfCampaign],
    });
  };

  return (
    <div className="flex flex-col p-4 bg-[#13131a] rounded-[10px]">
      <p className="font-epilogue font-semibold text-[18px] text-white uppercase leading-[30px] text-center">
        End campaign
      </p>
      <div className="mt-[30px]">
        <div className="my-[20px] p-4 bg-[#1c1c24] rounded-[10px]">
          <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
            Complete the campaign and use the raised funds.
          </h4>
          <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191] text-center">
            You will get 100% of the raised amount. We sincerely hope that the
            raised money will be of immense value to you and assist you in
            accomplishing your goals.
          </p>
        </div>

        <button
          onClick={handleFinishCampaign}
          className="font-mono w-full font-bold text-[18px] text-black min-h-[52px] px-4 rounded-[10px] border-[3px] border-black bg-gradient-to-b from-emerald-500 to-emerald-700"
        >
          Finish campaign
        </button>
      </div>
    </div>
  );
}
