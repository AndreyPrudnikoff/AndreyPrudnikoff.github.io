import {
    IS_CHANGE,
    OBJ_DATA,
    SET_CHANGED_OBJ,
    DELETE_COUNTRY_AND_TIME_ZONE_CHANGED,
    ADD_COUNTRY_CHANGED
} from '../types'

export function setObjData (obj) {
    return {type: OBJ_DATA, payload: obj}
}

export function setIsChange(bool) {
    return {type: IS_CHANGE, payload: bool}
}

export function setChangedObj(key, value) {
    return {type: SET_CHANGED_OBJ, payload: value, key: key}
}

export function deleteCountryChangedObj(key) {
    return {type: DELETE_COUNTRY_AND_TIME_ZONE_CHANGED, payload: key}
}

export function addCountryChangedObj(key, value) {
    return {type: ADD_COUNTRY_CHANGED, key: key, payload: value}
}