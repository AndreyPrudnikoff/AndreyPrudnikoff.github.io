import React, {useEffect, useState} from "react";
import {setBudget} from '../../../../../redux/actions/advertising'
import moment from 'moment';
import dayjs from "dayjs";
// styles
import "./style.scss";
import store from "../../../../../redux/store";

export const NumberInput = ({label}) => {
    const [inputValue, setValue] = useState("1");

    const handleChange = ({target: {value}}) => {
        if (value === "") setValue("1");

        if (!Number.isNaN(+value - 1) && value > 0 && !value.includes(".")) {
            setValue(value);
        }
    };

    const changeAmount = ({target: {name}}) => {
        if (name === "desc") {
            if (+inputValue === 1) return;

            setValue(inputValue - 1);
        } else {
            setValue(+inputValue + 1);
        }
    };

    return (
        <div>
            <label>{label}</label>
            <div className="formInput">
                <input value={inputValue} onChange={handleChange}/>

                <div className="inputButtons">
                    <button name="asc" onClick={changeAmount}>
                        +
                    </button>

                    <button name="desc" onClick={changeAmount}>
                        -
                    </button>
                </div>
            </div>
        </div>
    );
};

// export const SelectInput = ({label, data = [], onchange = () => {}}) => {
//     return (
//         <div/>
//     );
// }

export const DateInput = ({label, onChange = () => {}, invalid, start_dateErr, end_dateErr, isChange, objData}) => {
    const [inputValue, setValue] = useState("");

    useEffect(() => {
        if(isChange) {
            setValue(objData)
        }
    }, [])

    const handleChange = ({target: {valueAsNumber}}) => {
        setValue(dayjs(valueAsNumber).format("YYYY-MM-DD"));
        onChange(dayjs(valueAsNumber).format("YYYY-MM-DD"));
        console.log(inputValue)
    };

    return (
        <div className="dateInputContainer" style={{width: '188.5px'}}>
            <label>{label}</label>
            <div className="dateInput" style={{border: invalid || end_dateErr || start_dateErr ? '1px solid #FF453A' : '1px solid white'}}>
                <div>{inputValue}</div>
                <input onChange={handleChange} type="date"/>
            </div>
        </div>
    );
};

export const TimeInput = ({label, onChange = () => {}, invalid, start_timeErr, end_timeErr, objData, isChange}) => {

    const [inputValue, setValue] = useState('');
    useEffect(() => {
        if(isChange) {
            setValue(objData)
        }
    }, [])
    const handleChange = ({target: {valueAsNumber}}) => {
        onChange(moment.utc(valueAsNumber).format('HH:mm:ss'));
        setValue(moment.utc(valueAsNumber).format('HH:mm:ss'))
        // return (onChange(moment.utc(valueAsNumber).format('HH:mm:ss')))
    };

    return (
        <div className="timeInputContainer" style={{width: '188.5px'}}>
            <label>{label}</label>
            <div className="timeInput" style={{border: invalid || start_timeErr || end_timeErr ? '1px solid #FF453A' : '1px solid white'}}>
                <div>{inputValue}</div>
                <input onChange={handleChange} type="time"/>
            </div>
        </div>
    );
};

export const RangeInput = ({min, max, course, balance, value, withError = false, onChange = () => {
    }, onChangeBudgetErr, budgetErr, onChangeFirstEntry}) => {
    const [isValid, setValidation] = useState(true);
    const handlerChange = ({target: {valueAsNumber}}) => {
        onChange({
            value: valueAsNumber,
            isValid: balance >= valueAsNumber,
        });
        const budget = +valueAsNumber / +course;
        store.dispatch(setBudget(budget))
        setValidation(balance >= valueAsNumber);
    };
    return (
        <div className="rangeInputContainer">
            <input
                style={{borderColor: budgetErr ? 'F94439' : null}}
                min={min}
                max={max}
                onChange={(e) => {handlerChange(e); onChangeBudgetErr(); onChangeFirstEntry()}}
                className={isValid ? "rangeInput" : "rangeInput-error"}
                type="range"
                value={value}
            />

            {withError && !isValid && (
                <div className="reffil">
                    <div className="reffil-balance">
                        <span>Balance</span>
                        <span>{balance.toFixed(0)} <span className="gold">$</span></span>
                    </div>

                    <button className="reffil-button">REFILL</button>

                    <div className="reffil-error">Not enough</div>
                </div>
            )}
        </div>
    );
};

export const TextInput = ({label, onChange = () => {}, setWebsite, webSite, invalid, isChange, changeUrl, onChangeErrFalse, urlErr}) => {
    const [name, setName] = useState();    

    const checkForLatin = event => {
        let val = event.replace(/[^\x00-\x7F]/ig, '');
        setName(val);
    }


    useEffect(() => {
        if(isChange) {
            setName(changeUrl)
        }
    }, [])

    return (
        <div className="website-block">
            <span className="block-description">{label}</span>
            <input
                style={{borderColor: urlErr ? "#FF453A" : "inherit"}}
                type="text"
                placeholder="website.com"
                // value = {isChange ? changeUrl : null}
                onChange={(e) => {onChange(e.target.value); checkForLatin(e.target.value); onChangeErrFalse()}}
                // value = {isChange ? changeUrl : name}
                value = {name}
            />
        </div>
    );
};

