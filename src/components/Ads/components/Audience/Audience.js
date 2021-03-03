import React from "react";
import {countryList} from "../../../../country/country";
import {timeZone} from "../../../../country/timezone";
// component
import { SelectInput } from "../Duration/components";
// styles
import "./styles.scss";



const Audience = () => {
  return (
    <div className="audience">
      <h2>Audience</h2>

      <div className="content">
        <div className="block">
          <SelectInput name="country" label="Country" data={countryList} />

          <div className="addButton">
            <button>+</button>

            <span>Add country</span>
          </div>
        </div>
        <div className="block">
          <SelectInput name="city" label="Time zone" data={timeZone} />

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
