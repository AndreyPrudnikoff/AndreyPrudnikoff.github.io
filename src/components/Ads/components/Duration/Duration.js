import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
// components
import { Tabs, TimeInput, DateInput } from "./components";
// style
import "./style.scss";
import {connect} from "react-redux";
import {start_date_err,
        start_time_err,
        end_date_err,
        end_time_err} from '../../../../redux/actions/ad_errors'
import {setEndDate, setEndTime, setStartDate, setStartTime, setIsCorrectDateToStore} from "../../../../redux/actions/advertising";

const Duration = ({setStartDate, setStartTime, setEndDate, setEndTime, startTime, setIsCorrectDateToStore, isCorrectDateFromStore, start_date_err, start_time_err, end_date_err, end_time_err, start_dateErr, start_timeErr, end_dateErr, end_timeErr, isChange, objData}) => {
  const [dateStart, setDateStart] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const [dateEnd, setDateEnd] = useState(0);
  const [timeEnd, setTimeEnd] = useState(0);
  const [isStartDate, setIsStartDate] = useState(true);
  const [isCorrectDate, setIsCorrectDate] = useState(true);

  useEffect(() => {
    // timeStart ? start_time_err(true) : start_time_err(false);
    // dateStart ? start_date_err(true) : start_date_err(false);
    // timeEnd ? end_time_err(true) : end_time_err(false);
    // dateEnd ? end_date_err(true) : end_date_err(false);

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
            <DateInput onChange={(e) => {setStartDate(e); setDateStart(e); start_date_err(false)}} label="Start date" invalid={!isStartDate} start_dateErr={start_dateErr} objData={objData.start_date} isChange={isChange}/>
            <TimeInput onChange={(e) => {setStartTime(e); setTimeStart(e); start_time_err(false)}} label="Start time" invalid={!isStartDate} start_timeErr={start_timeErr} objData={objData.start_time} isChange={isChange} />
          </div>
          <div style={{ display: "flex", justifyContent: 'space-between' }}>
            <DateInput onChange={(e) => {setEndDate(e); setDateEnd(e); end_date_err(false)}} label="End date" invalid={!isCorrectDate} end_dateErr={end_dateErr} objData={objData.end_date} isChange={isChange} />
            <TimeInput onChange={(e) => {setEndTime(e); setTimeEnd(e); end_time_err(false)}} label="End time" invalid={!isCorrectDate} end_timeErr={end_timeErr} objData={objData.end_time} isChange={isChange} />
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
    isCorrectDateFromStore: state.adsOptions.isCorrectDate,
    start_dateErr: state.ad_errors_reducer.start_date,
    start_timeErr: state.ad_errors_reducer.start_time,
    end_dateErr: state.ad_errors_reducer.end_date,
    end_timeErr: state.ad_errors_reducer.end_time,
    isChange: state.adChange.isChange,
    objData: state.adChange.objData
  }
}

const mapDispatchToProps = {
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
    setIsCorrectDateToStore,
    start_date_err,
    start_time_err,
    end_date_err,
    end_time_err
}
export default connect(mapStateToProps, mapDispatchToProps)(Duration);
