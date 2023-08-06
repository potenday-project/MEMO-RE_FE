import { createSlice } from "@reduxjs/toolkit";

const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState: "",
  reducers: {
    setToken: (state, action) => {
      state = action.payload;
      return state;
    },
    clearToken: (state, action) => {
      state = "";
      return state;
    },
  },
});

export const { setToken, clearToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
