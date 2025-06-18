// import React from 'react';

// const Pagination = ({ page, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null; // Don't show pagination for 1 page

//   return (
//     <div className="flex justify-center items-center gap-3 mt-8">
//       <button
//         onClick={() => onPageChange(page - 1)}
//         disabled={page === 1}
//         className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         Previous
//       </button>

//       <span className="text-lg font-semibold">
//         Page {page} of {totalPages}
//       </span>

//       <button
//         onClick={() => onPageChange(page + 1)}
//         disabled={page === totalPages}
//         className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-8 flex justify-center">
      <ul className="inline-flex items-center space-x-2 text-sm">
        <li>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded-md border ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white border-gray-300"
            }`}
          >
            Prev
          </button>
        </li>

        {pages.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded-md border ${
                p === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-blue-100 text-gray-700 border-gray-300"
              }`}
            >
              {p}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-md border ${
              page === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white border-gray-300"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
