import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import SiteApi from "@/lib/api/site-api";
import { AppState, TSite } from "@/types";

type TInitialState = {
  sites: {
    domain: AppState;
    user: Array<TSite> | null;
  };
  loading: boolean;
};

const initialState: TInitialState = {
  sites: {
    domain: {
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
  reducers: {
    updateAppState(state, action) {
      state.sites.domain = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSitesByDomain.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSitesByDomain.fulfilled, (state, action) => {
      state.loading = false;
      state.sites.domain.meta = {
        title: action.payload?.title ?? "",
        description: action.payload?.description ?? "",
      };
      (state.sites.domain.status = "Done"),
        (state.sites.domain.iPosts = JSON.parse(action.payload?.posts ?? "")),
        (state.sites.domain.aiContent = {
          banner: {
            businessName: JSON.parse(action.payload?.aiResult ?? "")
              .businessName,
            button: {
              ...state.sites.domain.aiContent.banner.button,
              list: [
                {
                  label: "Explore More",
                  type: "External",
                  value: "#",
                },
              ],
            },
            logo: {
              ...state.sites.domain.aiContent.banner.logo,
              link: action.payload?.logo ?? action.payload?.logo ?? "",
              alt: action.payload?.logo ?? "",
            },
          },
          colors: JSON.parse(action.payload?.aiResult ?? "")["colors"],
          hero: {
            button: {
              ...state.sites.domain.aiContent.hero.button,
              list: [
                {
                  label: "Explore More",
                  type: "External",
                  value: "#",
                },
              ],
            },
            heading: JSON.parse(action.payload?.aiResult ?? "")["hero"][
              "heading"
            ],
            image:{
              show: state.sites.domain.aiContent.hero.image.show,
              alt:state.sites.domain.aiContent.hero.image.alt,
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
export const { updateAppState } = siteSlice.actions;
export const appState = (state: RootState) => state.siteSlice.sites.domain;
export const sitesData = (state: RootState) => state.siteSlice.sites.user;
export const loading = (state: RootState) => state.siteSlice.loading;
export default siteSlice.reducer;
