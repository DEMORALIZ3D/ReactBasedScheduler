import {
  addDays,
  addWeeks,
  format,
  formatISO,
  getHours,
  getMinutes,
  isAfter,
  isSameDay,
  setHours,
  setMinutes,
} from "date-fns";
import { ResourceItem } from "../store/resources/lib";
import { AddEventForm } from "../styles/Sheduler";
import Dialog from "./Dialog/Dialog";
import { InputWrapper } from "../styles/input";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../styles/Button";
import { useEvents } from "../utils/useEvents";
import { useDates } from "../utils/useDates";

interface AddEventDialogProps {
  open: boolean;
  closeDialog: (cb?: () => void) => void;
  contextData?: {
    date: Date;
    resource: ResourceItem;
  } | null;
}

const AddEventDialog = ({
  open,
  closeDialog,
  contextData,
}: AddEventDialogProps) => {
  const { setSelectedDate, allDatesOfWeek, formatDateForInput } = useDates();

  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  const [copyDays, setCopyDays] = useState<Record<string, boolean>>({});
  const [repeatsEvery, setRepeatsEvery] = useState<{
    every: string;
    frequency: string;
    until: string;
  }>({ every: "weeks", frequency: "0", until: "" });

  const { addEvent } = useEvents();

  const closeEventDialog = () => {
    setCopyDays({});
    closeDialog();
  };

  useEffect(() => {
    if (contextData && contextData.date) {
      setSelectedDate(formatISO(contextData.date, { representation: "date" }));
      setCopyDays((p) => ({ ...p, [contextData.date.toJSON()]: true }));
      setStartDateTime(
        formatDateForInput(setMinutes(setHours(contextData.date, 9), 0)),
      );
      setEndDateTime(
        formatDateForInput(setMinutes(setHours(contextData.date, 17), 30)),
      );
    }
  }, [contextData]);

  const buttons = () => {
    return (
      <>
        <Button variant="secondary" onClick={closeEventDialog}>
          cancel
        </Button>
        <Button form="add-event-form" type="submit">
          Submit
        </Button>
      </>
    );
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const target = evt.target;
    const { eventName } = target;
    const changeDate = (newDate, dateString: string) =>
      String(
        setMinutes(
          setHours(new Date(newDate), getHours(new Date(dateString))),
          getMinutes(new Date(dateString)),
        ),
      );
    if (contextData) {
      if (Number(repeatsEvery.frequency) > 0) {
        const generateEventSchedule = (event, repeatsEvery) => {
          const { startDateTime, endDateTime } = event;
          const { every, frequency, until } = repeatsEvery;
          const eventSchedule = [];

          let startDate = new Date(startDateTime);
          let endDate = new Date(endDateTime);
          const untilDate = new Date(until);

          const addFunction = every === "days" ? addDays : addWeeks;

          while (!isAfter(startDate, untilDate)) {
            const currentEventStart = new Date(startDate);
            const currentEventEnd = new Date(endDate);

            eventSchedule.push({
              startDateTime: format(currentEventStart, "yyyy-MM-dd HH:mm:ss"),
              endDateTime: format(currentEventEnd, "yyyy-MM-dd HH:mm:ss"),
            });

            startDate = addFunction(startDate, frequency);
            endDate = addFunction(endDate, frequency);
          }
          console.log({ eventSchedule });
          return eventSchedule;
        };
        const allDates = generateEventSchedule(
          { startDateTime, endDateTime },
          repeatsEvery,
        );
        if (allDates) {
          allDates.forEach((dates) => {
            addEvent({
              eventName,
              startDateTime: formatDateForInput(dates.startDateTime),
              endDateTime: formatDateForInput(dates.endDateTime),
              contextData,
            });
          });
        }
      } else {
        addEvent({ eventName, startDateTime, endDateTime, contextData });
      }
      if (Object.entries(copyDays).length > 1) {
        Object.entries(copyDays)
          .filter((kvp) => kvp[0] !== contextData.date.toJSON())
          .forEach((kvp) => {
            const startDateChanged = changeDate(kvp[0], startDateTime);
            const endDateChanged = changeDate(kvp[0], endDateTime);
            addEvent({
              eventName,
              startDateTime: startDateChanged,
              endDateTime: endDateChanged,
              contextData,
            });
          });
      }

      closeEventDialog();
    } else {
      new Error("no context data found to submit");
    }
  };

  if (!contextData) {
    new Error("unable to find resource context");
  }

  return (
    <Dialog open={open} title="Add Event" buttons={buttons}>
      <AddEventForm id="add-event-form" onSubmit={onSubmit}>
        <InputWrapper>
          <label>Event Name:</label>
          <input name="eventName" type="text" />
        </InputWrapper>
        <InputWrapper>
          <label>Start time:</label>
          <input
            name="startTime"
            value={startDateTime}
            onChange={(evt) => setStartDateTime(evt.target.value)}
            type="datetime-local"
          />
        </InputWrapper>
        <InputWrapper>
          <label>End time:</label>
          <input
            name="endTime"
            type="datetime-local"
            value={endDateTime}
            onChange={(evt) => setEndDateTime(evt.target.value)}
          />
        </InputWrapper>
        {isSameDay(new Date(startDateTime), new Date(endDateTime)) ? (
          <div>
            <h5 style={{ margin: "8px 0" }}>Clone Event</h5>
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "space-evenly",
              }}
            >
              {allDatesOfWeek.map((date: Date) => {
                const dateJSON = date.toJSON();
                return (
                  <div key={dateJSON}>
                    <label htmlFor={dateJSON}>{format(date, "eee")}</label>
                    <input
                      id={dateJSON}
                      type="checkbox"
                      disabled={isSameDay(new Date(startDateTime), date)}
                      checked={copyDays[dateJSON] ?? false}
                      onChange={() =>
                        setCopyDays((p) => ({
                          ...p,
                          [dateJSON]: !p[dateJSON],
                        }))
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h5 style={{ margin: "8px 0" }}>Event Repeat</h5>
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <label>Event repeats every</label>
                <input
                  type="number"
                  style={{ width: "50px" }}
                  value={repeatsEvery.frequency}
                  onChange={(evt) =>
                    setRepeatsEvery((p) => ({
                      ...p,
                      frequency: evt.target.value,
                    }))
                  }
                />
                <select
                  value={repeatsEvery.every}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
                    setRepeatsEvery((p) => ({ ...p, every: evt.target.value }))
                  }
                >
                  <option value="none">none</option>
                  <option value="weeks">Weeks</option>
                  <option value="days">Days</option>
                </select>
                <label>until</label>
                <input
                  type="date"
                  value={repeatsEvery.until}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
                    setRepeatsEvery((p) => ({ ...p, until: evt.target.value }))
                  }
                />
              </div>
            </div>
          </div>
        )}
        <InputWrapper>
          <label>Event Description:</label>
          <textarea name="event-description" />
        </InputWrapper>
      </AddEventForm>
    </Dialog>
  );
};

export default AddEventDialog;
