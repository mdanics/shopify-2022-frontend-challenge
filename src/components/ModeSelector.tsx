import { Card, Button, ActionList, DatePicker } from "@shopify/polaris";

import {
  SortDescendingMajor,
  HeartMajor,
  CalendarMajor,
} from "@shopify/polaris-icons";

import { useCallback, useState } from "react";

export enum ViewModes {
  ENDLESS,
  LIKED,
  START_DATE,
}

interface ModeSelectorProps {
  viewMode: ViewModes;
  setMode: (mode: ViewModes) => void;
}

const ModeSelector = ({ viewMode, setMode }: ModeSelectorProps) => {
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });

  const handleFilterSelect = () => {};

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Scroll Mode
    </Button>
  );

  return (
    <Card title="Spacestagram Settings">
      <Card.Section>
        <p>
          Choose either endless scroll mode or pictures starting at a certain
          date
        </p>
        <ActionList
          sections={[
            {
              items: [
                {
                  content: "Endless",
                  icon: SortDescendingMajor,
                  onAction: () => setMode(ViewModes.ENDLESS),
                  active: viewMode == ViewModes.ENDLESS,
                },
                {
                  content: "My Liked Posts",
                  icon: HeartMajor,
                  onAction: () => setMode(ViewModes.LIKED),
                  active: viewMode == ViewModes.LIKED,
                },
                {
                  content: "Select Start Date",
                  icon: CalendarMajor,
                  onAction: () => setMode(ViewModes.START_DATE),
                  active: viewMode == ViewModes.START_DATE,
                },
              ],
            },
          ]}
        />
      </Card.Section>
      <Card.Section>
        {viewMode == ViewModes.START_DATE && (
          <DatePicker
            month={month}
            year={year}
            onMonthChange={handleMonthChange}
          />
        )}
      </Card.Section>
    </Card>
  );
};

export default ModeSelector;
