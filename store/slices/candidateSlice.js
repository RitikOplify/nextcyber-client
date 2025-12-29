import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  candidates: [],
};

export const candidateReducer = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    setCandidates: (state, action) => {
      state.candidates = action.payload;
    },
  },
});

export const { setCandidates } = candidateReducer.actions;

export default candidateReducer.reducer;
