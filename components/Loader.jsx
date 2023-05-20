import { loader } from "../assets";
import Image from "next/image";

export default function Loader({ message }) {
  return (
    <div className="fixed inset-0 min-w-full min-h-full z-10  bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <Image
        src={loader}
        alt="loader"
        className="w-[100px] h-[100px] object-contain"
      />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        {message} <br /> Please wait...
      </p>
    </div>
  );
}
