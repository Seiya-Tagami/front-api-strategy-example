import axios from "axios";
import { QueryClient } from "@tanstack/react-query";


const queryClient = new QueryClient()

const baseURL = process.env.NEXT_PUBLIC_APP_API_ENDPOINT_MOCK;
const headers = {
  "Content-Type": "application/json",
};
const apiClient = axios.create({ baseURL, headers });
// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error);
//     switch (error?.response?.status) {
//       case 401:
//         break;
//       case 404:
//         break;
//       default:
//         console.log("== internal server error");
//     }

//     const errorMessage = (error.response?.data?.message || "").split(",");
//     throw new Error(errorMessage);
//   }
// )

export {
  queryClient,
  apiClient
}