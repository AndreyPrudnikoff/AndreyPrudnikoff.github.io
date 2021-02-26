import React from "react";
// styles
import "./style.scss";

const RadioButtonBlock = ({ active = false, label, amount, onClick }) => {
  return (
    <div className="radioBlock" onClick={onClick}>
      <div className="radio">
        <div className="fakeRadiobutton">
          {active && <div className="active" />}
        </div>

        <span>{label}</span>
      </div>

      <div className="amount">{amount}</div>
    </div>
  );
};

export default RadioButtonBlock;
