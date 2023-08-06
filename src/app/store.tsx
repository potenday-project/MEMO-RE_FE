import { configureStore } from "@reduxjs/toolkit";
import accessTokenReducer from "../features/token/accessTokenSlice";

export const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
  },
});
