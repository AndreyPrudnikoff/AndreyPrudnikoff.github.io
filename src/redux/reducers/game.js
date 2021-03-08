import {
    BET_LOSE,
    BET_WIN, CHANGE_DEMO,
    CLEAR_BET,
    CLOSE_CONGRATULATION, CLOSE_YOURLOSE,
    GET_RATES,
    GET_USER_DATA,
    SET_BET_DOWN,
    SET_BET_UP
} from "../types";

const initialState = {
    name: '',
    balance: 0,
    lastWin: 0,
    lastWinGame: 0,
    lastgame: 0,
    wins: 0,
    '3wins': false,
    btcWallet: '',
    isDemo: undefined,
    congratulation: false,
    predict: '',
    colorBlalance: 'white',
    down: 0,
    up: 0,
    upBets: 0,
    downBets: 0,
    online: 0,
    yourlose: false,
    promo: false

}
export const balanceReducer = (state = initialState, action) => {

    switch (action.type) {

        case CHANGE_DEMO:
            return {
                ...state,
                isDemo: !state.isDemo
            };
        case GET_USER_DATA:
            if (action.payload.isDemo) {
                return {
                    ...state,
                    '3wins': action.payload['3wins'],
                    balance: action.payload.demoBalance,
                    btcWallet: action.payload.btcWallet,
                    wins: action.payload.wins,
                    lastWin: action.payload.lastWin,
                    lastWinGame: action.payload.lastWinGame,
                    lastgame: action.payload.lastgame,
                    name: action.payload.name,
                    online: action.payload.online,
                    isDemo: action.payload.isDemo,
                    promo: action.payload.promo
                };

            } else {
                return {
                    ...state,
                    '3wins': action.payload['3wins'],
                    balance: action.payload.balance,
                    btcWallet: action.payload.btcWallet,
                    wins: action.payload.wins,
                    lastWin: action.payload.lastWin,
                    lastWinGame: action.payload.lastWinGame,
                    lastgame: action.payload.lastgame,
                    name: action.payload.name,
                    online: action.payload.online,
                    isDemo: action.payload.isDemo,
                    promo: action.payload.promo
                };
            }
        case GET_RATES:
            if (state.isDemo) {
                return {
                    ...state,
                    down: action.payload.demo.down.peoples,
                    up: action.payload.demo.up.peoples,
                    upBets: action.payload.demo.up.bitcoins,
                    downBets: action.payload.demo.down.bitcoins,
                }
            } else {
                return {
                    ...state,
                    down: action.payload.real.down.peoples,
                    up: action.payload.real.up.peoples,
                    upBets: action.payload.real.up.bitcoins,
                    downBets: action.payload.real.down.bitcoins,
                }
            }
        case BET_WIN:
            return {
                ...state,
                congratulation: true,
                colorBlalance: 'green'
            };
        case BET_LOSE:
            return {
                ...state,
                colorBlalance: 'red',
                yourlose: true
            };
        case SET_BET_UP:
            return {
                ...state,
                predict: 'up'
            };
        case SET_BET_DOWN:
            return {
                ...state,
                predict: 'down'
            };
        case CLEAR_BET:
            return {
                ...state,
                predict: ''
            };
        case CLOSE_CONGRATULATION:
            return {...state, congratulation: false};
        case CLOSE_YOURLOSE:
            return {...state, yourlose: false};
        default:
            return state;
    }
}

