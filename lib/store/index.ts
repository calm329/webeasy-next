import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import userSlice from "./slices/user-slice";
import templateSlice from "./slices/template-slice";
import accessTokenSlice from "./slices/accesstoken-slice";
import siteSlice from "./slices/site-slice";
import amazonSlice from "./slices/amazon-slice";
import sectionSlice from "./slices/section-slice";

export const store = configureStore({
  reducer: {
    userSlice,
    templateSlice,
    accessTokenSlice,
    siteSlice,
    amazonSlice,
    sectionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
