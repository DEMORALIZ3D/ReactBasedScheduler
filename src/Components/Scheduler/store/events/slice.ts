import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EventsState, EventsList } from "./lib";

const eventsInitialState: EventsState = {
  filter: {
    eventName: null,
  },
  eventsList: null,
  filteredList: null,
  availableEvents: [],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState: eventsInitialState,
  reducers: {
    initEvents: (state, action: PayloadAction<EventsList>) => {
      const { payload } = action;
      const list =
        payload?.filter((event) => event.date && event.resourceId) ?? [];
      state.eventsList = list;
      state.filteredList = list;
      state.availableEvents =
        payload?.filter((event) => !event.date || !event.resourceId) ?? [];
    },
  },
});

export const { initEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
