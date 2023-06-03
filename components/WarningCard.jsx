export default function WarningCard() {
  return (
    <div className="flex justify-center p-4 sm:w-[288px] sm:h-[220px] w-full rounded-[15px] bg-gray-500 bg-opacity-30 backdrop-blur-lg drop-shadow-lg">
      <h3 className="font-mono font-sm font-semibold text-white text-center">
        You either are not connected or you do not have any campaigns
      </h3>
    </div>
  );
}
