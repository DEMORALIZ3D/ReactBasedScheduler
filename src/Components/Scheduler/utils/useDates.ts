import {
  addDays,
  eachDayOfInterval,
  setDefaultOptions,
  startOfWeek as startOfWeekDFNS,
} from "date-fns";
import { enGB } from "date-fns/locale";
import { useState } from "react";

export const useDates = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const startOfWeek = startOfWeekDFNS(selectedDate);
  const endOfWeek = addDays(startOfWeek, 6);

  const allDatesOfWeek = eachDayOfInterval({
    start: startOfWeek,
    end: endOfWeek,
  });

  return {
    selectedDate,
    startOfWeek,
    endOfWeek,
    allDatesOfWeek,
    setSelectedDate,
  };
};
