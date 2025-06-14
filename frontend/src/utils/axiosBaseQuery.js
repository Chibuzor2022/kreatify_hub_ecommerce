import axiosInstance from "../utils/axios";

// const axiosBaseQuery =
// 	({ baseUrl } = { baseUrl: "" }) =>
// 	async ({ url, method, data, params }) => {
// 		try {
// 			const result = await axiosInstance({
// 				url: baseUrl + url,
// 				method,
// 				data,
// 				params,
// 			});
// 			return { data: result.data };
// 		} catch (axiosError) {
// 			return {
// 				error: {
// 					status: axiosError.response?.status,
// 					data: axiosError.response?.data || axiosError.message,
// 				},
// 			};
// 		}
// 	};

export const axiosBaseQuery =
	({ baseUrl }) =>
	async ({ url, method, data, params }) => {
		return axiosInstance({
			url: baseUrl + url,
			method,
			data, // <-- this is crucial
			params,
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		})
			.then((res) => ({ data: res.data }))
			.catch((err) => ({
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			}));
	};

export default axiosBaseQuery;
