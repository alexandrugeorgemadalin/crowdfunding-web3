export default function WarningCard({ message }) {
  return (
    <div className="flex justify-center mt-[100px]">
      <h3 className="font-semibold text-black text-center text-[30px]">
        {message}
      </h3>
    </div>
  );
}
