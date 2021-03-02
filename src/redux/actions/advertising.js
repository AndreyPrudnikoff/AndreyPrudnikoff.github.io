import {ADD_BANNER, ADD_CITY, ADD_COUNTRY, SET_TIMEZONE, SET_WEB_SITE} from "../types";

export function addBanner(banner) {
    return {type: ADD_BANNER, payload: banner}
}
export function setWebsite(website) {
    return {type: SET_WEB_SITE, payload: website}
}
export function addCountry(country) {
    return {type: ADD_COUNTRY, payload: country}
}
export function addCity(city) {
    return {type: ADD_CITY, payload: city}
}
export function setStartDate(date) {
    return {type: ADD_BANNER, payload: date}
}
export function setStartTime(time) {
    return {type: ADD_BANNER, payload: time}
}
export function setEndDate(date) {
    return {type: ADD_BANNER, payload: date}
}
export function setEndTime(time) {
    return {type: ADD_BANNER, payload: time}
}
export function setTimezone(timezone) {
    return {type: SET_TIMEZONE, payload: timezone}
}
