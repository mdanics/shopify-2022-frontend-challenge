import { Card, Button, ActionList, DatePicker } from "@shopify/polaris";

import { useCallback, useState } from "react";

const ModeSelector = () => {
  const [popoverActive, setPopoverActive] = useState(true);
  const [endlessMode, setEndlessMode] = useState(true);

  const toggleEndlessMode = useCallback(
    () => setEndlessMode((endlessMode) => !endlessMode),
    []
  );

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });

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
                  onAction: () => setEndlessMode(true),
                  active: endlessMode,
                },
                {
                  content: "Select Start Date",
                  onAction: () => setEndlessMode(false),
                  active: !endlessMode,
                },
              ],
            },
          ]}
        />
      </Card.Section>
      <Card.Section>
        {!endlessMode && (
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
