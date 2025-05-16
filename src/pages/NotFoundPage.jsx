import React from "react";
import NotFoundImage from "../assets/notFound.svg";

export default function NotFoundPage() {
  return (
    <>
      <div className="h-full max-[720px]:min-h-screen flex flex-col items-center justify-center">
        <img
          src={NotFoundImage}
          height={600}
          width={600}
          alt="Halaman tidak ditemukan"
        />
        <h1 className="max-[720px]:text-lg max-[720px]:text-center font-poppins font-bold text-2xl">
          Mohon maaf, halaman tidak ditemukan
        </h1>
      </div>
    </>
  );
}
