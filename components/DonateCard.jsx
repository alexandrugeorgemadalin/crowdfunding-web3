import { crowdfundingAbi } from "@/contract/crowdfunding_abi";
import { CROWDFUNDING_ADDRESS } from "@/contract/constants";
import { polygonMumbai } from "wagmi/chains";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@/components/Loader";
import { closeModal } from "@/actions/modalAction";

export default function DonateCard({ idOfCampaign }) {
  const { isDisconnected } = useAccount();
  const dispatch = useDispatch();

  const [donatedAmount, setDonatedAmount] = useState(0);
  const modalIsClosed = useSelector(
    (state) => state.modalIsClosed.modalIsClosed
  );

  const handleDonatedAmountInput = (event) => {
    setDonatedAmount(Number(event.target.value));
  };

  const {
    data,
    isLoading: isLoadingWrite,
    write,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: CROWDFUNDING_ADDRESS,
    abi: crowdfundingAbi,
    functionName: "donate",
    chainId: polygonMumbai.id,
  });

  const { isLoading: isLoadingTransaction } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      dispatch(closeModal(false));
    },
  });

  const handleDonate = (e) => {
    e.preventDefault();
    write({
      recklesslySetUnpreparedArgs: [idOfCampaign],
      recklesslySetUnpreparedOverrides: {
        value: ethers.utils.parseEther(donatedAmount.toString()),
      },
    });
  };

  return (
    <div className="flex flex-col p-4 bg-[#13131a] rounded-[10px] mb-[10px]">
      <div className="absolute bottom-0 left-0">
        {!modalIsClosed && (
          <Modal message="Your support is making a meaningful difference in the lives of others." />
        )}
      </div>

      {(isLoadingWrite || isLoadingTransaction) && (
        <Loader message="Transaction is in progress" />
      )}
      <p className="font-epilogue font-semibold text-[18px] text-white uppercase leading-[30px] text-center">
        Fund the campaign
      </p>
      <div className="mt-[30px]">
        <input
          type="number"
          placeholder="MATIC 0.1"
          step="0.01"
          className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
          onChange={handleDonatedAmountInput}
        />

        <div className="my-[20px] p-4 bg-[#1c1c24] rounded-[10px]">
          <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
            Empower with belief. Amplify with support.
          </h4>
          <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191] text-center">
            Support the cause unconditionally, solely because it deeply
            resonates with you.
          </p>
        </div>

        {isDisconnected ? (
          <p className="font-mono font-semibold text-[14px] leading-[22px] text-white text-center">
            In order to donate <br /> please connect your wallet first
          </p>
        ) : (
          <button
            onClick={handleDonate}
            className="font-mono w-full font-bold text-[18px] text-black min-h-[52px] px-4 rounded-[10px] border-[3px] border-black bg-gradient-to-b from-emerald-500 to-emerald-700"
          >
            Donate
          </button>
        )}
      </div>
    </div>
  );
}
