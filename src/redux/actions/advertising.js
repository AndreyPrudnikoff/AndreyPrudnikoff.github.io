import {
    ADD_BANNER,
    ADD_COUNTRY, SET_BUDGET,
    SET_END_DATE, SET_END_TIME,
    SET_START_DATE,
    SET_START_TIME,
    SET_TIMEZONE,
    SET_WEB_SITE
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
