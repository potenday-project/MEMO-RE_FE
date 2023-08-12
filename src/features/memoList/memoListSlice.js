import { createSlice } from "@reduxjs/toolkit";

const memoListSlice = createSlice({
  name: "memoList",
  initialState: [],
  reducers: {
    setMemoList: (state, action) => {
      state.push(action.payload);
      return state;
    },
    deleteMemoList: (state, action) => {
      return state.filter((memo) => !memo.keyword.includes(action.payload));
    },
    updateMemo: (state, action) => {
      const idx = state.findIndex(
        (memo) => memo.keyword === action.payload.keyword
      );
      state[idx] = action.payload;
      return state;
    },
  },
});

export const { setMemoList, deleteMemoList, updateMemo } =
  memoListSlice.actions;

export default memoListSlice.reducer;
