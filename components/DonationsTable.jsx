export default function DonationsTable({ donations }) {
  return (
    <div>
      <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase mb-3">
        Donations
      </h4>
      {donations.length > 0 ? (
        <div className="overflow-y-auto h-[250px] scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="font-epilogue font-semibold  leading-[22px] text-white uppercase bg-[#1c1c24] border-b ">
                <th scope="col" className="px-6 py-3 ">
                  Donor
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, i) => (
                <tr
                  key={i}
                  className="font-epilogue text-[18px] leading-[22px] text-[#808191] bg-[#1c1c24] rounded-[10px] border-b hover:bg-neutral-900"
                >
                  <td className="px-6 py-4 ">{donation.donor}</td>
                  <td className="px-6 py-4 ">{donation.amount} MATIC</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
          No donators yet. Be the first one!
        </p>
      )}
    </div>
  );
}
