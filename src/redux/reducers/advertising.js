import { act } from "react-dom/test-utils";
import {
    ADD_BANNER,
    ADD_COUNTRY,
    SET_BUDGET,
    SET_END_DATE,
    SET_END_TIME,
    SET_START_DATE,
    SET_START_TIME,
    SET_TIMEZONE,
    SET_WEB_SITE,
    DELETE_COUNTRY_AND_TIMEZONE, 
    GET_LIST_ADS,
    AD_DETAIL,
    IS_PREVIEW,
    PREVIEW_BANNER
} from "../types";

const initialState = {
    banner: "base64",
    website_url: "",
    country_codes_timezones: [],
    banner_start_date: "yyyy-mm-dd",
    banner_start_time: "hh:mm:ss",
    banner_end_date: "yyyy-mm-dd",
    banner_end_time: "hh:mm:ss",
    budget: "0",
    currentList: [],
    finishedList: [],
    adDetail: {},
    isPreview: false,
    previewBanner: false
}

export const adsOptions = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BANNER:
            return {...state, banner: action.payload};
        case SET_WEB_SITE:
            return {...state, website_url: action.payload};
        case ADD_COUNTRY:
            return {...state, country_codes_timezones: [...state.country_codes_timezones, action.payload]};
        case SET_START_DATE:
            return {...state, banner_start_date: action.payload};
        case SET_START_TIME:
            return {...state, banner_start_time: action.payload};
        case SET_END_DATE:
            return {...state, banner_end_date: action.payload};
        case SET_END_TIME:
            return {...state, banner_end_time: action.payload};
        case SET_BUDGET:
            return {...state, budget: action.payload};
        case GET_LIST_ADS:
            return {...state, currentList: action.payload.current, finishedList: action.payload.finished}
        case DELETE_COUNTRY_AND_TIMEZONE:
            return {...state, country_codes_timezones: [
                ...state.country_codes_timezones.slice(0, action.payload),
                ...state.country_codes_timezones.slice(action.payload + 1)
            ]}
        case AD_DETAIL: {
            return {...state, adDetail: action.payload}
        }
        case IS_PREVIEW: {
            return {...state, isPreview: action.payload}
        }
        case PREVIEW_BANNER: {
            return {...state, previewBanner: action.payload}
        }
        default:
            return state;
    }
}
