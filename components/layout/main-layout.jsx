import React from "react";
import Header from "@/components/header/header";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
