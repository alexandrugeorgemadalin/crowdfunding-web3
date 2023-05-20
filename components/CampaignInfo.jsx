export default function CampaignInfo({ description, donations }) {
  return (
    <div className="flex-[2] flex flex-col gap-[40px] bg-[#13131a] p-3 rounded-[15px]">
      <div className="bg-[#1c1c24] p-3 rounded-[15px]">
        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
          Story
        </h4>
        <div className="mt-[20px]">
          <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
            {description}
          </p>
        </div>
      </div>
      <div>
        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
          Donations
        </h4>
        <div className="mt-[20px] flex flex-col gap-4">
          {donations.length > 0 ? (
            donations.map((donation, i) => (
              <div key={i} className="flex justify-between items-center gap-4">
                <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                  {i + 1}. {donation.donor}
                </p>
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                  {donation.amount} MATIC
                </p>
              </div>
            ))
          ) : (
            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
              No donators yet. Be the first one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
