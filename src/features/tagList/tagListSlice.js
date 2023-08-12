import { createSlice } from "@reduxjs/toolkit";

const tagListSlice = createSlice({
  name: "tagList",
  initialState: [],
  reducers: {
    setTagList: (state, action) => {
      state.push(action.payload);
      return state;
    },
    deleteTagList: (state, action) => {
      return state.filter((v) => !action.payload.includes(v));
    },
  },
});

export const { setTagList, deleteTagList } = tagListSlice.actions;

export default tagListSlice.reducer;
