import {User} from '../../api/User'
import {
    AD_DETAIL,
    ADD_BANNER,
    ADD_COUNTRY,
    DELETE_COUNTRY_AND_TIMEZONE, ERROR_AD,
    GET_LIST_ADS,
    IS_CORRECT_DATE,
    IS_PREVIEW,
    PREVIEW_BANNER, PROMO_LIST,
    SET_BUDGET,
    SET_END_DATE,
    SET_END_TIME,
    SET_START_DATE,
    SET_START_TIME,
    SET_TIMEZONE,
    SET_WEB_SITE,
    WITH_DATE
} from "../types";

export function addImage(banner) {
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
    return async dispatch => {
        const obj = {current: [], finished: []}
        const response = await User.listAds();
        const payload = await response.data.status;
        if (payload === "success") {
            for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].status === 'ended') {
                    obj.finished.push(response.data.data[i])
                } else {
                    obj.current.push(response.data.data[i])
                }
            }
        }
        return await dispatch({type: GET_LIST_ADS, payload: obj})
    }
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

export function setWithDate(bool) {
    return {type: WITH_DATE, payload: bool}
}
export function getPromoList(list) {
    return {type: PROMO_LIST, payload: list}
}
export function setAdErrors(obj) {
    return {type: ERROR_AD, payload: obj}
}
