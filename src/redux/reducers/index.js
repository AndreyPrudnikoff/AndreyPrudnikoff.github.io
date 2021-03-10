import { combineReducers } from "redux";
import {authReducer, courseReducer, geoReducer, switchOptions} from "./entry";
import {balanceReducer} from "./game";
import {soundReducer} from "./sound";
import {adsOptions} from "./advertising";
import {ad_errors_reducer} from "./ad_errors_input";

export const rootReducer = combineReducers({
    authReducer,
    geoReducer,
    courseReducer,
    balanceReducer,
    soundReducer,
    switchOptions,
    adsOptions,
    ad_errors_reducer
})
