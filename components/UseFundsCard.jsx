import { crowdfundingAbi } from "@/contract/crowdfunding_abi";
import { CROWDFUNDING_ADDRESS } from "@/contract/constants";
import { polygonMumbai } from "wagmi/chains";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "@/actions/modalAction";
import { setLoader } from "@/actions/loaderAction";

export default function UseFundsCard({ idOfCampaign }) {
  const { isDisconnected } = useAccount();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: "",
    recipientAddress: "",
    description: "",
  });

  const handleFormFieldChange = (field, e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const { data, write } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: CROWDFUNDING_ADDRESS,
    abi: crowdfundingAbi,
    functionName: "useFunds",
    chainId: polygonMumbai.id,
    onError: () => {
      dispatch(setLoader(false, ""));
    },
  });

  const transactionWait = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      dispatch(
        closeModal(
          false,
          "Successfully transfered funds from campaign to desired recipient."
        )
      );
    },
    onSettled: () => {
      dispatch(setLoader(false, ""));
    },
  });

  const handleUseFunds = (e) => {
    e.preventDefault();
    dispatch(setLoader(true, "Transaction is in progress"));
    write({
      recklesslySetUnpreparedArgs: [
        idOfCampaign,
        ethers.utils.parseEther(form.amount),
        form.description,
        ethers.utils.getAddress(form.recipientAddress),
      ],
    });
  };

  return (
    <div className="flex flex-col p-4 bg-[#13131a] rounded-[10px] h-full justify-evenly">
      <p className="font-epilogue font-semibold text-[18px] text-white uppercase leading-[30px] text-center">
        Use raised funds
      </p>
      <div className="mt-[30px] flex flex-col gap-3">
        <input
          type="number"
          placeholder="MATIC 0.1"
          step="0.01"
          className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
          onChange={(e) => handleFormFieldChange("amount", e)}
        />

        <input
          type="text"
          placeholder="Recipient address"
          className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
          onChange={(e) => handleFormFieldChange("recipientAddress", e)}
        />

        <input
          type="text"
          placeholder="Transaction description"
          className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
          onChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="my-[20px] p-4 bg-[#1c1c24] rounded-[10px]">
          <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
            Make a difference. Be transparent.
          </h4>
          <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191] text-center">
            Use the funds to achieve your goals. Your supporters now have the{" "}
            opportunity to track in a transparent way how the raised funds are
            used.
          </p>
        </div>

        {isDisconnected ? (
          <p className="font-mono font-semibold text-[14px] leading-[22px] text-white text-center">
            In order to do the transaction <br /> please connect your wallet
            first
          </p>
        ) : (
          <button
            onClick={handleUseFunds}
            className="font-mono w-full font-bold text-[18px] text-black min-h-[52px] px-4 rounded-[10px] border-[3px] border-black bg-gradient-to-b from-emerald-500 to-emerald-700"
          >
            Make Transaction
          </button>
        )}
      </div>
    </div>
  );
}
