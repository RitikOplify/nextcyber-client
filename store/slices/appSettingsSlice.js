import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  collapseSidebar: false,
};

export const appSettings = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.collapseSidebar = !state.collapseSidebar;
    },
  },
});

export const { toggleSidebar } = appSettings.actions;

export default appSettings.reducer;
