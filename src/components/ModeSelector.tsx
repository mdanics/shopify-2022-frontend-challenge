import {
  Card,
  Button,
  ActionList,
  DatePicker,
  Range,
  Collapsible,
} from "@shopify/polaris";

import {
  SortDescendingMajor,
  HeartMajor,
  SearchMajor,
  SearchMinor,
} from "@shopify/polaris-icons";

import { useCallback, useState } from "react";
import FadeUp from "../animations/FadeUp";
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
    <FadeUp>
      <Card title="Settings">
        <FadeUp>
          <Card.Section>
            <p>
              Select a date to start exploring from or view your Liked Posts
            </p>
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
          <Collapsible
            id="date-picker-collapsible"
            open={viewMode === ViewModes.BROWSE}
            transition={{ duration: "300ms", timingFunction: "ease-in-out" }}
            expandOnPrint
          >
            <Card.Section subdued>
              <FeedDatePicker
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
              />
            </Card.Section>
          </Collapsible>
        </FadeUp>
      </Card>
    </FadeUp>
  );
};

export default ModeSelector;
