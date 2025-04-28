import React from "react";
import { Outlet } from "react-router";
import Navbar from "../navbar/NavbarContent";
import Footer from "../footer/Footer";

// max-w-3xl

export default function Layouts() {
  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto min-h-screen mt-8 ">
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
