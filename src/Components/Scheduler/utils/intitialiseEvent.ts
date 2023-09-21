import { EventItem } from "../store/events/lib";

const initialiseEvent = (eventPayload: Omit<EventItem, "id">) => {
  const { resourceId, startDate, name, meta, endDate } = eventPayload;
  if (resourceId && startDate) {
    const id = Number(resourceId) + new Date(startDate).getTime();
    return {
      id,
      name,
      meta,
      startDate,
      endDate,
      resourceId,
    };
  } else {
    new Error("data missing to initialise event");
  }
};

export default initialiseEvent;
