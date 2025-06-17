
import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl = '' } = {}) =>
  async ({ url, method, data, params }) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const result = await axios({
        url: baseUrl + url,
        method,
        data, 
        params,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      return { data: result.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status || 500,
          // data: err.response?.data || err.message,
          data: err.response?.data || { message: err.message },

        },
      };
    }
  };

export default axiosBaseQuery;
