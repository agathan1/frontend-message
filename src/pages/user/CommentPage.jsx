import React from "react";
import Warning from "../../components/molecule/Warning";
import FormInput from "../../components/molecule/FormInput";
import Pembangunan from "../../assets/DalamPembangunan.svg";

export default function CommentPage() {
  return (
    <>
      {/* untuk pembangunan */}
      <div className="h-dvh max-[720px]:min-h-dvh flex flex-col items-center justify-center">
        <img
          src={Pembangunan}
          height={800}
          width={800}
          alt="dalam pembangunan"
        />
        <h1 className="max-[720px]:text-lg max-[720px]:text-center font-poppins font-bold text-2xl">
          Mohon maaf, halaman ini sedang dalam pembangunan
        </h1>
      </div>
      {/* untuk pembangunan */}

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
    </>
  );
}
