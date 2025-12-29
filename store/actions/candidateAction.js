import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/errMessage";
import { findStudentsApi } from "@/api/candidateApi";
import { setCandidates } from "../slices/candidateSlice";

export const asyncGetCandidates = (query, setIsLoading) => async (dispatch) => {
  setIsLoading?.(true);
  try {
    const { data } = await findStudentsApi(query);
    console.log(data);
    dispatch(setCandidates(data.data.students));
  } catch (error) {
    toast.error(getErrorMessage(error, "Failed to fetch companies"));
  } finally {
    setIsLoading?.(false);
  }
};
