import {User} from '../../api/User' 
import {
    ADD_BANNER,
    ADD_COUNTRY, SET_BUDGET,
    SET_END_DATE, SET_END_TIME,
    SET_START_DATE,
    SET_START_TIME,
    SET_TIMEZONE,
    SET_WEB_SITE,
    DELETE_COUNTRY_AND_TIMEZONE, 
    GET_LIST_ADS,
    AD_DETAIL,
    IS_PREVIEW,
    PREVIEW_BANNER,
    IS_CORRECT_DATE
} from "../types";

export function addBanner(banner) {
    return {type: ADD_BANNER, payload: banner}
}
export function setWebsite(website) {
    return {type: SET_WEB_SITE, payload: website}
}
export function addCountry(country, zone) {
    return {type: ADD_COUNTRY, payload: country, zone}
}
export function setStartDate(date) {
    return {type: SET_START_DATE, payload: date}
}
export function setStartTime(time) {
    return {type: SET_START_TIME, payload: time}
}
export function setEndDate(date) {
    return {type: SET_END_DATE, payload: date}
}
export function setEndTime(time) {
    return {type: SET_END_TIME, payload: time}
}
export function setTimezone(timezone) {
    return {type: SET_TIMEZONE, payload: timezone}
}
export function setBudget(budget) {
    return {type: SET_BUDGET, payload: budget}
}
export function deleteCountryAndTimeZone(index) {
    return {type: DELETE_COUNTRY_AND_TIMEZONE, payload: index}
}
export function getCurrentList() {
    let obj = {
        current: new Array(),
        finished: new Array()
    }
    User.listAds()
        .then(data => {
            if(data.status === 200) {
                for(let i = 0; i < data.data.data.length; i++) {
                    if(data.data.data[i].status === 'ended') {
                        obj.finished.push(data.data.data[i])
                    } else {
                        obj.current.push(data.data.data[i])
                    }
                }
            }
        })
        .catch(e => console.log(e))
    return {type: GET_LIST_ADS, payload: obj}
}

export function getDetails(obj) {
    return {type: AD_DETAIL, payload: obj}
}

export function setIsPreview(bool) {
    return {type: IS_PREVIEW, payload: bool}
}

export function setPreviewBanner(bool) {
    return {type: PREVIEW_BANNER, payload: bool}
}
export function setIsCorrectDateToStore(bool) {
    return {type: IS_CORRECT_DATE, payload: bool}
}