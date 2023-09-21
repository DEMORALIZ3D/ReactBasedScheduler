import { format, intervalToDuration } from "date-fns";
import { SchedulerProps } from "../lib/interfaces";
import { useDates } from "../utils/useDates";
import { useResources } from "../utils/useResources";
import { useEvents } from "../utils/useEvents";
import { formatISO } from "date-fns";
import {
  ScheduleCell,
  SheduleRow,
  EventTile,
  ResourceInfoCell,
  ScheduleActionBar,
  DateSelector,
  YearBar,
} from "../styles/Sheduler";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import ContextMenu from "../components/ContextMenu";
import AddEventDialog from "./AddEventDialog";
import { useContextMenu } from "../utils/useContextMenu";
import Avatar from "./Avatar";
import { Button } from "../styles/Button";
import { InputWrapper } from "../styles/input";

const RBScheduler = ({
  resources: resourcesRaw,
  events: eventsRaw,
  config,
}: SchedulerProps) => {
  const [addShift, setAddShift] = useState(false);
  const {
    closeContextMenu: closeResourceMenu,
    openContextMenu: openResourceMenu,
    handleContextMenu: handleResourceMenu,
    contextMenuData: resourceMenuData,
    contextMenuPosition: resourceMenuPosition,
    setContextMenuData: setResourceMenuData,
  } = useContextMenu();

  const {
    closeContextMenu: closeEventMenu,
    openContextMenu: openEventMenu,
    handleContextMenu: handleEventMenu,
    contextMenuData: eventMenuData,
    contextMenuPosition: eventMenuPosition,
  } = useContextMenu();

  const {
    selectedDate,
    allDatesOfWeek,
    setSelectedDate,
    setPrevWeek,
    setNextWeek,
    yearsInWeek,
    eachYearOfDayInWeek,
  } = useDates();

  const countUniqueElements = (arr) => {
    const uniqueCounts = {};

    arr.forEach((item) => {
      uniqueCounts[item] = (uniqueCounts[item] || 0) + 1;
    });

    return uniqueCounts;
  };

  const { filteredResourceList } = useResources(resourcesRaw);

  const { filteredEventsList, removeEvent } = useEvents(eventsRaw);

  return (
    <div>
      <div id="table">
        <ScheduleActionBar>
          <DateSelector>
            <Button variant="secondary" onClick={setPrevWeek}>
              <ArrowLeft size={16} />
            </Button>
            <InputWrapper>
              <input
                type="date"
                value={selectedDate}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedDate(evt.target.value)
                }
              />
            </InputWrapper>
            <Button variant="secondary" onClick={setNextWeek}>
              <ArrowRight size={16} />
            </Button>
          </DateSelector>
        </ScheduleActionBar>
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <YearBar>
            <div />
            {yearsInWeek.map((date, i) => {
              const uniqueOfX =
                countUniqueElements(eachYearOfDayInWeek)[date.getFullYear()];

              return (
                <div
                  key={date.toISOString() + i}
                  style={{
                    gridColumn: `span ${uniqueOfX}`,
                  }}
                >
                  {format(date, "yyyy")}
                </div>
              );
            })}
          </YearBar>
          <SheduleRow style={{ minHeight: "50px" }}>
            <div />
            {allDatesOfWeek.map((date, i) => (
              <div
                style={{ fontSize: 12, textAlign: "center" }}
                key={date.toISOString() + i}
              >
                {format(date, "EEE")}
                <div>{format(date, "do MMM")}</div>
              </div>
            ))}
          </SheduleRow>
          {filteredResourceList?.map((resource, i) => (
            <SheduleRow key={resource.name + i}>
              <ResourceInfoCell>
                <>
                  {resource.image || config.resource.avatar ? (
                    resource.image ? (
                      <div>img</div>
                    ) : (
                      <Avatar name={resource.name} />
                    )
                  ) : null}
                  {config?.resource?.slots?.map(
                    ({ resourceDataKey, textContent }) => {
                      const value = resource[resourceDataKey];
                      if (!value) return null;
                      return (
                        <div key={resourceDataKey + textContent}>
                          {`${textContent ?? ""} ${value}`}
                        </div>
                      );
                    },
                  )}
                </>
              </ResourceInfoCell>
              {allDatesOfWeek.map((date, i) => (
                <ScheduleCell
                  key={date.toISOString() + i}
                  onContextMenu={(evt) =>
                    handleResourceMenu(evt, resource, date)
                  }
                >
                  {(() => {
                    const events = filteredEventsList?.filter(
                      (event) =>
                        event.resourceId === resource.id &&
                        formatISO(event.startDate ?? new Date(), {
                          representation: "date",
                        }) === formatISO(date, { representation: "date" }),
                    );
                    return events
                      ? events
                          .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
                          .map((event, i) =>
                            event ? (
                              <EventTile
                                key={event.name + i}
                                hue={Math.floor(Math.random() * 360) + 1}
                                onContextMenu={(evt) => {
                                  handleEventMenu(evt, event, date);
                                  setResourceMenuData({
                                    data: resource,
                                    date,
                                  });
                                  evt.stopPropagation();
                                }}
                              >
                                <div>
                                  {event.name}
                                  <div>
                                    {`${format(
                                      event?.startDate ?? 0,
                                      "HH:mm",
                                    )}-${format(event?.endDate ?? 0, "HH:mm")}`}
                                  </div>
                                  <div>
                                    (hours:{" "}
                                    {
                                      intervalToDuration({
                                        start: event?.startDate ?? 0,
                                        end: event?.endDate ?? 0,
                                      }).hours
                                    }
                                    )
                                  </div>
                                </div>
                              </EventTile>
                            ) : (
                              "-"
                            ),
                          )
                      : null;
                  })()}
                </ScheduleCell>
              ))}
            </SheduleRow>
          ))}
        </div>
      </div>
      <ContextMenu
        open={openResourceMenu}
        posX={resourceMenuPosition.x}
        posY={resourceMenuPosition.y}
        closeContextMenu={closeResourceMenu}
      >
        <>
          <h5 style={{ padding: "0 8px 0 0", margin: 0 }}>
            {resourceMenuData?.data?.name}
          </h5>
          {resourceMenuData?.date ? (
            <h6 style={{ margin: 0, padding: 0 }}>
              {format(resourceMenuData.date, "PP")}
            </h6>
          ) : null}
          <hr />
          <div onClick={() => setAddShift(true)}>Add Shift</div>
          <div>View Day</div>
        </>
      </ContextMenu>
      <ContextMenu
        open={openEventMenu}
        posX={eventMenuPosition.x}
        posY={eventMenuPosition.y}
        closeContextMenu={closeEventMenu}
      >
        <>
          <h5 style={{ padding: "0 8px 0 0", margin: 0 }}>
            {eventMenuData?.data.name}
          </h5>
          <div>
            <h6 style={{ margin: 0, padding: 0 }}>
              {eventMenuData?.data.startDate &&
                format(eventMenuData?.data.startDate, "eee eo MMM, HH:mm")}{" "}
              -{" "}
              {eventMenuData?.data.endDate &&
                format(eventMenuData?.data.endDate, "eee eo MMM, HH:mm")}
            </h6>
            {eventMenuData?.data.hours ? (
              <div>Hrs: {eventMenuData?.data.hours}</div>
            ) : null}
          </div>
          <hr />
          <div
            onClick={() => {
              removeEvent(eventMenuData.data.id);
              closeEventMenu();
            }}
          >
            Remove Shift
          </div>
          <div onClick={() => setAddShift(true)}>Add another Shift</div>
        </>
      </ContextMenu>
      <AddEventDialog
        contextData={resourceMenuData}
        open={!!(addShift && resourceMenuData)}
        closeDialog={(callback) => {
          setAddShift((p) => !p);
          callback && callback();
        }}
      />
    </div>
  );
};

export default RBScheduler;
