import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ArrowLeftEndOnRectangleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import Swal from "sweetalert2";

const menus = ["User", "Message", "logout"];

function LayoutDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //   localStorage.getItem("token");
  //   localStorage.getItem("role");
  //   localStorage.getItem("userId");
  const username = localStorage.getItem("usernameAdmin");

  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Logout",
      text: "Apakah anda ingin logout?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/v1";
      }
    });
  };

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 px-3 py-4 overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <ul className="space-y-2 font-medium">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="ms-3 font-poppins text-xl text-white font-bold"
          >
            Feessage Dasboard
          </button>
          <ul>
            <li>
              {menus.map((menu, index) => (
                <div
                  key={index}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  //   to={`/v1/${menu.toLowerCase() === "logout" ? "" : menu.toLowerCase()}`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {menu === "logout" ? (
                    <button
                      className="ms-3 font-poppins text-base font-bold"
                      onClick={menu === "logout" ? handleLogout : null}
                    >
                      {menu}
                    </button>
                  ) : (
                    <Link
                      to={`/v1/${menu.toLowerCase()}`}
                      className="ms-3 font-poppins text-base font-bold w-full"
                    >
                      {menu}
                    </Link>
                  )}
                </div>
              ))}
            </li>
          </ul>
        </ul>
      </aside>

      {/* KONTEN + HEADER */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow sm:justify-end">
          {/* Tombol hamburger untuk mobile */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {/* <span className="sr-only">Open sidebar</span> */}
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          {/* Nama dan menu kanan */}
          <div className="flex items-center gap-2">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm font-semibold text-black shadow-inner focus:outline-none">
                {username}
                <ChevronDownIcon className="size-4 fill-slate-700" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border bg-gray-800 p-1 text-sm text-white shadow-lg"
              >
                {/* <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10">
                    <PencilIcon className="size-4 fill-white/30" />
                    Edit
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10">
                    <Square2StackIcon className="size-4 fill-white/30" />
                    Duplicate
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10">
                    <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
                    Archive
                  </button>
                </MenuItem> */}
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10"
                  >
                    <ArrowLeftEndOnRectangleIcon className="size-4 fill-white/30" />
                    Log Out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>

        {/* Main content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default LayoutDashboard;
