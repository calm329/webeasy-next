import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import TemplateApi from "../../api/template-api";

import { RootState } from "..";
import { TTemplate } from "@/types";

type TInitialState = {
  template: Array<TTemplate> | null;
  loading: boolean;
};

const initialState: TInitialState = {
  template: null,
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTemplates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTemplates.fulfilled, (state, action) => {
      state.loading = false;
      console.log("action: " + action.payload);
      state.template = action.payload;
    });
    builder.addCase(fetchTemplates.rejected, (state) => {
      state.loading = false;
    });
  },
});

//export async thunks
export { fetchTemplates };
export const TemplatesData = (state: RootState) => state.templateSlice.template;
export const loading = (state: RootState) => state.templateSlice.loading;
//export default reducer
export default templateSlice.reducer;
