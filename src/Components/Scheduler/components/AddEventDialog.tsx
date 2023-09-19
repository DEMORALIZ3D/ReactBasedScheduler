import { setHours, setMinutes } from "date-fns";
import { useDispatch } from "react-redux";
import { addEvent } from "../store/events/slice";
import { ResourceItem } from "../store/resources/lib";
import { AddEventForm } from "../styles/Sheduler";
import Dialog from "./Dialog/Dialog";
import { InputWrapper } from "../styles/input";
import { useEffect, useState } from "react";
import { Button } from "../styles/Button";

interface AddEventDialogProps {
  open: boolean;
  closeDialog: () => void;
  contextData?: {
    date: Date;
    resource: ResourceItem;
    event?: Event;
  } | null;
}

const AddEventDialog = ({
  open,
  closeDialog,
  contextData,
}: AddEventDialogProps) => {
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1 and format as two digits.
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (contextData && contextData.date) {
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
        <Button variant="secondary" onClick={closeDialog}>
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
    const { data } = contextData;

    dispatch(
      addEvent({
        id: data.id + new Date(startDateTime).getTime(),
        name: eventName?.value,
        resourceId: data.id,
        startDate: new Date(startDateTime),
        endDate: new Date(endDateTime),
      }),
    );
    closeDialog();
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
        <InputWrapper>
          <label>Event Description:</label>
          <textarea name="event-description" />
        </InputWrapper>
      </AddEventForm>
    </Dialog>
  );
};

export default AddEventDialog;
