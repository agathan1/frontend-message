import React from "react";

export default function CardMessage({ send_to, message, createDate }) {
  const date = new Date(createDate);

  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const renderValue = (value) => {
    value == "Invalid Date" || !value || value == null ? "-" : value;
  }
  return (
    <>
      <div className="flex flex-col justify-between w-full h-full border rounded-xl overflow-hidden bg-card shadow">
        <div className="cursor-pointer flex flex-col gap-4 w-full h-[8rem]  p-4 transition-colors duration-200 hover:bg-gray-50">
          <div className="text-sm font-poppins font-bold tracking-tight text-gray-900 flex gap-2">
            <span>Send to: </span>
            <span className="text-secondary">{send_to}</span>
          </div>
          <div className="wrap-pb-1.5 justify-self-start">
            <p className="font-satisfy text-lg text-gray-800 sm:text-xl line-clamp-2">
              {message}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 p-4 border-t bg-gray-100">
          <p className="text-sm font-poppins text-gray-800 font-semibold">{formattedDate}</p>
          <p className="text-sm font-poppins text-gray-800 font-semibold">{renderValue(formattedDate)}</p>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="p-4">
        <Image
          src={Images}
          alt="Project Image"
          height={500}
          width={500}
          className="h-60 mx-auto rounded-t-2xl"
        />
        <section className="max-w-fit mt-8">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis line-clamp-3">
          {/* {description.length > 50
            ? description.substring(0, 70) + "..."
            : description} */
}
//     {description}
// </p>
// <button onClick={onClick} className="w-full items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
// View more
// </button> */}
