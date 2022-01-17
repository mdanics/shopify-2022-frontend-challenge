import { DatePicker, Range } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useFirstAPODDate } from "../utils/DateUtils";

export interface ModeSelectorProps {
  setSelectedDates: (date: Range) => void;
  selectedDates: Range;
}
// todo - evaluate prop drilling
const FeedDatePicker = ({
  selectedDates,
  setSelectedDates,
}: ModeSelectorProps) => {
  const firstAPODDate = useFirstAPODDate();
  const currentDate = new Date();

  const [{ month, year }, setDate] = useState({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });

  const handleMonthChange = useCallback((month, year) => {
    setDate({ month, year });
  }, []);

  return (
    <DatePicker
      month={month}
      year={year}
      onMonthChange={handleMonthChange}
      onChange={setSelectedDates}
      selected={selectedDates}
      disableDatesAfter={currentDate}
      disableDatesBefore={firstAPODDate}
    />
  );
};

export default FeedDatePicker;
