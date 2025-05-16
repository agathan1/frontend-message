import React from "react";

export default function CardMessage({ send_to, message, createDate }) {
  const date = new Date(createDate);

  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const renderValue = (value) => {
    value === "Invalid Date" || !value || value === null || value === undefined ? "-" : value;
  };
  return (
    <>
      <div class="flex flex-col justify-between w-full max-w-2xl max-[750px]:max-w-xl h-50 border rounded-xl overflow-hidden shadow">
      {/* <div class="flex flex-col justify-between rounded-xl max-w-[500px] border overflow-hidden bg-card shadow"> */}
        {/* <!----> */}
        <div className="cursor-pointer flex flex-col gap-4 w-full h-full p-4 transition-colors duration-200 hover:bg-gray-50">
        {/* <div className="cursor-pointer flex flex-col gap-4 w-full h-[8rem]  p-4 transition-colors duration-200 hover:bg-gray-50"> */}
          <div className="text-sm font-poppins font-bold tracking-tight text-gray-900 flex gap-2">
            <span>Send to: </span>
            <span className="text-secondary">{send_to}</span>
          </div>
          <div className="pb-1.5 justify-self-start">
            <p className="font-satisfy text-lg text-gray-800 sm:text-xl line-clamp-2 text-wrap">
              {message}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 p-4 border-t bg-gray-100">
        {/* <div className="flex items-center justify-between gap-2 p-4 border-t  bg-gray-100"> */}
          <p className="text-sm font-poppins text-gray-800 font-semibold">{formattedDate}</p>
          <p className="text-sm font-poppins text-gray-800 font-semibold">{renderValue(formattedDate)}</p>
        </div>
      </div>

    </>
  );
};