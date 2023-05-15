import Link from "next/link";
import { logo } from "../assets";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { breadcrumbLinks } from "../constants";

const BreadCrumbElement = ({ name, isActive, handleClick, link }) => (
  <div onClick={handleClick}>
    <Link
      href={link}
      className={`px-3 py-2 mx-3 mt-2 text-lg text-emerald-500 transition-colors duration-300 transform rounded-[10px] ${
        isActive &&
        isActive === name &&
        "bg-slate-500 ring-2 ring-offset-transparent ring-emerald-500"
      } hover:bg-slate-500`}
    >
      {name}
    </Link>
  </div>
);

export default function NavBar() {
  const [isActive, setIsActive] = useState("Home");

  return (
    <div className="flex flex-row justify-between p-4 font-mono">
      <Link
        href="/"
        onClick={() => {
          setIsActive("Home");
        }}
      >
        <Image
          src={logo}
          className="w-[150px] h-[75px] bg-slate-500 rounded-[10px]"
        />
      </Link>
      <div className="flex flex-row items-center">
        {breadcrumbLinks.map((link, i) => (
          <BreadCrumbElement
            key={i}
            {...link}
            isActive={isActive}
            handleClick={() => {
              setIsActive(link.name);
            }}
          />
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
