import { DatePicker, Range, Stack, TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { formatDate, useFirstAPODDate } from "../utils/DateUtils";

export interface ModeSelectorProps {
  setSelectedDates: (date: Range) => void;
  selectedDates: Range;
}
// todo - evaluate prop drilling
const FeedDatePicker = ({
  selectedDates,
  setSelectedDates,
}: ModeSelectorProps) => {
  // pattern to match yyyy-mm-dd
  const isValidDateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

  const firstAPODDate = useFirstAPODDate();
  const currentDate = new Date();

  const [textFieldValue, setTextFieldValue] = useState("");
  const [textFieldError, setTextFieldError] = useState(false);
  const [{ month, year }, setDate] = useState({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });

  const handleMonthChange = useCallback((month, year) => {
    setDate({ month, year });
  }, []);

  const handleTextFieldChange = useCallback((value) => {
    setTextFieldValue(value);
    // validate the input
    const isValid = isValidDateRegex.test(value);
    setTextFieldError(!isValid);

    // auto set date if valid
    if (isValid) {
      const date = new Date(value.split("-").join("/"));

      setSelectedDates({ start: date, end: date });
      handleMonthChange(date.getMonth(), date.getFullYear());
    }
  }, []);

  const handleDatePickerChange = (date: Range) => {
    setSelectedDates(date);
    setTextFieldValue(formatDate(date.start));
  };

  return (
    <Stack vertical>
      <TextField
        label="Starting"
        autoComplete="false"
        placeholder="YYYY-MM-DD"
        onChange={handleTextFieldChange}
        value={textFieldValue}
        error={textFieldError && "Must match YYYY-MM-DD format"}
        id="dateTextField"
      />
      <DatePicker
        month={month}
        year={year}
        onMonthChange={handleMonthChange}
        onChange={handleDatePickerChange}
        selected={selectedDates}
        disableDatesAfter={currentDate}
        disableDatesBefore={firstAPODDate}
      />
    </Stack>
  );
};

export default FeedDatePicker;
