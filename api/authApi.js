import axios from "@/utils/axios";

export const signUp = (user) => axios.post("/auth/signup", user);

export const signIn = (user) => axios.post("/auth/signin", user);

export const getCurrentUser = () => axios.get("/auth/current");

export const forgotPassword = (data) =>
  axios.post("/auth/forgot-password", data);

export const resetPassword = (params, data) =>
  axios.post(`/auth/reset-password/${params}`, data);

export const signOut = () => axios.get("/auth/signout");
