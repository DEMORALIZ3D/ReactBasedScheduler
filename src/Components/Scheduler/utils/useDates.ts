import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  formatISO,
  startOfWeek as startOfWeekDFNS,
  subWeeks,
  eachYearOfInterval,
} from "date-fns";
import { useState } from "react";

export const useDates = () => {
  const today = new Date(2024, 11, 30);
  const [selectedDate, setSelectedDate] = useState(
    formatISO(today, { representation: "date" }),
  );

  const startOfWeek = startOfWeekDFNS(new Date(selectedDate));
  const endOfWeek = addDays(startOfWeek, 6);

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

  const allDatesOfWeek = eachDayOfInterval({
    start: startOfWeek,
    end: endOfWeek,
  });
  const eachYearOfDayInWeek = allDatesOfWeek.map((date) => date.getFullYear());

  const yearsInWeek = eachYearOfInterval({
    start: allDatesOfWeek[0],
    end: allDatesOfWeek[allDatesOfWeek.length - 1],
  });

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
  };
};
