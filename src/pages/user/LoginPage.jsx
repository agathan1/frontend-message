import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../../query/login";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [isLoginValue, setIsLoginValue] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setIsLoginValue({ email: "", password: "" });
      Swal.fire({
        icon: "success",
        title: "Berhasil Login",
        text: `Selamat datang. Silahkan berekspresi ${data.user?.username} 👋`,
      });
      setIsLoading(false);
      localStorage.setItem("role", data.user?.role);
      localStorage.setItem("usernameFesasage", data.user?.username);
      localStorage.setItem("emailFessage", data.user?.email);
      localStorage.setItem("userId", data.user?.id);
      localStorage.setItem("tokenUser", data.token);
      navigate("/Send");
    },
    onError: (error) => {
      setIsLoading(false);
      setIsLoginValue({ email: "", password: "" });
      Swal.fire({
        icon: "error",
        title: "Gagal Login",
        text: error?.message || "Cek kembali email dan password kamu.",
      });
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutationLogin.mutate({
      email: isLoginValue.email,
      password: isLoginValue.password,
    });
  };

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleLogin}>
        <Fieldset className=" bg-black/5 p-6 sm:p-10">
          <div className="space-y-8">
            <Legend className="text-2xl/7 font-semibold text-black font-poppins text-center">
              Login Fessaage
            </Legend>
            <Field>
              <Label className="text-sm/6 font-medium text-black">email</Label>
              <Input
                onChange={(e) =>
                  setIsLoginValue({ ...isLoginValue, email: e.target.value })
                }
                value={isLoginValue.email}
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
                onChange={(e) =>
                  setIsLoginValue({ ...isLoginValue, password: e.target.value })
                }
                value={isLoginValue.password}
                type="password"
                placeholder="********"
                className="block w-full rounded-lg border bg-black/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
              />
            </Field>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={`text-white mt-8 my-auto w-full font-poppins text-lg ${
              mutationLogin.isPending ? "cursor-not-allowed bg-slate-600" : "bg-black"
            } bg-blackfocus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none `}
          >
            {mutationLogin.isPending ? "Loading..." : "Login"}
          </button>
        </Fieldset>
      </form>
    </div>
  );
}

{
  /* <Field>
          <Label className="text-sm/6 font-medium text-white">Country</Label>
          <Description className="text-sm/6 text-white/50">
            We currently only ship to North America.
          </Description>
          <div className="relative">
            <Select
              className={clsx(
                "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                // Make the text of each option black on Windows
                "*:text-black"
              )}
            >
              <option>Canada</option>
              <option>Mexico</option>
              <option>United States</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
        </Field> */
}

{
  /* <Textarea
            className="mt-3 block w-full resize-none rounded-lg border bg-black/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
            rows={3}
          /> */
}
{
  /* <Description className="text-sm/6 text-black/50">
              If you have a tiger, we'd like to know about it.
            </Description> */
}
