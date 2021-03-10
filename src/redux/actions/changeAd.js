import {
    IS_CHANGE,
    OBJ_DATA
} from '../types'

export function setObjData (obj) {
    return {type: OBJ_DATA, payload: obj}
}

export function setIsChange(bool) {
    return {type: IS_CHANGE, payload: bool}
}