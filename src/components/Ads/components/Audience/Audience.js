import React from "react";
// component
import { SelectInput } from "../Duration/components";
// styles
import "./styles.scss";

const country = ["All", "USA", "Ukraine", "Poland"];
const city = ["All", "Kiev", "Warsaw", "Amsterdam"];

const Audience = () => {
  return (
    <div className="audience">
      <h2>Audience</h2>

      <div className="content">
        <div className="block">
          <SelectInput name="country" label="Country" data={country} />

          <div className="addButton">
            <button>+</button>

            <span>Add country</span>
          </div>
        </div>
        <div className="block">
          <SelectInput name="city" label="City" data={city} />

          <div className="addButton">
            <button>+</button>

            <span>Add city</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audience;
