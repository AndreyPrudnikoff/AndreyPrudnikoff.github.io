import {
    BUDGET_ERROR, CLEAR_ERRORS,
    COUNTRY_TIMEZONES_ERROR,
    END_DATE_ERROR, END_TIME_ERROR,
    IMAGE_ERROR,
    START_DATE_ERROR,
    START_TIME_ERROR,
    WEBSITE_URL_ERROR
} from "../types";

const initialState = {
    image: false,
    website_url: false,
    country_codes_timezones: false,
    start_date: false,
    start_time: false,
    end_date: false,
    end_time: false,
    budget: false,
}
export const ad_errors_reducer = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_ERROR:
            return {...state, image: action.payload}
        case WEBSITE_URL_ERROR:
            return {...state, website_url: action.payload}
        case COUNTRY_TIMEZONES_ERROR:
            return {...state, country_codes_timezones: action.payload}
        case START_DATE_ERROR:
            return {...state, start_date: action.payload}
        case START_TIME_ERROR:
            return {...state, start_time: action.payload}
        case END_DATE_ERROR:
            return {...state, end_date: action.payload}
        case END_TIME_ERROR:
            return {...state, end_time: action.payload}
        case BUDGET_ERROR:
            return {...state, budget: action.payload}
        case CLEAR_ERRORS:
            return {...state, ...initialState}
        default:
            return state;
    }
}
