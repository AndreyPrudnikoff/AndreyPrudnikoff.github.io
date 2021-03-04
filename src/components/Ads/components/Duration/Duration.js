import React from "react";
// components
import { Tabs, TimeInput, DateInput } from "./components";
// style
import "./style.scss";
import {connect} from "react-redux";
import {setEndDate, setEndTime, setStartDate, setStartTime} from "../../../../redux/actions/advertising";

const Duration = ({setStartDate, setStartTime, setEndDate, setEndTime, startTime}) => {
  const tabs = [
    {
      id: 0,
      label: "Choose when this ad ends",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", gap: "95px" }}>
            <DateInput onChange={setStartDate} label="Start date" />
            <TimeInput onChange={setStartTime} label="Start time" />
          </div>
          <div style={{ display: "flex", gap: "95px" }}>
            <DateInput onChange={setEndDate} label="End date" />
            <TimeInput onChange={setEndTime} label="End time" />
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

// const mapStateToProps = state => {
//   console.log(state.adsOptions.banner_start_time)
//   console.log(state.adsOptions.banner_end_time)
//   return {
//     startTime: state.adsOptions.banner_start_time
//   }
  
// }
const mapDispatchToProps = {
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
}
export default connect(null, mapDispatchToProps)(Duration);
