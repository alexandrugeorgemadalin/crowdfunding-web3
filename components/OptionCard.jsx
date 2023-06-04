import Link from "next/link";

export default function OptionCard({
  title,
  description,
  buttonName,
  buttonHandler,
}) {
  return (
    <div className="flex flex-col max-w-[450px]">
      <div className="text-black font-bold text-[34px] text-center mb-[10px]">
        {title}
      </div>
      <div className="text-black text-[20px] text-center">{description}</div>
      <div className="flex justify-center">
        <Link
          href={buttonHandler}
          className="bg-[#FFD600] text-black font-mono font-bold text-[20px] p-2 text-center rounded-[15px] w-[200px] h-[50px] mt-[25px]
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
        >
          {buttonName}
        </Link>
      </div>
    </div>
  );
}
