import React, { Suspense } from "react";
import Warning from "../../components/molecule/Warning";
import FormInput from "../../components/molecule/FormInput";
import { useForm, ValidationError } from "@formspree/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Pembangunan from "../../assets/DalamPembangunan.svg";
import Swal from "sweetalert2";

export default function CommentPage() {
  const [state, handleSubmit] = useForm("xblovaek");

  const validationComment = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    message: Yup.string().required("Message is required"),
  });

  // Formik untuk kirim pesan masukan
  const formikSubmitMessage = useFormik({
    initialValues: {
      email: localStorage.getItem("emailFessage") ?? "",
      username: localStorage.getItem("usernameFesasage") ?? "",
      message: "",
    },
    validationSchema: validationComment,
    onSubmit: async (values) => {
      // console.log(values);
      await handleSubmit(values);
      Swal.fire("Berhasil!", "Pesan berhasil dikirim", "success");
      formikSubmitMessage.resetForm();
    },
  });
  return (
    <>
      <Suspense
        fallback={
          <p className="text-center text-6xl text-black">loading....</p>
        }
      >
        {/* untuk pembangunan */}
        {/* <div className="h-dvh max-[720px]:min-h-dvh flex flex-col items-center justify-center">
          <img
            src={Pembangunan}
            height={800}
            width={800}
            alt="dalam pembangunan"
          />
          <h1 className="max-[720px]:text-lg max-[720px]:text-center font-poppins font-bold text-2xl">
            Mohon maaf, halaman ini sedang dalam pembangunan
          </h1>
        </div> */}
        {/* untuk pembangunan */}

        <form
          className="space-y-8 px-4"
          onSubmit={formikSubmitMessage.handleSubmit}
        >
          {["email", "username", "message"].map((name, index) => (
            <div key={index}>
              <label
                htmlFor={name}
                className="block mb-2 text-lg font-poppins font-medium text-gray-900"
              >
                {name === "email"
                  ? "Email"
                  : name === "username"
                  ? "Username"
                  : "Kritik & Saran"}
              </label>
              {name === "email" || name === "username" ? (
                <input
                  id={name}
                  name={name}
                  disabled={
                    name === "email" || name === "username" ? true : false
                  }
                  value={formikSubmitMessage.values[name]}
                  onChange={formikSubmitMessage.handleChange}
                  type={name === "email" ? "email" : "text"}
                  className="border border-gray-800 text-gray-900 text-sm rounded-lg block w-full p-3 hover:cursor-not-allowed font-poppins"
                  placeholder="Kirimkan Disini"
                />
              ) : (
                <textarea
                  id={name}
                  name={name}
                  value={formikSubmitMessage.values[name]}
                  onChange={formikSubmitMessage.handleChange}
                  type="text"
                  className=" border border-gray-500 h-60 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:placeholder-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Jika ada kritik & saran silahkan kirimkan disini"
                />
              )}
            </div>
          ))}
          <button
            disabled={state.submitting}
            type="submit"
            className={`text-white my-auto w-full font-poppins text-lg ${
              state.submitting ? "cursor-not-allowed bg-slate-600" : "bg-black"
            } bg-blackfocus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none `}
          >
            {state.submitting ? "Loading..." : "Submit"}
          </button>
          {/* <div className="max-[750px]:min-h-screen h-full flex flex-col">
            <Rating />
            <RangeInput onChange={(e) => console.log(e.target.value)} />
            <div className=" h-full max-[750px]:max-w-full">
              {" "}
              line ini tidak di pakai
              <FormInput labelKedua={"Komentar"} />
            </div>
          </div> */}
        </form>

        {/* <div className="space-y-8 px-4">
        <div>
          <Warning
            description={
              "Jika ada pertanyaan atau masukan, bisa ketikan disini."
            }
            // info={"Warning!"}
            color={"bg-amber-500"}
          />
        </div>

        <div className="max-[750px]:min-h-screen h-full flex justify-center">
          <div className="max-[750px]:min-h-screen h-full max-[750px]:max-w-full max-w-[70%] mx-auto"> line ini tidak di pakai
          <FormInput labelKedua={"Komentar"} labelPertama={"Komentar"} />
        </div>
      </div> */}
      </Suspense>
    </>
  );
}
