import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
// components
import { Tabs, TimeInput, DateInput } from "./components";
// style
import "./style.scss";
import {connect} from "react-redux";
import {setEndDate, setEndTime, setStartDate, setStartTime} from "../../../../redux/actions/advertising";

const Duration = ({setStartDate, setStartTime, setEndDate, setEndTime, startTime}) => {
  const [dateStart, setDateStart] = useState();
  const [timeStart, setTimeStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [isStartDate, setIsStartDate] = useState(true);
  const [isEndDate, setIsEndDate] = useState(true);

  useEffect(() => {
    console.log(dateStart, timeStart, dateEnd, timeEnd)
    const dateNow = dayjs().valueOf();
    let enteredDate = dayjs(`${dateStart}T${timeStart}`).valueOf();
    console.log(dayjs(`${dateStart}T${timeStart}`).valueOf(), dayjs().valueOf())
    if(enteredDate > dateNow) {
      setIsStartDate(true)
    } else if (enteredDate < dateNow) {
      setIsStartDate(false)
    }
  }, [dateStart, timeStart, dateEnd, timeEnd])

  const tabs = [
    {
      id: 0,
      label: "Choose when this ad ends",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", gap: "95px" }}>
            <DateInput onChange={(e) => {setStartDate(e); setDateStart(e)}} label="Start date" />
            <TimeInput onChange={(e) => {setStartTime(e); setTimeStart(e)}} label="Start time" />
          </div>
          <div style={{ display: "flex", gap: "95px" }}>
            <DateInput onChange={(e) => {setEndDate(e); setDateEnd(e)}} label="End date" />
            <TimeInput onChange={(e) => {setEndTime(e); setTimeEnd(e)}} label="End time" />
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
