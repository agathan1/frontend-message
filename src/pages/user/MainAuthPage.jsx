import React, { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import register from "../../query/register";

export default function MainAuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isValue, setIsValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isValueLogin, setIsValueLogin] = useState({
    email: "",
    password: "",
  })

  // REDGISTER
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setIsValue({ username: "", email: "", password: "" });
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil Register",
        text: "Register berhasil, silahkan login terlebih dahulu",
      });
      // Arahkan ke halaman utama, contoh:
      setActiveTab("login");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Opss.. Sorry",
        text:
          error?.message || "Terjadi kesalahan di server. Tunggu sebentar yak.",
      });
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    mutation.mutate({
      username: isValue.username,
      email: isValue.email,
      password: isValue.password,
    });
  };

  const handleChangeUsername = (e) => {
    setIsValue((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handleChangeEmail = (e) => {
    setIsValue((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleChangePassword = (e) => {
    setIsValue((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };
  // EEGISTER


  // const handleToLogin = () => {
  //   navigate("/login");
  //   setIsOpen(false)
  // }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
        <div className="flex w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Bagian kiri: Gambar ilustrasi */}
          <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
            <img
              src="https://smsbroadcast.com.au/wp-content/uploads/2023/01/illustrated-person-holding-up-text-message.png"
              alt="Illustration"
              className="max-w-xs"
            />
          </div>

          {/* Bagian kanan: Form login/register */}
          <div className="w-full md:w-1/2 pb-4">
            {activeTab === "login" && <LoginPage />}
            {activeTab === "register" && (
              <RegisterPage
                onSubmitRegis={handleSubmitMessage}
                username={isValue.username}
                email={isValue.email}
                password={isValue.password}
                changeEmail={handleChangeEmail}
                changePassword={handleChangePassword}
                changeUsername={handleChangeUsername}
                isLoading={isLoading}
              />
            )}

            {/* Link ganti tab */}
            <div className="mt-3 text-center text-sm text-gray-600">
              {activeTab === "login" ? (
                <>
                  Belum punya akun?{" "}
                  <button
                    onClick={() => setActiveTab("register")}
                    className="text-blue-500 hover:underline"
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Sudah punya akun?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-blue-500 hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* {menus.map(({ name }) => (
              <TabPanel key={name} className="rounded-xl bg-black/5 p-3">
                {name}
                {name === "Login" ? <LoginPage /> : <RegisterPage />}
              </TabPanel>
            ))} */
}

{
  /* {menus.map(({ name }) =>
                name === "Login" && (
                  <Tab key={name} className={"hidden"}>
                    login
                  </Tab>
                ) || name === "Register" && (
                  <Tab key={name} className={"hidden"}>register</Tab>
                )
              )} */
}

{
  /* <div className="w-full max-w-md">
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabPanels className="mt-3">
            {menus.map((menu) => (
              <TabPanel
                key={menu.id}
                className="rounded-xl bg-white p-4 shadow"
              >
                {menu.component}
              </TabPanel>
            ))}

            <TabList className="flex gap-4">
              {menus.map(
                (menu, index) =>
                  index !== selectedIndex && (
                    <Tab
                      key={menu.id}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      {menu.name}
                    </Tab>
                  )
              )}
            </TabList>
          </TabPanels>
        </TabGroup>
      </div> */
}

{
  /* <ul>
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5"
                    >
                      <a href="#" className="font-semibold text-white">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                      <ul
                        className="flex gap-2 text-white/50"
                        aria-hidden="true"
                      >
                        <li>{post.date}</li>
                        <li aria-hidden="true">&middot;</li>
                        <li>{post.commentCount} comments</li>
                        <li aria-hidden="true">&middot;</li>
                        <li>{post.shareCount} shares</li>
                      </ul>
                    </li>
                  ))}
                </ul> */
}

{
  /* {menus.map(({ name }) => (
                    name === "Login" ? (
                        <Tab
                        key={name} />
                    ) : (
                        <Tab
                        key={name} />
                    )
                ))} */
}
{
  /* {menus.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Belum Punya Akun?{name}
              </Tab>
            ))} */
}
