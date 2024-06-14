import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import TemplateApi from "../../api/template-api";

import { RootState } from "..";
import { TTemplate } from "@/types";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "template",
  storage,
  whiteList: ["selectedTemplate"],
};

type TInitialState = {
  templates: Array<TTemplate> | null;
  selectedTemplate: TTemplate | null;
  loading: boolean;
};

const initialState: TInitialState = {
  templates: null,
  selectedTemplate: null,
  loading: false,
};

//fetch template
const fetchTemplates = createAsyncThunk(
  "template/fetchTemplates",
  async (_, thunkApi) => {
    try {
      return thunkApi.fulfillWithValue(await TemplateApi.getAll());
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTemplates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTemplates.fulfilled, (state, action) => {
      state.loading = false;

      state.templates = action.payload;
      // state.selectedTemplate = action.payload[0];
    });
    builder.addCase(fetchTemplates.rejected, (state) => {
      state.loading = false;
    });
  },
});

//export async thunks
export { fetchTemplates };
export const { setSelectedTemplate } = templateSlice.actions;
export const TemplatesData = (state: RootState) =>
  state.templateSlice.templates;
export const selectedTemplate = (state: RootState) =>
  state.templateSlice.selectedTemplate;
export const loading = (state: RootState) => state.templateSlice.loading;
//export default reducer
export default persistReducer(persistConfig, templateSlice.reducer);
