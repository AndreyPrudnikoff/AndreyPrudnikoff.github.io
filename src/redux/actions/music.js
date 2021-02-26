import {MUTE, PLAY_BELL, PLAY_CLACK, PLAY_CLICK, PLAY_FIREWORKS, PLAY_MONEY, PLAY_UP_DOWN, STOP_ALL, PLAY_YOU_LOSE, PLAY_ADD_TO_WALLET, PLAY_TIMER, PLAY_SUCCESS, PLAY_START_WIN, PLAY_TRANSITION} from "../types";

export function click() {
    return {type: PLAY_CLICK}
}
export function clack() {
    return {type: PLAY_CLACK}
}
export function bell() {
    return {type: PLAY_BELL}
}
export function money() {
    return {type: PLAY_MONEY}
}


export function transition() {
    return {type: PLAY_TRANSITION}
}
export function startWin() {
    return {type: PLAY_START_WIN}
}
export function playSuccess() {
    return {type: PLAY_SUCCESS}
}
export function playClick() {
    return {type: PLAY_CLICK}
}
export function playTimer() {
    return {type: PLAY_TIMER}
}
export function add_to_wallet() {
    return {type: PLAY_ADD_TO_WALLET}
}
export function you_lose() {
    return {type: PLAY_YOU_LOSE}
}
export function up_down() {
    console.log('123')
    return {type: PLAY_UP_DOWN}
}
export function fireworks() {
    return {type: PLAY_FIREWORKS}
}
export function stop() {
    return {type: STOP_ALL}
}
export function muteToggle() {
    return {type: MUTE}
}
