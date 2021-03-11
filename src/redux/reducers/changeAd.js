import {
    IS_CHANGE,
    OBJ_DATA,
    SET_CHANGED_OBJ,
    DELETE_COUNTRY_AND_TIME_ZONE_CHANGED,
    ADD_COUNTRY_CHANGED
} from '../types'

const initialState = {
    objData: {},
    isChange: false
}

export const adChange = (state = initialState, action) => {
    switch(action.type) {
        case IS_CHANGE: 
            return {...state, isChange: action.payload}
        case OBJ_DATA:
            return {...state, objData: action.payload}
        case SET_CHANGED_OBJ: {
            let newObj = new Object();
            for(let key in state.objData) {
                if(key === action.key) {
                    newObj[key] = action.payload
                } else {
                    newObj[key] = state.objData[key]
                }
            }
            return {...state, objData: newObj}
        }
        case DELETE_COUNTRY_AND_TIME_ZONE_CHANGED: {
            let newObj = new Object();
            for(let key in state.objData.country_timezone) {
                if(key === action.payload) {
                    continue;
                } else {
                    newObj[key] = state.objData.country_timezone[key]
                }
            }
            return {...state, objData: {...state.objData, country_timezone: newObj }}
        }
        case ADD_COUNTRY_CHANGED: {
            let key = action.key;
            let value = action.payload
            let currentCountry = new Object();
            currentCountry[key] = value;

            let newObj = Object.assign(state.objData.country_timezone, currentCountry)
            return {...state, objData: {...state.objData, country_timezone: newObj}} 
        }
        default:
            return state
    }
}