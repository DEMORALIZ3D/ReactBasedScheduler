import { format } from "date-fns";
import { SchedulerProps } from "../lib/interfaces";
import { useDates } from "../utils/useDates";
import { useResources } from "../utils/useResources";
import { useEvents } from "../utils/useEvents";
import { formatISO } from "date-fns";
import { ScheduleView, SheduleRow, EventTile } from "../styles/Sheduler";

const RBScheduler = ({
  resources: resourcesRaw,
  events: eventsRaw,
}: SchedulerProps) => {
  const { selectedDay, allDatesOfWeek } = useDates();

  const { filteredResourceList } = useResources(resourcesRaw);

  const { filteredEventsList } = useEvents(eventsRaw);

  return (
    <div>
      <div>
        <div>
          <div>topbar</div>
          <ScheduleView>
            <SheduleRow>
              <div />
              {allDatesOfWeek.map((date, i) => (
                <EventTile key={date.toISOString() + i}>
                  {format(date, "EEE")}
                  <div>{format(date, "do MMM-yy")}</div>
                </EventTile>
              ))}
            </SheduleRow>
            <div>
              {filteredResourceList?.map((resource, i) => (
                <SheduleRow key={resource.name + i}>
                  <div>{resource.name}</div>
                  {allDatesOfWeek.map((date, i) => (
                    <div
                      key={date.toISOString() + i}
                      style={{
                        minWidth: "100px",
                        flexBasis: "100px",
                      }}
                    >
                      {(() => {
                        const events = filteredEventsList?.filter(
                          (event) =>
                            event.resourceId === resource.id &&
                            formatISO(event.date ?? new Date(), {
                              representation: "date",
                            }) === formatISO(date, { representation: "date" }),
                        );
                        return events
                          ? events.map((event, i) => (
                              <EventTile key={event.name + i}>
                                {event.name}
                              </EventTile>
                            ))
                          : "-";
                      })()}
                    </div>
                  ))}
                </SheduleRow>
              ))}
            </div>
          </ScheduleView>
        </div>
      </div>
    </div>
  );
};

export default RBScheduler;
