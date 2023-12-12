import { ChangeEvent, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EventItem, EventsList } from "../store/events/lib";
import {
  initEvents,
  addEvent as addEventFunc,
  removeEvent as removeEventFunc,
} from "../store/events/slice";
import { useTypedSelector } from "./stateHooks";
import { ResourceItem } from "../store/resources/lib";
import initialiseEvent from "./intitialiseEvent";

export const useEvents = (eventsRaw?: EventsList) => {
  const dispatch = useDispatch();
  const eventsList = useTypedSelector((state) => state.events.eventsList);
  const filteredEventsList = eventsList;
  const availableEvents = useTypedSelector(
    (state) => state.events.filteredList,
  );
  const isEventsListInitialised = !!(eventsList && eventsList.length > 0);

  const initialiseEvents = (payload: EventsList) =>
    dispatch(initEvents(payload));

  const init = useCallback(() => {
    if (!isEventsListInitialised && eventsRaw && eventsRaw.length > 0) {
      initialiseEvents(eventsRaw);
    }
  }, [eventsRaw, isEventsListInitialised]);

  const addEvent = (props: {
    eventName: ChangeEvent<HTMLInputElement>["target"];
    startDateTime: string;
    endDateTime: string;
    contextData: {
      date: Date;
      resource: ResourceItem;
    };
  }) => {
    const { eventName, startDateTime, endDateTime, contextData } = props;
    const { data } = contextData;
    const event = initialiseEvent({
      name: String(eventName?.value),
      resourceId: Number(data.id),
      startDate: startDateTime,
      endDate: endDateTime,
    });
    if (event) {
      dispatch(addEventFunc(event));
    }
  };

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
    addEvent,
  };
};
