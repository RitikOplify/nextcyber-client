import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  companies: [],
};

export const companyReducer = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.companies = action.payload;
    },
   removeCompanies: (state) => {
      state.companies = [];
    },
  },
});

export const { setCompany, removeCompanies } = companyReducer.actions;
export default companyReducer.reducer;
