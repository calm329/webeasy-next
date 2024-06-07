import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import SiteApi from "@/lib/api/site-api";
import { AppState, TSite } from "@/types";
import { generateUniqueId } from "@/lib/utils/function";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "site",
  storage,
};

const MAX_HISTORY_LENGTH = 100;
type TInitialState = {
  site:any;
  loading: boolean;
};

const initialSite = {
  id:"",
  openedSlide: null,
  focusedField: null,
  selectedFont: "",
  subdomain: "",
  status: "Loading",
  itemsResult: {
    banner: {
      businessName: "",
      button: { show: true, list: [] },
      logo: {
        link: "",
        alt: "",
        show: true,
      },
    },
    hero: {
      image: {
        heroImagePrompt: "",
        imageId: "",
        imageUrl: "",
        alt: "",
        show: true,
      },
      button: { show: true, list: [] },
      heading: "",

      subheading: "",
    },
    colors: {
      primary: "",
      secondary: "",
    },
    services: {
      show: true,
      description: "",
      list: [],
      title: "",
    },
    businessType:"",
    location:""
  },
  view: "Desktop",
  editable: true,
  meta: {
    title: "",
    description: "",
  },
};

const initialState: TInitialState = {
  site: null,
  loading: false,
};

const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    updateAmazonSite(state, action) {
     state.site = action.payload
    }
  },
});

export const { updateAmazonSite } =
  amazonSlice.actions;
export const amazonData = (state: RootState) =>
  state.amazonSlice.site;
export const loading = (state: RootState) => state.amazonSlice.loading;
export default persistReducer(persistConfig, amazonSlice.reducer);
