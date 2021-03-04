import React, {useState} from "react";
import {countryList} from "../../../../country/country";
import {timeZone} from "../../../../country/timezone";
// component
// styles
import "./styles.scss";
import {addCountry} from "../../../../redux/actions/advertising";
import {connect} from "react-redux";


const Audience = ({addCountry, country_codes_timezones}) => {
    const [country, setCountry] = useState("");
    const [zone, setZone] = useState("");
    const writeCountry = (e) => {
        setCountry(e.target.value);
    }
    const writeZone = (e) => {
        setZone(e.target.value);
    }
    const addCountryTimezone = (e) => {
        e.preventDefault();
        if (country && zone) {
            addCountry({[country]: zone});
            console.log(Object.keys(country_codes_timezones))
        }
    }
    return (
        <div className="audience">
            <h2>Audience</h2>
            <div className="content">
                <div className="block">
                    <div style={{width: "100%"}}>
                        <label>Country</label>

                        <div className="selectInput">
                            <select value={country} required onChange={writeCountry}>
                                <option>All</option>
                                {Object.keys(countryList).map((item) => (
                                    <option key={item} value={countryList[item]}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="addButton">
                        <button disabled={!(country && zone)} onClick={(e) => addCountryTimezone(e)}>+</button>
                        <span>Add country</span>
                    </div>
                </div>
                <div className="block">
                    <div style={{width: "100%"}}>
                        <label>Time zone</label>

                        <div className="selectInput">
                            <select value={zone} required onChange={writeZone}>
                                <option>Choose</option>
                                {timeZone.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        country_codes_timezones: state.adsOptions.country_codes_timezones
    }
}
const mapDispatchToProps = {
    addCountry
}
export default connect(mapStateToProps, mapDispatchToProps)(Audience);
