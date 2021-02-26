import React, { useState } from "react";
// components
import { RangeInput } from "./FormInput";
// styles
import "./style.scss";
// images
import bitcoin from "../../../../../images/bitcoin.svg";
import dollar from "../../../../../images/dollar.svg";

const Tabs = ({ tabs }) => {
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
        <span>Actual amount spend daily may vary</span>
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
              <div className="dollarContainer">1200</div>
              <img src={dollar} />
            </div>
          </div>
        </div>

        <RangeInput withError min={0} max={10000} balance={7500} />
      </div>

      <div className="content">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
