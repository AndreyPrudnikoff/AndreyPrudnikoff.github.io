import {
    IS_CHANGE,
    OBJ_DATA
} from '../types'

const initialState = {
    objData: {},
    isChange: false
}

export const adCreate = (state = initialState, action) => {
    switch(action.type) {
        case IS_CHANGE: 
            return {...state, isChange: action.payload}
        case OBJ_DATA:
            return {...state, objData: action.payload}
        default:
            return state
    }
}