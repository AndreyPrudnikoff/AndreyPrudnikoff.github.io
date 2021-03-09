import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
// components
import { Tabs, TimeInput, DateInput } from "./components";
// style
import "./style.scss";
import {connect} from "react-redux";
import {setEndDate, setEndTime, setStartDate, setStartTime, setIsCorrectDateToStore} from "../../../../redux/actions/advertising";

const Duration = ({setStartDate, setStartTime, setEndDate, setEndTime, startTime, setIsCorrectDateToStore, isCorrectDateFromStore}) => {
  const [dateStart, setDateStart] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const [dateEnd, setDateEnd] = useState(0);
  const [timeEnd, setTimeEnd] = useState(0);
  const [isStartDate, setIsStartDate] = useState(true);
  const [isCorrectDate, setIsCorrectDate] = useState(true);

  useEffect(() => {
    const dateNow = dayjs().valueOf(true);
    let enteredStartDate = dayjs(`${dateStart}T${timeStart}`).valueOf(true);
	  let enteredEndDate = dayjs(`${dateEnd}T${timeEnd}`).valueOf(true);
    if(dateStart !== 0 && timeStart !== 0) {
      if(enteredStartDate > dateNow) {
        setIsStartDate(true)
      } else if (enteredStartDate < dateNow) {
        setIsStartDate(false)
      }
    }

	if(dateStart !== 0 && timeStart !== 0 && dateEnd !==0 && timeEnd !== 0) {
		if(enteredEndDate > enteredStartDate) {
			setIsCorrectDate(true)
		} else if (enteredEndDate < enteredStartDate) {
			setIsCorrectDate(false)
		}
	}

	if(isStartDate && isCorrectDate) {
		setIsCorrectDateToStore(true)
	} else {
		setIsCorrectDateToStore(false)
	}
    
  }, [dateStart, timeStart, dateEnd, timeEnd])

  

  const tabs = [
    {
      id: 0,
      label: "Choose when this ad ends",
      content: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", marginBottom: '20px', justifyContent: 'space-between'}} >
            <DateInput onChange={(e) => {setStartDate(e); setDateStart(e)}} label="Start date" invalid={!isStartDate} />
            <TimeInput onChange={(e) => {setStartTime(e); setTimeStart(e)}} label="Start time" invalid={!isStartDate}/>
          </div>
          <div style={{ display: "flex", justifyContent: 'space-between' }}>
            <DateInput onChange={(e) => {setEndDate(e); setDateEnd(e)}} label="End date" invalid={!isCorrectDate} />
            <TimeInput onChange={(e) => {setEndTime(e); setTimeEnd(e)}} label="End time" invalid={!isCorrectDate} />
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


const mapStateToProps = state => {
  return {
    isCorrectDateFromStore: state.adsOptions.isCorrectDate
  }
}

const mapDispatchToProps = {
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
	setIsCorrectDateToStore
}
export default connect(mapStateToProps, mapDispatchToProps)(Duration);
