import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import templateSlice from "./slices/template-slice";
import accessTokenSlice from "./slices/accesstoken-slice";
import siteSlice from "./slices/site-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userSlice,
      templateSlice,
      accessTokenSlice,
      siteSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
