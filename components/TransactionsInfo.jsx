export default function TransactionsInfo({ transactions }) {
  return (
    <div className="flex flex-col p-4 bg-[#13131a] rounded-[10px] mb-[10px]">
      <p className="font-epilogue font-semibold text-[18px] text-white uppercase leading-[30px] text-center">
        transactions
      </p>

      <table className="table-auto">
        <thead>
          <tr className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
            <th>Recipient</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, i) => (
            <tr
              key={i}
              className="font-epilogue font-normal leading-[22px] text-[#808191] bg-[#1c1c24] rounded-[10px]"
            >
              <td>{transaction.recipient}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
