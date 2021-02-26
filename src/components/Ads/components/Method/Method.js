import React, { useState } from "react";
// components
import { RadioButtonBlock } from "./components";
// styles
import "./style.scss";

const Method = () => {
  const [activeVariant, setVariant] = useState("clicks");

  return (
    <div className="method">
      <h2>Method</h2>

      <div className="content">
        <div className="content-variantPayMethod">
          <span className="label">1 click = 1 $</span>

          <RadioButtonBlock
            active={activeVariant === "clicks"}
            label="Clicks"
            amount={1000}
            onClick={() => setVariant("clicks")}
          />
        </div>

        <div className="content-variantPayMethod">
          <span className="label">1 display = 0.05 $</span>

          <RadioButtonBlock
            active={activeVariant === "displays"}
            label="Displays"
            amount={1000}
            onClick={() => setVariant("displays")}
          />
        </div>
      </div>
    </div>
  );
};

export default Method;
