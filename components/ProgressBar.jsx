export default function ProgressBar({ raised, target }) {
  const percentage = ((raised / target) * 100).toFixed(2);
  return (
    <div className="relative flex h-6 bg-white rounded-full overflow-hidden">
      <div
        className="flex flex-col overflow-hidden bg-emerald-500"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      />
      <div className="absolute w-full flex justify-center text-black rounded-full font-mono font-bold">
        {percentage}%
      </div>
    </div>
  );
}
