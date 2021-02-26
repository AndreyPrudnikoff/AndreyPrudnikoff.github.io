import {
    MUTE,
    PLAY_BELL,
    PLAY_CLACK,
    PLAY_CLICK,
    PLAY_FIREWORKS,
    PLAY_MONEY,
    PLAY_UP_DOWN,
    PLAY_YOU_LOSE,
    STOP_ALL,
    PLAY_ADD_TO_WALLET,
    PLAY_TIMER,
    PLAY_SUCCESS,
    PLAY_START_WIN,
    PLAY_TRANSITION,
    PLAY_TIMER_2,
    STOP_GAME_TIMER, STOP_BET_TIMER, PLAY_GAME_TIMER, PLAY_BET_TIMER
} from "../types";

const initialState = {
    play: '',
    mute: true,
    bet: false,
    game: false
}
export const soundReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAY_BELL:
            return {...state, play: 'bell'};
        case PLAY_CLACK:
            return {...state, play: 'clack'};
        case PLAY_MONEY:
            return {...state, play: 'money'}
        

        case PLAY_TIMER_2: {
            return {...state, play: 'timer2'}
        }
        case STOP_GAME_TIMER: {
            return {...state, game: false}
        }
        case STOP_BET_TIMER: {
            return {...state, bet: false}
        }
        case PLAY_GAME_TIMER: {
            return {...state, game: true}
        }
        case PLAY_BET_TIMER: {
            return {...state, bet: true}
        }
        case PLAY_TRANSITION:
            return {...state, play: 'transition'}
        case PLAY_START_WIN:
            return {...state, play: 'start_win'}
        case PLAY_SUCCESS:
            return {...state, play: 'success'}
        case PLAY_CLICK:
            return {...state, play: 'click'}
        case PLAY_TIMER:
            return {...state, play: 'timer'}
        case PLAY_ADD_TO_WALLET:
            return {...state, play: 'add_to_wallet'}
        case PLAY_YOU_LOSE:
            return {...state, play: 'you_lose'}
        case PLAY_UP_DOWN:
            return {...state, play: 'up_down'}
        case PLAY_FIREWORKS:
            return {...state, play: 'fireworks'}
        case STOP_ALL:
            return {...state, play: ''}
        case MUTE:
            return {...state, mute: !state.mute}
        default:
            return state;
    }
}
