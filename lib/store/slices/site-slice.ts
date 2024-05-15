import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import SiteApi from "@/lib/api/site-api";
import { TSite } from "@/types";

type TInitialState = {
  sites: {
    domain: TSite | null;
    user: Array<TSite> | null;
  };
  loading: boolean;
};

const initialState: TInitialState = {
  sites: {
    domain: null,
    user: null,
  },
  loading: false,
};

//fetch Sites by domain
const fetchSitesByDomain = createAsyncThunk(
  "site/fetchDomainSites",
  async ({ subdomain }: { subdomain: string }, thunkApi) => {
    try {
      return thunkApi.fulfillWithValue(await SiteApi.getBySubDomain(subdomain));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

//fetch Sites by user
const fetchSitesByUser = createAsyncThunk(
  "site/fetchUserSites",
  async (_, thunkApi) => {
    try {
      return thunkApi.fulfillWithValue(await SiteApi.getByUserId());
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

//create site
const createSite = createAsyncThunk(
  "site/create",
  async (
    {
      aiResult,
      posts,
      accessToken,
      userId,
    }: {
      aiResult: string;
      posts: string;
      accessToken: string;
      userId: string;
    },
    thunkApi,
  ) => {
    try {
      return thunkApi.fulfillWithValue(
        await SiteApi.create({ aiResult, posts, accessToken, userId }),
      );
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

//update site
const updateSite = createAsyncThunk(
  "site/update",
  async (
    {
      subdomain,
      data,
      keys,
    }: {
      subdomain: string;
      data: {
        [key: string]: string;
      };
      keys: string[];
    },
    thunkApi,
  ) => {
    try {
      return thunkApi.fulfillWithValue(
        await SiteApi.update(subdomain, data, keys),
      );
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSitesByDomain.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSitesByDomain.fulfilled, (state, action) => {
      state.loading = false;
      state.sites.domain = action.payload;
    });
    builder.addCase(fetchSitesByDomain.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchSitesByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSitesByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.sites.user = action.payload;
    });
    builder.addCase(fetchSitesByUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

//export async thunks
export { fetchSitesByDomain, createSite, updateSite, fetchSitesByUser };
export const SitesData = (state: RootState) => state.siteSlice.sites;
export const loading = (state: RootState) => state.siteSlice.loading;
export default siteSlice.reducer;
