import React, {useState} from "react";
import {countryList} from "../../../../country/country";
import {timeZone} from "../../../../country/timezone";
// component
// styles
import "./styles.scss";
import {addCountry} from "../../../../redux/actions/advertising";
import {connect} from "react-redux";
import closeImg from '../../../../images/close.png'


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
            console.log(country)
            addCountry({[country]: zone});
            console.log(country_codes_timezones)
            // setCountry("");
            // setZone("");
        }
    }
    const closeBtn = index => {
        console.log(index)
    }
    return (
        <div className="audience">
            <h2>Audience</h2>
            <ul className='list-country-timeZone'>
                {country_codes_timezones.map((item, index) => (
                    <li className='list-country-timeZone__item'>
                        <span className='item-list selectInput'>{Object.keys(item)}</span>
                        <span className='item-list selectInput'>{Object.values(item)}</span>
                        <span className='item-list-close' >
                            <img src={closeImg} alt='close' onClick={() => {closeBtn(index)}}/>
                        </span>
                    </li>
                ))}
                
            </ul>
            <div className="content">
                <div className="block">
                    <div style={{width: "100%"}}>
                        <label>Country</label>
                        <div className="selectInput">
                            <select value={country} required onChange={writeCountry}>
                                {Object.keys(countryList).map((item) => (
                                    <option key={item} value={countryList[item]}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="addButton">
                        <button onClick={(e) => {addCountryTimezone(e); console.log('y')}}>+</button>
                        <span>Add country</span>
                    </div>
                </div>
                <div className="block">
                    <div style={{width: "100%"}}>
                        <label>Time zone</label>
                        <div className="selectInput">
                            <select value={zone} required onChange={writeZone}>
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
    console.log(state.adsOptions.country_codes_timezones)
    return {
        country_codes_timezones: state.adsOptions.country_codes_timezones
    }
}
const mapDispatchToProps = {
    addCountry
    // deleteCountryAndTimeZone
}
export default connect(mapStateToProps, mapDispatchToProps)(Audience);
