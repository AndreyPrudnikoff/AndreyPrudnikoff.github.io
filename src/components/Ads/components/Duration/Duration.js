import React from "react";
// components
import { Tabs, TimeInput, DateInput } from "./components";
// style
import "./style.scss";

const Duration = () => {
  const tabs = [
    {
      id: 0,
      label: "Choose when this ad ends",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", gap: "95px" }}>
            <DateInput label="Start date" />
            <TimeInput label="Start time" />
          </div>
          <div style={{ display: "flex", gap: "95px" }}>
            <DateInput label="End date" />
            <TimeInput label="End time" />
          </div>
        </div>
      ),
    },
    {
      id: 1,
      label: "Run this ad continuously",
    },
  ];

  return (
    <div className="duration">
      <h2>Duration</h2>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default Duration;
