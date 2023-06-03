export default function StoryCard({ description }) {
  return (
    <div className="bg-[#1c1c24] p-3 rounded-[15px]">
      <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
        Story
      </h4>
      <div className="mt-[20px]">
        <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify overflow-y-auto h-[270px] scrollbar">
          {description}
        </p>
      </div>
    </div>
  );
}
