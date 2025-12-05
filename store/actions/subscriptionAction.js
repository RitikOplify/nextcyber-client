import { buySubscription, verifyPayment } from "@/api/subscriptionApi";
import toast from "react-hot-toast";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

export const buySubscriptionAPIHandler =
  (payload, setIsLoading) => async (dispatch) => {
    if (typeof setIsLoading === "function") setIsLoading(true);
    try {
      const { data } = await buySubscription(payload);
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      if (typeof setIsLoading === "function") setIsLoading(false);
    }
  };

export const verifyPaymentAPIHandler =
  (payload, setIsLoading) => async (dispatch) => {
    const toastCtn = toast.loading("Please wait! Verifying Payment.");
    if (typeof setIsLoading === "function") setIsLoading(true);
    try {
      const { data } = await verifyPayment(payload);
      if (data.success) {
        toast.success("Payment success!");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      toast.dismiss(toastCtn);
      if (typeof setIsLoading === "function") setIsLoading(false);
    }
  };
