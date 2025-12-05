import axios from "@/utils/axios";

export const buySubscription = (payload) =>
  axios.post(`/subscription/create-checkout-session`, payload);

export const verifyPayment = (payload) =>
  axios.post(`/subscription/verify-payment`, payload);
