import { Card, Button, ActionList, DatePicker, Range } from "@shopify/polaris";

import {
  SortDescendingMajor,
  HeartMajor,
  SearchMajor,
  SearchMinor,
} from "@shopify/polaris-icons";

import { useCallback, useState } from "react";
import { formatDate, useFirstAPODDate } from "../utils/DateUtils";
import FeedDatePicker from "./FeedDatePicker";

export enum ViewModes {
  BROWSE,
  LIKED,
}

export interface ModeSelectorProps {
  viewMode: ViewModes;
  setMode: (mode: ViewModes) => void;
  setSelectedDates: (date: Range) => void;
  selectedDates: Range;
}

const ModeSelector = ({
  viewMode,
  setMode,
  setSelectedDates,
  selectedDates,
}: ModeSelectorProps) => {
  return (
    <Card title="Settings">
      <Card.Section>
        <p>Select a date to start exploring from or view your Liked Posts</p>
        <ActionList
          sections={[
            {
              items: [
                {
                  content: "My Liked Posts",
                  icon: HeartMajor,
                  onAction: () => setMode(ViewModes.LIKED),
                  active: viewMode == ViewModes.LIKED,
                },
                {
                  content: "Explore",
                  helpText: "Starting: " + formatDate(selectedDates.end),
                  icon: SearchMajor,
                  onAction: () => setMode(ViewModes.BROWSE),
                  active: viewMode == ViewModes.BROWSE,
                },
              ],
            },
          ]}
        />
      </Card.Section>
      {viewMode == ViewModes.BROWSE && (
        <Card.Section subdued>
          <FeedDatePicker
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        </Card.Section>
      )}
    </Card>
  );
};

export default ModeSelector;
