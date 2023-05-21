import { crowdfundingAbi } from "@/contract/crowdfunding_abi";
import { CROWDFUNDING_ADDRESS } from "@/contract/constants";
import { polygonMumbai } from "wagmi/chains";
import { ethers } from "ethers";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@/components/Loader";
import { closeModal } from "@/actions/modalAction";

export default function DonateCard({ idOfCampaign }) {
  const dispatch = useDispatch();

  const modalIsClosed = useSelector(
    (state) => state.modalIsClosed.modalIsClosed
  );

  const { config } = usePrepareContractWrite({
    address: CROWDFUNDING_ADDRESS,
    abi: crowdfundingAbi,
    functionName: "claimFundsFromCampaign",
    chainId: polygonMumbai.id,
    args: [idOfCampaign],
  });

  const { data, isLoading: isLoadingWrite, write } = useContractWrite(config);

  const { isLoading: isLoadingTransaction } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      dispatch(closeModal(false));
    },
  });

  return (
    <div className="flex flex-col p-4 bg-[#13131a] rounded-[10px]">
      {!modalIsClosed && (
        <Modal message="The funds you have claimed will be available in your wallet shortly." />
      )}
      {(isLoadingWrite || isLoadingTransaction) && (
        <Loader message="Transaction is in progress" />
      )}
      <p className="font-epilogue font-semibold text-[18px] text-white uppercase leading-[30px] text-center">
        End campaign
      </p>
      <div className="mt-[30px]">
        <div className="my-[20px] p-4 bg-[#1c1c24] rounded-[10px]">
          <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
            Complete the campaign and collect the raised funds.
          </h4>
          <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191] text-center">
            You will get 100% of the raised amount. We sincerely hope that the
            raised money will be of immense value to you and assist you in
            accomplishing your goals.
          </p>
        </div>

        <button
          onClick={() => write()}
          className="font-mono w-full font-bold text-[18px] text-black min-h-[52px] px-4 rounded-[10px] border-[3px] border-black bg-gradient-to-b from-emerald-500 to-emerald-700"
        >
          Finish campaign
        </button>
      </div>
    </div>
  );
}
