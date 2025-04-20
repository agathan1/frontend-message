import React from "react";

export default function FormInput({
  mainMessage,
  sendTo,
  onChangeMessage,
  onChanngeSendTo,
  onSubmit,
  isLoading,
}) {
  return (
    <>
      <form onSubmit={onSubmit} className="space-y-8">
        <div>
          <label
            htmlFor=""
            className="block mb-2 text-lg font-poppins font-medium text-gray-900"
          >
            Pesan Untuk
          </label>
          <input
          value={sendTo}
          onChange={onChanngeSendTo}
            type="text"
            className="border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:placeholder-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Kirimkan Disini"
          />
        </div>
        <div className="mt-8">
          <label
            htmlFor=""
            className="block mb-2 text-lg font-poppins font-medium text-gray-900"
          >
            Isi Pesan
          </label>
          <textarea
            value={mainMessage}
            onChange={onChangeMessage}
            type="text"
            className=" border border-gray-500 h-60 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:placeholder-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Kirimkan Disini"
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={`text-white my-auto w-full font-poppins text-lg ${isLoading ? "cursor-not-allowed bg-slate-600" : "bg-black"} bg-blackfocus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none `}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}
