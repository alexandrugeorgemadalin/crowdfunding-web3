import { daysLeft } from "@/utils";

export default function CampaignCard({
  title,
  target,
  deadline,
  balance,
  owner,
}) {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="sm:w-[288px] sm:h-[220px] w-full rounded-[15px] bg-gray-500 cursor-pointer
      transition ease-in-out delay-150 bg-opacity-30 backdrop-blur-lg drop-shadow-lg
      hover:-translate-y-6 hover:scale-110 hover:bg-gradient-to-b hover:from-emerald-500
      hover:to-emerald-700 duration-300"
    >
      <div className="flex flex-col p-4">
        <h3 className="font-mono font-sm font-semibold text-white text-center">
          {title}
        </h3>
        <div className="flex flex-wrap flex-row justify-between mt-[15px] gap-2">
          <div className="flex flex-col">
            <h1 className="font-mono font-semibold font-sm truncate">
              {balance}
            </h1>
            <p className="font-sm text-[15px] truncate mt-[3px]">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-mono font-semibold">{remainingDays}</h1>
            <p className="text-[15px]">Days Left</p>
          </div>
        </div>
        <p className="font-sm truncate mt-5">by {owner}</p>
      </div>
    </div>
  );
}
