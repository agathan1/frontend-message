import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  Bars3Icon,
  ChevronDownIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import Swal from "sweetalert2";

const menus = ["Send", "Search"];
const subMenus = [{ name: "Logout" }];

export default function NavbarContent() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const username = localStorage.getItem("username");
  useEffect(() => {
    setTimeout(() => {
      const userRole = localStorage.getItem("role");
      setRole(userRole);
      // console.log("userRole", userRole);
    }, 2000);
  }, []);

  // role === "user" ? menus.push("History") : null;
  if (
    (!menus.find((menu) => menu === "History") && role === "user") ||
    role === "admin"
  ) {
    menus.push("History");
  }

  const handleLogut = () => {
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
        navigate("/");
        localStorage.clear();
      }
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white border-gray-200 border-b-2">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link
              className="self-center font-poppins text-2xl font-semibold whitespace-nowrap text-secondary"
              to="/"
            >
              Fessaage
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              {/* <span className="sr-only">Open main menu</span> */}
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            {menus.map((menu) => (
              <Link
                key={menu}
                to={`/${menu}`}
                className="text-sm/6 font-semibold text-secondary font-poppins"
              >
                {menu}
              </Link>
            ))}
            <Menu className="relative">
              {!username ? (
                <NavLink
                  to="/Login"
                  className="text-sm/6 font-semibold text-gray-900 font-poppins"
                >
                  Login
                </NavLink>
              ) : (
                <>
                  <MenuButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-secondary">
                    {username}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                  </MenuButton>
                  <MenuItems
                    onClick={handleLogut}
                    transition
                    anchor="bottom end"
                    className="w-52 origin-top-right rounded-xl border border-white/5 bg-black/40 p-1 text-sm/6 text-black hover:bg-gray-500 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    // className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-black shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                  >
                    <div className="">
                      {subMenus.map((item) => (
                        <MenuItem
                          key={item.name}
                          className="group font-poppins relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                        >
                          {item.name === "Logout" && <button>Logout</button>}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </>
              )}
            </Menu>
          </PopoverGroup>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link
                className="self-center font-poppins text-2xl font-semibold whitespace-nowrap text-secondary"
                to="/"
              >
                Fessaage
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">

                  {menus.map((item) => (
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      key={item}
                      to={`/${item}`}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-secondary hover:bg-gray-50"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <button
                    onClick={!username ? handleLogin : handleLogut}
                    className=" w-full text-start block rounded-lg py-2.5 text-base/7 font-semibold text-secondary hover:bg-gray-50"
                  >
                    {!username ? "Login" : "Logout"}
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}
