import React from "react";
import NavBar from "../Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <div className="bg-gradient-to-t from-gray-700 to-emerald-500 to-100% min-h-screen">
        <NavBar />
        <main>{children}</main>
      </div>
    </>
  );
}
