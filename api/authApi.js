import axios from "@/utils/axios";

export const signUp = (user) => axios.post("/auth/signup", user);

export const signIn = (user) => axios.post("/auth/signin", user);

export const getCurrentUser = () => axios.get("/auth/current");

export const signOut = () => axios.get("/auth/signout");
