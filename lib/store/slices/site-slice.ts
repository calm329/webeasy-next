import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

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
  sites: {
    domain: { past: AppState[]; present: AppState; future: AppState[] };
    user: Array<TSite> | null;
  };
  loading: boolean;
};

const initialSite: AppState = {
  id: "",
  generate: {
    progress: 0,
    generating: false,
    field: null,
  },
  openedSlide: null,
  focusedField: null,
  selectedFont: "",
  subdomain: "",
  status: "Loading",
  iPosts: { limit: 20, show: true, list: [], showHash: true },
  aiContent: {
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
    businessType: "",
    location: "",
  },
  view: "Desktop",
  editable: true,
  meta: {
    title: "",
    description: "",
  },
};

const initialState: TInitialState = {
  sites: {
    domain: {
      past: [],
      present: { ...initialSite },
      future: [],
    },
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

const fetchSiteById = createAsyncThunk(
  "site/fetchSiteById",
  async ({ id }: { id: string }, thunkApi) => {
    try {
      return thunkApi.fulfillWithValue(await SiteApi.getSiteById(id));
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
// const createSite = createAsyncThunk(
//   "site/create",
//   async (
//     {
//       aiResult,
//       posts,
//       accessToken,
//       userId,
//     }: {
//       aiResult: string;
//       posts: string;
//       accessToken: string;
//       userId: string;
//     },
//     thunkApi,
//   ) => {
//     try {
//       return thunkApi.fulfillWithValue(
//         await SiteApi.create({ aiResult, posts, accessToken, userId }),
//       );
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   },
// );

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
        [key: string]: any;
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

//delete site
const deleteSite = createAsyncThunk(
  "site/delete",
  async (
    {
      id,
    }: {
      id: string;
    },
    thunkApi,
  ) => {
    try {
      return thunkApi.fulfillWithValue(await SiteApi.deleteSiteById(id));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    updateAppState(state, action) {
      const { present, past } = state.sites.domain;
      const newState = action.payload;
      // Check if the new state is different from the current present state
      const isStateDifferent =
        JSON.stringify(newState.aiContent) !==
        JSON.stringify(present.aiContent);

      let hasRequiredFields = false;

      if (
        present.aiContent?.hero?.image?.imageUrl &&
        present.aiContent?.banner?.logo?.link
      ) {
        hasRequiredFields = true;
      }
      console.log("hasRequiredFields", hasRequiredFields);
      if (isStateDifferent && present.status === "Done" && hasRequiredFields) {
        console.log("hello", current(present.aiContent), newState.aiContent);
        past.push(present);

        // Ensure not to exceed the maximum history length
        if (past.length > MAX_HISTORY_LENGTH) {
          past.shift();
        }
      }

      state.sites.domain.present = newState;
    },
    undo(state) {
      const { present, past, future } = state.sites.domain;
      if (past.length > 0) {
        future.push(present);
        state.sites.domain.present = past.pop()!;
      }
    },
    redo(state) {
      const { present, past, future } = state.sites.domain;

      if (future.length > 0) {
        past.push(present);
        state.sites.domain.present = future.shift()!;
      }
    },
    clearPastAndFuture(state) {
      state.sites.domain.past = [];
      state.sites.domain.future = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSitesByDomain.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSitesByDomain.fulfilled, (state, action) => {
      state.loading = false;
      console.log("history", action.payload?.posts);
      state.sites.domain.present.view = "Desktop";
      if (action.payload?.id) {
        state.sites.domain.present.id = action.payload?.id;
      }
      state.sites.domain.present.meta = {
        title: action.payload?.title ?? "",
        description: action.payload?.description ?? "",
      };
      state.sites.domain.present.subdomain = action.payload?.subdomain ?? "";

      state.sites.domain.present.status = "Done";
      if (action?.payload?.posts) {
        state.sites.domain.present.iPosts = JSON.parse(
          action.payload?.posts ?? "",
        );
      }
      state.sites.domain.present.aiContent = JSON.parse(
        action.payload?.aiResult ?? "",
      );
    });
    builder.addCase(fetchSitesByDomain.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchSiteById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSiteById.fulfilled, (state, action) => {
      state.loading = false;

      state.sites.domain.present.generate.generating = false;
      state.sites.domain.present.generate.progress = 0;

      console.log("history", action.payload?.posts);
      state.sites.domain.present.editable = true;
      state.sites.domain.present.view = "Desktop";
      state.sites.domain.present.meta = {
        title: action.payload?.title ?? "",
        description: action.payload?.description ?? "",
      };
      if (action.payload?.id) {
        state.sites.domain.present.id = action.payload?.id;
      }
      state.sites.domain.present.subdomain = action.payload?.subdomain ?? "";

      state.sites.domain.present.status = "Done";
      if (action?.payload?.posts) {
        state.sites.domain.present.iPosts = JSON.parse(
          action.payload?.posts ?? "",
        );
      }
      state.sites.domain.present.aiContent = JSON.parse(
        action.payload?.aiResult ?? "",
      );
    });
    builder.addCase(fetchSiteById.rejected, (state) => {
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
    builder.addCase(updateSite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSite.fulfilled, (state, action) => {
      state.loading = false;
      console.log("action.payload", action.payload);
      state.sites.user?.forEach((site, index) => {
        if (site.id === action?.payload?.id) {
          if (state.sites.user) {
            state.sites.user[index] = { ...action.payload };
          }
        }
      });
    });
    builder.addCase(updateSite.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteSite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSite.fulfilled, (state, action) => {
      state.loading = false;
      console.log("action.payload", action.payload);
      const updatedData = state.sites.user?.filter(
        (site) => site.id !== action.meta.arg.id,
      );
      if (updatedData) {
        state.sites.user = updatedData;
      }
    });
    builder.addCase(deleteSite.rejected, (state) => {
      state.loading = false;
    });
  },
});

//export async thunks
export {
  fetchSitesByDomain,
  updateSite,
  fetchSitesByUser,
  deleteSite,
  fetchSiteById,
};
export const { updateAppState, undo, redo, clearPastAndFuture } =
  siteSlice.actions;
export const appState = (state: RootState) =>
  state.siteSlice.sites.domain.present;
export const pastAppState = (state: RootState) =>
  state.siteSlice.sites.domain.past;
export const futureAppState = (state: RootState) =>
  state.siteSlice.sites.domain.future;
export const sitesData = (state: RootState) => state.siteSlice.sites.user;
export const loading = (state: RootState) => state.siteSlice.loading;
export default persistReducer(persistConfig, siteSlice.reducer);
