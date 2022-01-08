import { Card, Button, ActionList, DatePicker } from "@shopify/polaris";

import {
  SortDescendingMajor,
  HeartMajor,
  CalendarMajor,
} from "@shopify/polaris-icons";

import { useCallback, useState } from "react";

enum ViewMode {
  ENDLESS,
  LIKED,
  START_DATE,
}

const ModeSelector = () => {
  const [popoverActive, setPopoverActive] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.ENDLESS);

  const setMode = useCallback((mode: ViewMode) => setViewMode(mode), []);

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
                  onAction: () => setMode(ViewMode.ENDLESS),
                  active: viewMode == ViewMode.ENDLESS,
                },
                {
                  content: "My Liked Posts",
                  icon: HeartMajor,
                  onAction: () => setMode(ViewMode.LIKED),
                  active: viewMode == ViewMode.LIKED,
                },
                {
                  content: "Select Start Date",
                  icon: CalendarMajor,
                  onAction: () => setMode(ViewMode.START_DATE),
                  active: viewMode == ViewMode.START_DATE,
                },
              ],
            },
          ]}
        />
      </Card.Section>
      <Card.Section>
        {viewMode == ViewMode.START_DATE && (
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
