import { useMemo } from "react";

export const subtractDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);

  return newDate;
};

export const formatDate = (date: Date): string => {
  // convert the timezone to EST because APOD is in EST
  // this prevents a situation where the user is in timezone where the date is ahead of APOD which updates at 12am EST,
  //  which would result in an error
  const estTime = date
    .toLocaleDateString("en-US", {
      timeZone: "America/Toronto",
    })
    .split("/");

  let month = estTime[0];
  let day = estTime[1];
  let year = estTime[2];

  // add leading 0 for single digit months/days
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${year}-${month}-${day}`;
};

// returns the first date that APOD started
// while technically the date is June 6th 1995, looking at the early data, APOD became consistent after the 20th
// hence start date of June 21st of 1995
export const useFirstAPODDate = () => {
  return useMemo(() => {
    const date = new Date();
    date.setFullYear(1995);
    date.setMonth(5);
    date.setDate(21);
    return date;
  }, []);
};
