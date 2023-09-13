import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ResourceList =
  | {
      image: string | null;
      name: string;
      [key: string]: unknown;
    }[]
  | null;

interface ResourcesState {
  filter: {
    resourceName: string | null;
  };
  sort: {
    key: string | null;
    direction: "asc" | "desc";
  };
  resourceList: ResourceList;
  filteredList: ResourceList;
  groupBy: {
    key: string | number | null;
    friendlyName: string | null;
  };
}

const resourceInitialState: ResourcesState = {
  filter: {
    resourceName: null,
  },
  sort: {
    key: null,
    direction: "asc",
  },
  resourceList: null,
  filteredList: null,
  groupBy: {
    key: null,
    friendlyName: null,
  },
};

export const resourcesSlice = createSlice({
  name: "resources",
  initialState: resourceInitialState,
  reducers: {
    initResource: (state, action: PayloadAction<ResourceList>) => {
      const { payload } = action;
      state.resourceList = payload;
      state.filteredList = payload;
    },
  },
});

export const { initResource } = resourcesSlice.actions;

export default resourcesSlice.reducer;
