import React from "react";
import NavBar from "../Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <div className="bg-slate-700 min-h-screen">
        <NavBar />
        <main>{children}</main>
      </div>
    </>
  );
}
