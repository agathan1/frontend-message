import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { login } from "../../query/login";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const FormLogin = ({
  password,
  email,
  onChangePassword,
  onChangeEmail,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="min-[600px]:w-1/2 w-full mx-auto px-4">
      <div className="mb-5">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          onChange={onChangeEmail}
          value={email}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Masukan email disini..."
          required
        />
      </div>
      <div className="mb-5">
        <label
          for="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your password
        </label>
        <input
          // required={required}
          // autoComplete={autoComplete}
          // pattern={pattern}
          // inputMode={inputMode}
          // style={style}
          // id={id}
          // readOnly={readOnly}
          // placeholder={placeholder}
          // type={type}
          onChange={onChangePassword}
          value={password}
          placeholder="isikan password disini"
          type="password"
          id="password"
          className="bg-gray-50 border placeholder:text-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className={`text-white ${isLoading ? "cursor-not-allowed bg-slate-600" : "bg-blue-700 hover:bg-blue-800 "}  focus:ring-4 w-full focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default function AdminLoginPage() {
  //   const [isEmail, setIsEmail] = useState("");
  //   const [isPassword, setIsPassword] = useState("");
  const [input, setInput] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const query = useQueryClient();

  //   FETCH DATA ASSET MENGGUNAKAN USEMUTATION
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.user?.role !== "admin") {
        Swal.fire({
          icon: "error",
          title: "Opss.. Sorry",
          text: "Anda bukan admin",
        });
        return;
      }
      setIsLoading(false);
      localStorage.setItem("roleAdmin", data.user?.role);
      localStorage.setItem("usernameAdmin", data.user?.username);
      localStorage.setItem("userIdAdmin", data.user?.id);
      localStorage.setItem("tokenAdmin", data.token); // misalnya responsenya ada `token`
      Swal.fire({
        icon: "success",
        title: "Berhasil Login!",
        text: "Selamat datang kembali 👋",
      });
      // Arahkan ke halaman utama, contoh:
      navigate("/v1/dashboard");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Gagal Login",
        text: error?.message || "Cek kembali email dan password kamu.",
      });
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email: input.email,
      password: input.password,
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center w-[70%]">
          <div className="mb-8">
            <h1 className="text-center text-3xl font-bold font-poppins">
              Fessagee Admin
            </h1>
          </div>
          <div className="w-full flex flex-col justify-center space-y-8 ">
            <FormLogin
              isLoading={isLoading}
              onSubmit={handleSubmit}
              email={input.email}
              password={input.password}
              onChangeEmail={(e) =>
                setInput({ ...input, email: e.target.value })
              }
              onChangePassword={(e) =>
                setInput({ ...input, password: e.target.value })
              }
            />
            <div className="flex justify-center gap-2">
              <p>Belum punya akun?</p>
              <p>
                <a href="/register">Daftar disini</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// min-[600px]:max-w-full	Berlaku jika layar ≥ 600px
// max-[600px]:max-w-full	Berlaku jika layar ≤ 600px
