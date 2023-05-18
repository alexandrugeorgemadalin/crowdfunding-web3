import FormField from "../components/FormField";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { CROWDFUNDING_ADDRESS } from "@/contract/constants";
import { crowdfundingAbi } from "@/contract/crowdfunding_abi";
import { polygonMumbai } from "wagmi/chains";
import { ethers } from "ethers";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/actions/modalAction";

export default function CreateCampaign() {
  const dispatch = useDispatch();

  const { isDisconnected } = useAccount();
  const modalIsClosed = useSelector(
    (state) => state.modalIsClosed.modalIsClosed
  );
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
  });

  const {
    data,
    isLoading: isLoadingWrite,
    write,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: CROWDFUNDING_ADDRESS,
    abi: crowdfundingAbi,
    functionName: "createCampaign",
    chainId: polygonMumbai.id,
  });

  const { isLoading: isLoadingTransaction, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      dispatch(closeModal(false));
    },
  });

  const handleFormFieldChange = (field, e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    write({
      recklesslySetUnpreparedArgs: [
        form.title,
        ethers.utils.parseEther(form.target),
        new Date(form.deadline).getTime(),
        form.description,
      ],
    });
  };

  return (
    <div className="flex flex-col justify-center bg-neutral-500/70 rounded-[10px] mx-20 my-10 p-5">
      {!modalIsClosed && <Modal />}
      {(isLoadingWrite || isLoadingTransaction) && <Loader />}
      <div className="flex justify-center items-center p-[16px] rounded-[10px]">
        <h1 className="font-mono font-bold text-[22px] leading-[38px] text-black">
          Start a campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-[30px] gap-[15px] w-full"
      >
        <FormField
          labelName="Campaign Title*"
          placeholder="Name of campaign"
          inputType="text"
          value={form.value}
          handleChange={(e) => handleFormFieldChange("title", e)}
        />

        <FormField
          labelName="Story*"
          placeholder="Write your story"
          isTextArea={true}
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal*"
            placeholder="MATIC 1.00"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />

          <FormField
            labelName="End Date*"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          {isDisconnected ? (
            <h1 className="font-mono font-semibold p-2">
              In order to create a campaign, you need to connect your wallet
            </h1>
          ) : (
            <button
              className="font-mono font-bold text-[18px] text-black min-h-[52px] px-4 rounded-[10px] border-[3px] bg-transparent hover:border-black hover:bg-gradient-to-b hover:from-emerald-500 hover:to-emerald-700"
              type="submit"
            >
              Submit new campaign
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
