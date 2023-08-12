import { configureStore } from "@reduxjs/toolkit";
import accessTokenReducer from "../features/token/accessTokenSlice";
import tagListReducer from "../features/tagList/tagListSlice";
import moemoListReducer from "../features/memoList/memoListSlice";

export const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    tagList: tagListReducer,
    memoList: moemoListReducer,
  },
});
