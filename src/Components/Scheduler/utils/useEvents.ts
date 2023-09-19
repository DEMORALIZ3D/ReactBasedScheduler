import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EventItem, EventsList } from "../store/events/lib";
import {
  initEvents,
  removeEvent as removeEventFunc,
} from "../store/events/slice";
import { useTypedSelector } from "./stateHooks";

export const useEvents = (eventsRaw: EventsList) => {
  const dispatch = useDispatch();
  const eventsList = useTypedSelector((state) => state.events.eventsList);
  const filteredEventsList = eventsList;
  const availableEvents = useTypedSelector(
    (state) => state.events.filteredList,
  );
  const isEventsListInitialised = !!(eventsList && eventsList.length > 0);

  const initialiseEvent = (payload: EventsList) =>
    dispatch(initEvents(payload));

  const init = useCallback(() => {
    if (!isEventsListInitialised && eventsRaw && eventsRaw.length > 0) {
      console.log("init", { isEventsListInitialised });
      initialiseEvent(eventsRaw);
    }
  }, [eventsRaw, isEventsListInitialised]);

  const addEvent = (date, resource, eventDetails) => {};

  const removeEvent = (eventId: EventItem["id"]) =>
    dispatch(removeEventFunc(eventId));

  useEffect(() => {
    init();
  }, [init]);

  return {
    isEventsListInitialised,
    filteredEventsList,
    initialiseEvent,
    availableEvents,
    removeEvent,
  };
};
