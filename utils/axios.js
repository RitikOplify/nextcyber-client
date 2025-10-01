import axios from "axios";
import { store } from "@/store/store";
import { toast } from "react-hot-toast";
import { clearUser } from "@/store/slices/authSlice";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // const pathname = window.location.pathname;
    // const excludedPaths = ["/signin", "/forgot-password"];
    // const isExcluded = excludedPaths.some((path) => pathname.startsWith(path));

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => instance(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      processQueue(null);

      return instance(originalRequest);
    } catch (err) {
      processQueue(err);

      store.dispatch(clearUser());

      // if (!isExcluded) {
      //   toast.error("Session expired. Please log in again.");
      //   window.location.replace("/signin");
      // }

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default instance;
