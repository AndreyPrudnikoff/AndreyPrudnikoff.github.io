import {BET_LOSE, BET_WIN, CLOSE_CONGRATULATION} from "../types";

const initialState = {
    balance: 1,
    lastWin: 0,
    wins: 0,
    congratulation: false
}
export const balanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case BET_WIN:
            return {
                ...state,
                balance: state.balance + parseFloat(action.payload),
                wins: state.wins + 1,
                lastWin: action.payload,
                congratulation: true
            };
        case BET_LOSE:
            return {...state, balance: state.balance - parseFloat(action.payload)};
        case CLOSE_CONGRATULATION:
            return {...state, congratulation: false};
        default:
            return state;
    }
}

