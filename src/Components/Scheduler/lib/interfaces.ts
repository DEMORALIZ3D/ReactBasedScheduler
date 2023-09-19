import { ResourceList } from "../store/resources/lib";
import { EventsList } from "../store/events/lib";

export interface SchedulerProps {
  resources: ResourceList;
  events: EventsList;
  config: {
    resource: {
      slots: {
        resourceDataKey: string;
        textContent?: string;
      }[];
    };
  };
}
