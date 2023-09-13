import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EventsList } from "../store/events/lib";
import { initEvents } from "../store/events/slice";
import { useTypedSelector } from "./stateHooks";

export const useEvents = (eventsRaw: EventsList) => {
  const dispatch = useDispatch();
  const eventsList = useTypedSelector((state) => state.events.eventsList);
  const filteredEventsList = useTypedSelector(
    (state) => state.events.filteredList,
  );
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

  useEffect(() => {
    init();
  }, [init]);

  return {
    isEventsListInitialised,
    filteredEventsList,
    initialiseEvent,
    availableEvents,
  };
};
