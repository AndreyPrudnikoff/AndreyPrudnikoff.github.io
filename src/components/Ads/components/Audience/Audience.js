import React, {useEffect, useState} from "react";
import {countryList} from "../../../../country/country";
import {timeZone} from "../../../../country/timezone";
import {country_err} from '../../../../redux/actions/ad_errors'
// component
// styles
import "./styles.scss";
import {deleteCountryChangedObj, addCountryChangedObj} from '../../../../redux/actions/changeAd'
import {addCountry, deleteCountryAndTimeZone} from "../../../../redux/actions/advertising";
import {connect} from "react-redux";
import closeImg from '../../../../images/close.png'


const Audience = ({addCountry, country_codes_timezones, deleteCountryAndTimeZone, isChange, objData, country_err, country_codes_timezonesErr, deleteCountryChangedObj, addCountryChangedObj}) => {
    const [country, setCountry] = useState("");
    const [zone, setZone] = useState("");
    const [isRedCounry, setIsRedCountry] = useState();
    const [countryTimeZoneObj, setCountryTimeZoneObj] = useState();
    useEffect(() => {
        if(country_codes_timezones.length === 0) {
            setIsRedCountry(true)
        } else {
            setIsRedCountry(false)
        }
    }, [country_codes_timezones])
    useEffect(() => {
        if(country !== '' && zone !== '') {
            console.log([country])
            if(isChange)  {
                addCountryChangedObj(country, zone)
            } else {
                addCountry({[country]: zone});
            }
            setCountry('');
            setZone('');
            country_err(true)
        } else {
            country_err(false)
        }
    }, [country, zone])

    useEffect(() => {
        console.log(objData.country_timezone)
        isChange ? setCountryTimeZoneObj(objData.country_timezone) : setCountryTimeZoneObj(country_codes_timezones)
    }, [])
    const writeCountry = (e) => {
        setCountry(e.target.value);
    }
    const writeZone = (e) => {
        setZone(e.target.value);
    }
    // const addCountryTimezone = (e) => {
    //     e.preventDefault();
    //     if (country && zone) {
    //         addCountry({[country]: zone});
    //     }
    // }
    return (
        <div className="audience">
            <h2>Audience</h2>
            <ul className='list-country-timeZone'>
                {isChange ? 
                Object.keys(objData.country_timezone).map((item, index) => (
                    <li className='list-country-timeZone__item'>
                        <span className='item-list selectInput'>{item}</span>
                        <span className='item-list selectInput'>{objData.country_timezone[item]}</span>
                        <span className='item-list-close' >
                            <img src={closeImg} alt='close1' onClick={() => {deleteCountryChangedObj(item); console.log('click')}}/>
                        </span>
                    </li>
                ))
                :
                country_codes_timezones.map((item, index) => (
                    <li className='list-country-timeZone__item'>
                        <span className='item-list selectInput'>{Object.keys(item)}</span>
                        <span className='item-list selectInput'>{Object.values(item)}</span>
                        <span className='item-list-close' >
                            <img src={closeImg} alt='close' onClick={() => {deleteCountryAndTimeZone(index)}}/>
                        </span>
                    </li>
                ))}
                
            </ul>
            <div className="content">
                <div className="block">
                    <div style={{width: "100%"}}>
                        <label>Country</label>
                        <div className="selectInput" style={{borderColor: country_codes_timezonesErr ? '#F94439' : null}}>
                            <select value={country} required onChange={(e) => {writeCountry(e); setIsRedCountry(false); country_err(false)}}  >
                                <option>All</option>
                                {Object.keys(countryList).map((item, index) => (
                                    <option key={index + 3} value={countryList[item]}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/*<div className="addButton">*/}
                    {/*    <button onClick={(e) => {addCountryTimezone(e)}}>+</button>*/}
                    {/*    <span>Add country</span>*/}
                    {/*</div>*/}
                </div>
                <div className="block">
                    <div style={{width: "100%"}}>
                        <label>Time zone</label>
                        <div className="selectInput" style={{borderColor: country_codes_timezonesErr ? '#F94439' : null}}>
                            <select value={zone} required onChange={(e) => {writeZone(e); country_err(false)}}>
                                <option>Choose</option>
                                {timeZone.map((item, index) => (
                                    <option key={index + 5} value={item}>{item}</option>
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
        country_codes_timezones: state.adsOptions.country_codes_timezones,
        isChange: state.adChange.isChange,
        objData: state.adChange.objData,
        country_codes_timezonesErr: state.ad_errors_reducer.country_codes_timezones
    }
}
const mapDispatchToProps = {
    addCountry,
    deleteCountryAndTimeZone,
    country_err,
    deleteCountryChangedObj,
    addCountryChangedObj
}
export default connect(mapStateToProps, mapDispatchToProps)(Audience);
