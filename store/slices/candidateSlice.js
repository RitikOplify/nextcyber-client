import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  candidates: [],
  shortlistedCandidates: [],
  totalPages: 0,
};

export const candidateReducer = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    setCandidates: (state, action) => {
      state.candidates = action.payload.students;
      state.totalPages = action.payload.pagination.totalPages;
    },
    setShortlistedCandidates: (state, action) => {
      state.shortlistedCandidates = action.payload.students;
      state.totalPages = action.payload?.pagination?.totalPages || 1;
    },
    addToFavorite: (state, action) => {
      const { companyId, candidateId } = action.payload;
      state.candidates = state.candidates.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              favoritedBy: [
                ...candidate.favoritedBy,
                { company: { id: companyId } },
              ],
            }
          : candidate
      );
    },
    removeFromFavorite: (state, action) => {
      const { companyId, candidateId } = action.payload;
      state.candidates = state.candidates.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              favoritedBy: candidate.favoritedBy.filter(
                (fav) => fav.company.id !== companyId
              ),
            }
          : candidate
      );
    },
  },
});

export const {
  setCandidates,
  setShortlistedCandidates,
  addToFavorite,
  removeFromFavorite,
} = candidateReducer.actions;
export default candidateReducer.reducer;
