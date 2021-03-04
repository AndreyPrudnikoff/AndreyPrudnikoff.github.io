import React, { useState } from "react";
import {setWebsite} from '../../../../../redux/actions/advertising'
import dayjs from "dayjs";
// styles
import "./style.scss";
import { connect } from "react-redux";

export const NumberInput = ({ label }) => {
  const [inputValue, setValue] = useState("1");

  const handleChange = ({ target: { value } }) => {
    if (value === "") setValue("1");

    if (!Number.isNaN(+value - 1) && value > 0 && !value.includes(".")) {
      setValue(value);
    }
  };

  const changeAmount = ({ target: { name } }) => {
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
        <input required value={inputValue} onChange={handleChange} />

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

export const SelectInput = ({ label, data = [], onchange = () => {} }) => {
    return(
        <div/>
    );
}

export const DateInput = ({ label, onChange = () => {} }) => {
  const [inputValue, setValue] = useState("");

  const handleChange = ({ target: { valueAsNumber } }) => {
    setValue(dayjs(valueAsNumber).format("MMM D, YYYY"));
  };

  return (
    <div className="dateInputContainer">
      <label>{label}</label>
      <div className="dateInput">
        <div>{inputValue}</div>
        <input required onChange={handleChange} type="date" />
      </div>
    </div>
  );
};

export const TimeInput = ({ label, onChange = () => {} }) => {
  const [inputValue, setValue] = useState("");

  const handleChange = ({ target: { valueAsNumber } }) => {
    setValue(dayjs(valueAsNumber).format("MMM D, YYYY"));

    if (onChange) onChange(inputValue);
  };

  return (
    <div className="timeInputContainer">
      <label>{label}</label>
      <div className="timeInput">
        <input required onChange={handleChange} type="time" />
      </div>
    </div>
  );
};

export const RangeInput = ({min, max, balance, withError = false, onChange = () => {},}) => {
  const [isValid, setValidation] = useState(true);

  const hadlerChnage = ({ target: { valueAsNumber } }) => {
    onChange({
      value: valueAsNumber,
      isValid: balance >= valueAsNumber,
    });

    setValidation(balance >= valueAsNumber);
  };

  return (
    <div className="rangeInputContainer">
      <input
        required
        min={min}
        max={max}
        onChange={hadlerChnage}
        className={isValid ? "rangeInput" : "rangeInput-error"}
        type="range"
      />

      {withError && !isValid && (
        <div className="reffil">
          <div className="reffil-balance">
            <span>Balance</span>
            <span>{balance} BTC</span>
          </div>

          <button className="reffil-button">REFILL</button>

          <div className="reffil-error">Not enough</div>
        </div>
      )}
    </div>
  );
};

export const TextInput = ({ label, onChange = () => {}, setWebsite, webSite }) => {
  return (
    <div className="website-block">
      <span className="block-description">{label}</span>
      <input
        // value=""
        type="text"
        placeholder="website.com"
        // onChange={(e) => setWebsite(e.target.value)}
      />
      {/* {console.log(webSite)} */}
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     webSite: state.adsOptions.website_url
//   }
// }

// const mapDispatchToProps = {
//   setWebsite
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TextInput)
