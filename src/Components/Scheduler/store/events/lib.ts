export type Event = {
  id: number;
  name: string;
  meta?: Record<string, unknown>;
  resourceId?: number | string;
  date?: Date;
};

export type EventsList = Event[] | null;

export interface EventsState {
  filter: {
    eventName: string | null;
  };
  eventsList: EventsList;
  filteredList: EventsList;
  availableEvents: EventsList;
}
