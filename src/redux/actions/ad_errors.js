import {
    BUDGET_ERROR,
    CLEAR_ERRORS,
    COUNTRY_TIMEZONES_ERROR,
    END_DATE_ERROR,
    END_TIME_ERROR,
    IMAGE_ERROR,
    START_DATE_ERROR,
    START_TIME_ERROR,
    WEBSITE_URL_ERROR
} from "../types";

export function image_err(bool) {
    return {type: IMAGE_ERROR, payload: bool}
}

export function website_err(bool) {
    return {type: WEBSITE_URL_ERROR, payload: bool}
}

export function country_err(bool) {
    return {type: COUNTRY_TIMEZONES_ERROR, payload: bool}
}

export function start_date_err(bool) {
    return {type: START_DATE_ERROR, payload: bool}
}

export function start_time_err(bool) {
    return {type: START_TIME_ERROR, payload: bool}
}

export function end_date_err(bool) {
    return {type: END_DATE_ERROR, payload: bool}
}

export function end_time_err(bool) {
    return {type: END_TIME_ERROR, payload: bool}
}

export function budget_err(bool) {
    return {type: BUDGET_ERROR, payload: bool}
}

export function clear_err(bool) {
    return {type: CLEAR_ERRORS, payload: bool}
}
