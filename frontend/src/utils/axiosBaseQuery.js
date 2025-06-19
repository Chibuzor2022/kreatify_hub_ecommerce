import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl = '' } = {}) =>
  async ({ url, method, data, params }) => {
    try {
      // Send cookies with every request for httpOnly auth
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true, // this ensures cookies are sent
        headers: {
          'Content-Type': 'application/json',
          // Removed Authorization header for cookie-based JWT auth
        },
      });

      return { data: result.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || { message: err.message },
        },
      };
    }
  };

export default axiosBaseQuery;







// import axios from 'axios';

// const axiosBaseQuery =
//   ({ baseUrl = '' } = {}) =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axios({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       return { data: result.data };
//     } catch (err) {
//       return {
//         error: {
//           status: err.response?.status || 500,
//           data: err.response?.data || { message: err.message },
//         },
//       };
//     }
//   };

// export default axiosBaseQuery;







// import axios from 'axios';

// const axiosBaseQuery =
//   ({ baseUrl = '' } = {}) =>
//   async ({ url, method, data, params }) => {
//     try {
//       const token = JSON.parse(localStorage.getItem('user'))?.token;

//       const result = await axios({
//         url: baseUrl + url,
//         method,
//         data, 
//         params,
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//       });

//       return { data: result.data };
//     } catch (err) {
//       return {
//         error: {
//           status: err.response?.status || 500,
//           // data: err.response?.data || err.message,
//           data: err.response?.data || { message: err.message },

//         },
//       };
//     }
//   };

// export default axiosBaseQuery;
