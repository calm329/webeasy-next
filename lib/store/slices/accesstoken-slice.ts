import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AccessTokenApi from "../../api/accesstoken-api";

import { RootState } from "..";
import { TAccessToken } from "@/types";

type TInitialState = {
  accessToken: TAccessToken | null;
  loading: boolean;
};

const initialState: TInitialState = {
  accessToken: null,
  loading: false,
};

//fetch accesstoken
const fetchAccessToken = createAsyncThunk(
  "accessToken/fetchAccessToken",
  async ({ siteId }: { siteId: string }, thunkApi) => {
    try {
      return thunkApi.fulfillWithValue(
        await AccessTokenApi.getBySiteId(siteId),
      );
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccessToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAccessToken.fulfilled, (state, action) => {
      state.loading = false;

      state.accessToken = action.payload;
    });
    builder.addCase(fetchAccessToken.rejected, (state) => {
      state.loading = false;
    });
  },
});

//export async thunks
export { fetchAccessToken };
export const AccessTokensData = (state: RootState) =>
  state.accessTokenSlice.accessToken;
export const loading = (state: RootState) => state.accessTokenSlice.loading;
//export default reducer
export default accessTokenSlice.reducer;
