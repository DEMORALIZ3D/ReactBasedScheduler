import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  formatISO,
  startOfWeek as startOfWeekDFNS,
  subWeeks,
  eachYearOfInterval,
} from "date-fns";
import { useMemo, useState } from "react";

export const useDates = () => {
  // const today = new Date(2024, 11, 30);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    formatISO(today, { representation: "date" }),
  );

  const startOfWeek = useMemo(
    () => startOfWeekDFNS(new Date(selectedDate)),
    [selectedDate],
  );
  const endOfWeek = useMemo(() => addDays(startOfWeek, 6), [startOfWeek]);

  const setNextWeek = () => {
    setSelectedDate(() =>
      formatISO(addWeeks(new Date(startOfWeek), 1), { representation: "date" }),
    );
  };
  const setPrevWeek = () => {
    setSelectedDate(() =>
      formatISO(subWeeks(new Date(startOfWeek), 1), { representation: "date" }),
    );
  };

  const allDatesOfWeek = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek,
        end: endOfWeek,
      }),
    [startOfWeek, endOfWeek],
  );
  const eachYearOfDayInWeek = allDatesOfWeek.map((date) => date.getFullYear());

  const yearsInWeek = useMemo(
    () =>
      eachYearOfInterval({
        start: allDatesOfWeek[0],
        end: allDatesOfWeek[allDatesOfWeek.length - 1],
      }),
    [allDatesOfWeek],
  );

  const formatDateForInput = (date: Date, dateTime = true) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1 and format as two digits.
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return dateTime
      ? `${year}-${month}-${day}T${hours}:${minutes}`
      : `${year}-${month}-${day}`;
  };

  return {
    selectedDate,
    startOfWeek,
    endOfWeek,
    allDatesOfWeek,
    setSelectedDate,
    setNextWeek,
    setPrevWeek,
    eachYearOfDayInWeek,
    yearsInWeek,
    formatDateForInput,
  };
};
