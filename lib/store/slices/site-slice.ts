import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import SiteApi from "@/lib/api/site-api";
import { AppState, TSite } from "@/types";
import { generateUniqueId } from "@/lib/utils/function";
const MAX_HISTORY_LENGTH = 100;
type TInitialState = {
  sites: {
    domain: { past: AppState[]; present: AppState; future: AppState[] };
    user: Array<TSite> | null;
  };
  loading: boolean;
};

const initialSite = {
  subdomain: "",
  status: "Loading Instagram",
  iPosts: [],
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
      description: "",
      list: [],
      title: "",
    },
  },

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

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    updateAppState(state, action) {
      const { present, past } = state.sites.domain;
      if(present.status === "Done"){
        past.push(present);
      }
      if (past.length > MAX_HISTORY_LENGTH) {
        past.shift();
      }
      state.sites.domain.present = action.payload;
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
      console.log("future",future)
      if (future.length > 0) {
        past.push(present);
        state.sites.domain.present = future.shift()!;
      }
    },
    clearPastAndFuture(state) {
      state.sites.domain.past = [];
      state.sites.domain.future = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSitesByDomain.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSitesByDomain.fulfilled, (state, action) => {
      state.loading = false;
      state.sites.domain.present.meta = {
        title: action.payload?.title ?? "",
        description: action.payload?.description ?? "",
      };
      state.sites.domain.present.subdomain = action.payload?.subdomain ?? "";

      (state.sites.domain.present.status = "Done"),
        (state.sites.domain.present.iPosts = JSON.parse(
          action.payload?.posts ?? "",
        )),
        (state.sites.domain.present.aiContent = {
          banner: {
            businessName: JSON.parse(action.payload?.aiResult ?? "")
              .businessName,
            button: {
              ...state.sites.domain.present.aiContent.banner.button,
              list: [
                {
                  name: generateUniqueId(),
                  label: JSON.parse(action.payload?.aiResult ?? "")["hero"][
                    "cta"
                  ],
                  type: "External",
                  value: JSON.parse(action.payload?.aiResult ?? "")["hero"][
                    "ctaLink"
                  ],
                },
              ],
            },
            logo: {
              ...state.sites.domain.present.aiContent.banner.logo,
              link: action.payload?.logo ?? action.payload?.logo ?? "",
              alt: action.payload?.logo ?? "",
            },
          },
          colors: JSON.parse(action.payload?.aiResult ?? "")["colors"],
          hero: {
            button: {
              ...state.sites.domain.present.aiContent.hero.button,
              list: [
                {
                  name: generateUniqueId(),
                  label: JSON.parse(action.payload?.aiResult ?? "")["hero"][
                    "cta"
                  ],
                  type: "External",
                  value: JSON.parse(action.payload?.aiResult ?? "")["hero"][
                    "ctaLink"
                  ],
                },
              ],
            },
            heading: JSON.parse(action.payload?.aiResult ?? "")["hero"][
              "heading"
            ],
            image: {
              show: state.sites.domain.present.aiContent.hero.image.show,
              alt: state.sites.domain.present.aiContent.hero.image.alt,
              heroImagePrompt: JSON.parse(action.payload?.aiResult ?? "")[
                "heroImagePrompt"
              ],
              imageId: JSON.parse(action.payload?.aiResult ?? "")["hero"][
                "imageId"
              ],
              imageUrl: JSON.parse(action.payload?.aiResult ?? "")["hero"][
                "imageUrl"
              ],
            },
            subheading: JSON.parse(action.payload?.aiResult ?? "")["hero"][
              "subheading"
            ],
          },
          services: JSON.parse(action.payload?.aiResult ?? "")["services"],
        });
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
    builder.addCase(updateSite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSite.fulfilled, (state, action) => {
      state.loading = false;
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
  },
});

//export async thunks
export { fetchSitesByDomain, createSite, updateSite, fetchSitesByUser };
export const { updateAppState,undo,redo,clearPastAndFuture } = siteSlice.actions;
export const appState = (state: RootState) => state.siteSlice.sites.domain.present;
export const pastAppState = (state: RootState) => state.siteSlice.sites.domain.past;
export const futureAppState = (state: RootState) => state.siteSlice.sites.domain.future;
export const sitesData = (state: RootState) => state.siteSlice.sites.user;
export const loading = (state: RootState) => state.siteSlice.loading;
export default siteSlice.reducer;
