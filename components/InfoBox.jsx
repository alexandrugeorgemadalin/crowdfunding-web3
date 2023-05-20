export default function InfoBox({ value, description }) {
  return (
    <div className="flex flex-col items-center w-[200px] bg-white rounded-[15px]">
      <h1 className="flex justify-center font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full h-full truncate">
        {value}
      </h1>
      <p className="flex justify-center font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] p-3 w-full h-full text-center">
        {description}
      </p>
    </div>
  );
}
