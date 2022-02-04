import { postsApi } from "./services/posts";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   postReducer: postsApi.reducer
// });

// export const store = configureStore({
//   reducer: rootReducer
// });

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware)
});
