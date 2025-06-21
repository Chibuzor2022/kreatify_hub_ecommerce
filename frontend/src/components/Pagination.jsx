// import React from "react";

// const Pagination = ({ page, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null;

//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <nav className="mt-8 flex justify-center">
//       <ul className="inline-flex items-center space-x-2 text-sm">
//         <li>
//           <button
//             onClick={() => onPageChange(page - 1)}
//             disabled={page === 1}
//             className={`px-3 py-1 rounded-md border ${
//               page === 1
//                 ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 : "hover:bg-blue-500 hover:text-white border-gray-300"
//             }`}
//           >
//             Prev
//           </button>
//         </li>

//         {pages.map((p) => (
//           <li key={p}>
//             <button
//               onClick={() => onPageChange(p)}
//               className={`px-3 py-1 rounded-md border ${
//                 p === page
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "hover:bg-blue-100 text-gray-700 border-gray-300"
//               }`}
//             >
//               {p}
//             </button>
//           </li>
//         ))}

//         <li>
//           <button
//             onClick={() => onPageChange(page + 1)}
//             disabled={page === totalPages}
//             className={`px-3 py-1 rounded-md border ${
//               page === totalPages
//                 ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 : "hover:bg-blue-500 hover:text-white border-gray-300"
//             }`}
//           >
//             Next
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;

import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  // Create an array of page numbers [1, 2, ..., totalPages]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-8 flex justify-center">
      <ul className="inline-flex items-center space-x-2 text-sm">
        {/* Previous button */}
        <li>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1} // Disable if already on first page
            className={`px-3 py-1 rounded-md border ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white border-gray-300"
            }`}
          >
            Prev
          </button>
        </li>

        {/* Numbered page buttons */}
        {pages.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded-md border ${
                p === page
                  ? "bg-blue-600 text-white border-blue-600" // Highlight current page
                  : "hover:bg-blue-100 text-gray-700 border-gray-300"
              }`}
            >
              {p}
            </button>
          </li>
        ))}

        {/* Next button */}
        <li>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages} // Disable if already on last page
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

