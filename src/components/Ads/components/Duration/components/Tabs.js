import React, { useState } from "react";
// components
import { RangeInput } from "./FormInput";
// styles
import "./style.scss";
// images
import bitcoin from "../../../../../images/bitcoin.svg";
import dollar from "../../../../../images/dollar.svg";
import {connect} from "react-redux";
import {setBudget} from "../../../../../redux/actions/advertising";

const Tabs = ({ tabs, budget, setBudget, balance }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="tabsContainer">
      <div className="tabs">
        {tabs.map(({ id, label }) => (
          <div
            key={id}
            className={activeTab === id ? "activeTab" : "tab"}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="daily">
        <span>Daily budget</span>
        <span className="opacity">Actual amount spend daily may vary</span>
          <div>
              <span className="opacity">1 click = 1 $</span>
              <span style={{marginLeft: "60px"}} className="opacity">1 display = 0.05 $</span>
          </div>
      </div>

      <div className="estimated">
        <div className="estimated-perDay">
          <div style={{ textAlign: "left" }}>
            Estimated 1K – 1,5K people <br />
            reached per day
          </div>

          <div className="amount">
            <div className="amount-btc">
              0.0353 <img src={bitcoin} />
            </div>

            <div className="amount-dollar">
              <div className="dollarContainer">{budget}</div>
              <img src={dollar} />
            </div>
          </div>
        </div>

        <RangeInput withError min={0.0001} max={10000} balance={balance} />
      </div>

      <div className="content">{tabs[activeTab]?.content}</div>
    </div>
  );
};
const mapStateToProps = state => {
    return {
        budget: state.adsOptions.budget,
        balance: state.balanceReducer.balance,
    }
}
const mapDispatchToProps = {
    setBudget
}
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
