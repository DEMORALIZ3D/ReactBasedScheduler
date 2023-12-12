import { SchedulerProps } from "./lib/interfaces";
import Scheduler from "./components/Scheduler";
import { Provider } from "react-redux";
import { store } from "./store/store";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { enGB } from "date-fns/locale";
import {
  addDays,
  addWeeks,
  isAfter,
  format,
  setHours,
  setMinutes,
  parseISO,
} from "date-fns";
import { useDates } from "./utils/useDates";

const RBScheduler = (props: SchedulerProps) => {
  setDefaultOptions({
    locale: enGB,
  });
  const { formatDateForInput } = useDates();

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

    return eventSchedule;
  };

  const exampleDate = setMinutes(setHours(new Date(), 9), 0);

  console.log(
    generateEventSchedule(
      {
        startDateTime: formatDateForInput(exampleDate),
        endDateTime: formatDateForInput(setHours(addDays(exampleDate, 1), 17)),
      },
      {
        every: "days",
        frequency: 3,
        until: addDays(exampleDate, 60),
      },
    ),
  );

  return (
    <Provider store={store}>
      <Scheduler {...props} />
    </Provider>
  );
};

export default RBScheduler;
