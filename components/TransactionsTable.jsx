export default function TransactionsTable({ transactions }) {
  return (
    <div className="flex flex-col p-4 bg-[#13131a] rounded-[10px] mb-[10px] overflow-x-auto overflow-y-auto h-[700px] scrollbar">
      <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase mb-3">
        Transactions
      </h4>
      <table className="w-full text-left">
        <thead>
          <tr className="font-epilogue font-semibold  leading-[22px] text-white uppercase bg-[#1c1c24] border-b ">
            <th scope="col" className="px-6 py-3 ">
              Description
            </th>
            <th scope="col" className="px-6 py-3 ">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 ">
              Recipient
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, i) => (
            <tr
              key={i}
              className="font-epilogue text-[18px] leading-[22px] text-[#808191] bg-[#1c1c24] rounded-[10px] border-b hover:bg-neutral-900"
            >
              <td className="px-6 py-4 ">{transaction.description}</td>
              <td className="px-6 py-4 ">{transaction.amount} MATIC</td>
              <td className="px-6 py-4 ">{transaction.recipient}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
