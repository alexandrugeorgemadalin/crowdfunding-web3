import Link from "next/link";
import { logo } from "../assets";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { breadcrumbLinks } from "../constants";
import { useRouter } from "next/router";

const BreadCrumbElement = ({ name, isActive, handleClick, link }) => (
  <div>
    <Link
      href={link}
      className={`px-3 py-2 mx-3 mt-2 text-lg text-black transition-colors duration-300 transform rounded-[10px] ${
        isActive &&
        isActive === link &&
        "bg-gradient-to-b from-emerald-500 to-emerald-700 ring-2 ring-offset-transparent ring-black"
      } hover:bg-emerald-400`}
    >
      {name}
    </Link>
  </div>
);

export default function NavBar() {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between p-4 font-mono">
      <Link href="/">
        <Image src={logo} className="w-[150px] h-[75px] rounded-[10px]" />
      </Link>
      <div className="flex flex-row items-center">
        {breadcrumbLinks.map((link, i) => (
          <BreadCrumbElement key={i} {...link} isActive={router.asPath} />
        ))}
      </div>

      <div className="pt-4">
        <ConnectButton
          accountStatus={{ smallScreen: "address", largeScreen: "address" }}
          chainStatus="icon"
          showBalance={{ smallScreen: false, largeScreen: true }}
        />
      </div>
    </div>
  );
}
