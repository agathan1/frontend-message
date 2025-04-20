import React from "react";

export default function TableAdmin({
  columns = [], // Array of { label, accessor }
  rows = [], // Array of data objects
  page = 1,
  onNext,
  onPrev,
  hasNextPage = true,
  renderActions, // optional function to render action buttons
}) {
  // console.log("rows", rows);
  // console.log("columns", columns);
  // console.log("hasNextPage", hasNextPage);
  return (
    <>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {col.label}
                </th>
              ))}
              {renderActions && (
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4">
                    {row[col.accessor]}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-6 py-4 flex flex-col gap-2">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={onPrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="my-auto">Page {page}</span>
          <button
            onClick={onNext}
            disabled={!hasNextPage}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
  
    </>
  );
}
