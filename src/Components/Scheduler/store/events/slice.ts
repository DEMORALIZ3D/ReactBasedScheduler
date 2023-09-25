import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EventsState, EventsList } from "./lib";
import { EventItem } from "../events/lib";
import { eachDayOfInterval, format, formatISO, isSameDay } from "date-fns";

const eventsInitialState: EventsState = {
  filter: {
    eventName: null,
  },
  eventsList: null,
  filteredList: null,
  newEvents: [],
  availableEvents: [],
};

export const processEvents = (events: EventsList) => {
  const processedEvents = events.flatMap((event) => {
    const { startDate: sd, endDate: ed } = event;
    const startDate = new Date(sd!);
    const endDate = new Date(ed!);
    const isEventSameDay = isSameDay(startDate!, endDate!);
    const daysInInterval = eachDayOfInterval({
      start: startDate!,
      end: endDate!,
    });
    if (isEventSameDay) {
      return [event]; // Wrap the single event in an array
    }
    const events = Array.from(Array(daysInInterval.length), (_, i) => {
      const currentDate = new Date(startDate!);
      currentDate.setDate(startDate!.getDate() + i);

      const isStartDate = i === 0;
      const isEndDate = i === daysInInterval.length - 1;

      const newStartDate = new Date(currentDate);
      const newEndDate = new Date(currentDate);

      if (isStartDate) {
        newStartDate.setHours(startDate!.getHours());
        newStartDate.setMinutes(startDate!.getMinutes());
      } else {
        newStartDate.setHours(0);
        newStartDate.setMinutes(0);
      }

      if (isEndDate) {
        newEndDate.setHours(endDate!.getHours());
        newEndDate.setMinutes(endDate!.getMinutes());
      } else {
        newEndDate.setHours(23);
        newEndDate.setMinutes(59);
      }

      return {
        ...event,
        startDate: formatISO(newStartDate),
        endDate: formatISO(newEndDate),
      };
    });

    return events;
  });

  return processedEvents;
};

export const eventsSlice = createSlice({
  name: "events",
  initialState: eventsInitialState,
  reducers: {
    initEvents: (state, action: PayloadAction<EventsList>) => {
      const { payload } = action;
      const list = processEvents(
        payload?.filter((event) => event.startDate && event.resourceId) ?? [],
      );
      state.eventsList = list;
      state.filteredList = list;
      state.availableEvents =
        payload?.filter((event) => !event.startDate || !event.resourceId) ?? [];
    },
    addEvent: (state, { payload }: PayloadAction<EventItem>) => {
      state.eventsList = [
        ...(state.eventsList ?? []),
        ...processEvents([payload]),
      ] as EventsList;
    },
    removeEvent: (state, { payload }: PayloadAction<EventItem["id"]>) => {
      state.eventsList = state.eventsList.filter((e) => e.id !== payload);
    },
  },
});

export const { initEvents, addEvent, removeEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
