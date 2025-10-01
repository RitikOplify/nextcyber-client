import { setUser, clearUser, setLoading } from "../slices/authSlice.js";
import toast from "react-hot-toast";
import { signIn, getCurrentUser, signOut } from "@/api/authApi.js";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

export const asyncSigninUser = (user, setIsLoading) => async (dispatch) => {
  if (typeof setIsLoading === "function") setIsLoading(true);
  try {
    await toast.promise(signIn(user), {
      loading: "Signing in...",
      success: (response) => {
        const { data } = response;
        dispatch(setUser(data.admin));
        return data.message || "Signed in successfully!";
      },
      error: (err) => {
        return (
          err?.response?.data?.message || err?.message || "Sign in failed!"
        );
      },
    });
  } catch {
  } finally {
    if (typeof setIsLoading === "function") setIsLoading(false);
  }
};

export const asyncCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await getCurrentUser();
    dispatch(setUser(data.admin));
  } catch (error) {
    dispatch(clearUser());
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncSignOutUser = () => async (dispatch) => {
  try {
    await toast.promise(signOut(), {
      loading: "Signing out...",
      success: (response) => {
        const { data } = response;
        dispatch(clearUser());
        return data.message || "Logged out successfully!";
      },
      error: (err) => getErrorMessage(err),
    });
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};
