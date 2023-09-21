export type EventItem = {
  id: number;
  name: string;
  meta?: Record<string, unknown> | null;
  resourceId: number | string | null;
  startDate: Date | null;
  endDate: Date | null;
};

export type EventsList = EventItem[] | null;

export interface EventsState {
  filter: {
    eventName: string | null;
  };
  eventsList: EventsList;
  filteredList: EventsList;
  availableEvents: EventsList;
  newEvents: EventsList;
}
