import React from "react";
import NavBar from "../Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <div>
        <NavBar />
        <main>{children}</main>
      </div>
    </>
  );
}
