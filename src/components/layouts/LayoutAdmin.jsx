import React from "react";
import { Outlet } from "react-router";

export default function LayoutAdmin() {
  return (
    <div className="min-h-screen mx-auto">
      <Outlet />
    </div>
  );
}
