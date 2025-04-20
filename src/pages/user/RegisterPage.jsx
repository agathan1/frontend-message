import React from "react";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";

export default function RegisterPage({
  username,
  email,
  password,
  changePassword,
  changeEmail,
  changeUsername,
  onSubmitRegis,
  isLoading,
}) {
  //   console.log(email, password, username);
  return (
    <>
      <div className="w-full max-w-lg">
        <form onSubmit={onSubmitRegis}>
          <Fieldset className="bg-black/5 p-6 sm:p-10">
            <div className="space-y-8">
              <Legend className="text-2xl/7 font-semibold text-black font-poppins text-center">
                Login Fessaage
              </Legend>
              <Field>
                <Label className="text-sm/6 font-medium text-black">
                  Username
                </Label>
                <Input
                  value={username}
                  onChange={changeUsername}
                  type="text"
                  placeholder="Silahkan Isikan Username"
                  className=" block w-full rounded-lg border bg-black/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
                />
              </Field>
              <Field>
                <Label className="text-sm/6 font-medium text-black">
                  Email
                </Label>
                <Input
                  onChange={changeEmail}
                  value={email}
                  type="email"
                  placeholder="guest@gmail.com..."
                  className=" block w-full rounded-lg border bg-black/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
                />
              </Field>
              <Field>
                <Label className="text-sm/6 font-medium text-black">
                  Password
                </Label>
                <Description className="text-sm/6 text-black/50">
                  Isikan password kamu di bawah ini
                </Description>
                <Input
                  onChange={changePassword}
                  value={password}
                  type="password"
                  placeholder="********"
                  className="block w-full rounded-lg border bg-black/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
                />
              </Field>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`text-white my-auto w-full font-poppins text-lg mt-8 ${
                isLoading ? "cursor-not-allowed bg-slate-600" : "bg-black"
              } bg-blackfocus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none `}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </Fieldset>
        </form>
        {/* <section>
          <p className="text-sm/6 font-medium text-black">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:underline hover:text-blue-500"
            >
              Daftar disini
            </a>
          </p>
        </section> */}
      </div>
    </>
  );
}
