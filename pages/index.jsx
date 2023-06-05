import OptionCard from "@/components/OptionCard";
import { platformSteps } from "/constants";
import { useState } from "react";

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="flex flex-row justify-center mt-[20px]">
      <div className="flex flex-col">
        <div className="text-center text-[120px] font-sans -mb-[25px] font-bold">
          Welcome
        </div>
        <div className="text-center text-[25px] font-sans font-semibold">
          Driving Social Impact through Decentralized Giving
        </div>
        <div className="flex flex-row justify-around mt-[100px]">
          <OptionCard
            title="Start a campaign"
            description="Take the first step towards making a difference by creating your own impactful campaign"
            buttonName="Create Campaign"
            buttonHandler="/create-campaign"
          />
          <OptionCard
            title="Support a campaign"
            description="Stand behind campaigns, drive change, create a brighter future"
            buttonName="Donate"
            buttonHandler="/donate"
          />
        </div>
        <div className="flex justify-center mt-[50px]">
          <div className="flex flex-col justify-center mt-[100px] bg-gray-500 rounded-[15px] bg-opacity-30 backdrop-blur-lg drop-shadow-lg max-w-6xl p-5">
            <h1 className="text-black text-center text-[45px] font-bold font-sans mb-[30px]">
              How it works
            </h1>
            <p className="text-center font-semibold text-[20px]">
              We make it possible for anyone to raise funds to support their
              causes.
            </p>
            <p className="text-center text-[20px]">
              We unlock the potential of crowdfunding with our seamless campaign
              creation and donating process, secure blockchain technology, and
              transparent progress tracking.
            </p>
            <p className="text-center font-semibold text-[23px] mt-[20px] mb-[20px]">
              Your focus is on inspiring others and driving real change.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-0 h-0 border-l-[100px] border-l-transparent border-t-[120px] border-t-[#FFD600] border-r-[100px] border-r-transparent -translate-y-5"></div>
        </div>
        <div className="flex justify-center mt-[40px] mb-[100px] divide-x divide-[#FFD600] mx-[200px]">
          <div className="flex flex-col text-black font-semibold font-mono text-[25px] gap-5 basis-1/2 leading-7">
            {platformSteps.map((step, i) => (
              <div
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveStep(i);
                }}
                className={`flex cursor-pointer ${
                  i === activeStep && "text-[#FFD600]"
                }`}
              >
                {i + 1}. {step.title}
              </div>
            ))}
          </div>
          <div className="flex flex-col basis-1/2 gap-5">
            <div className="flex font-semibold font-mono text-[30px] ml-[30px] leading-7 text-[#FFD600]">
              {activeStep + 1}. {platformSteps[activeStep].title}
            </div>
            <div className="flex ml-[30px] text-black text-[20px] font-mono leading-5 italic">
              {platformSteps[activeStep].description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
