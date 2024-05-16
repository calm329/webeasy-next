import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import UserApi from "../../api/user-api";

import { RootState } from "..";
import { TUser } from "@/types";

type TInitialState = {
  user: TUser;
  loading: boolean;
};

const initialState: TInitialState = {
  user: null,
  loading: false,
};

//fetch user
const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkApi) => {
  try {
    return thunkApi.fulfillWithValue(await UserApi.get());
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log("action: " + action.payload);
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

//export async thunks
export { fetchUser };
export const UsersData = (state: RootState) => state.userSlice.user;
export const loading = (state: RootState) => state.userSlice.loading;
//export default reducer
export default userSlice.reducer;
