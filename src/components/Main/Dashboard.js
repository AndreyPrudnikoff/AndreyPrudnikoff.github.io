import React, {useState, useEffect} from 'react';
import bitcoin from "../../images/bitcoin.svg";
import arrowUp from "../../images/arrowUp.svg";
import arrowDown from "../../images/arrowDown.svg";
import {connect} from "react-redux";
import {betLose, betWin, closeCongratulation} from "../../redux/actions";
import {bell, click, up_down, fireworks, you_lose, muteToggle, playTimer, playTimer2} from "../../redux/actions/music";
import Rates from "./Rates";
import {User} from "../../api/User";
import {predictClear, predictDown, predictUp, userdata} from "../../redux/actions/game";
import Rect from "./Rect/Rect";
import Timer from "./Timer";
import Online from "./Online";

import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";


const Dashboard = ({predictUp, betWin, betLose, fireworks, userdata, predictClear, predictDown, balance, predict, upBets, downBets, up, down, lastSeconds, widthMode, currentLang, up_down, you_lose, playTimer, playTimer2}) => {
    const [bet, setBet] = useState(.0001);
    const [counter, setCounter] = useState(10);
    const [gameStart, setGameStart] = useState(undefined);
    const LANG = currentLang === "en" ? EN : RU;
    const time = 10;
    const initialOffset = 440;
    const i = 10 - counter || 1;
    let timeBet = lastSeconds % 20 === 0 || lastSeconds % 20 === 5;
    let startGame = lastSeconds % 20 === 10 || lastSeconds % 20 === 15;

    useEffect(() => {
        if (startGame && gameStart === undefined) {
            setGameStart(lastSeconds);
            predictSubmit();
        }
    }, [lastSeconds])
    useEffect(() => {
        if(startGame) {
            console.log('use');
            playTimer();
        }
        if (timeBet) {
            console.log('no');
            playTimer2()
        }
    }, [startGame, timeBet])
    const setBetHandler = (e) => {
        let bet = +e.target.value.slice(0, 5);
        if (!bet) {
            bet = 0.0001;
        }
        if (bet > 1) {
            bet = 1;
        }
        setBet(bet || 0.0001);
    }
    const betDone = (e) => {
        let rate = e.target.id;
        up_down();
        if (rate === 'up') {
            predictUp({value: bet.toString()});
        } else if (rate === 'down') {
            predictDown({value: bet.toString()});
        }
    }

    const predictSubmit = () => {
        const timer = setInterval(() => {
            setCounter(counter - 1);
        }, 1000)
        return setTimeout(() => {
            clearInterval(timer);
            setCounter(10);
            User.userdata()
                .then(data => {
                    if (+data.data.data.lastWin === 1 && predict !== '') {
                        betWin();
                        fireworks();
                    } else if (+data.data.data.lastWin === -1 && predict !== '') {
                        you_lose();
                        betLose();
                        userdata();
                    } else if (up > 0 && down > 0) {
                        userdata();
                    } else {
                        userdata();
                    }
                }).catch(e => {console.log(e)});
            setGameStart(undefined);
            predictClear();
        }, 10000)
    }

    const btnDownHandler = (e) => {
        e.preventDefault();
        betDone(e);
    }

    if (startGame) {
        return (
            <div className={`${widthMode} row bottom-container`}>
                {widthMode === "desktop" ? <Rates/> : <></>}
                <div className={`${widthMode} round dashboard big-timer`}>
                    <Timer/>
                    {startGame && !predict
                        ? <span style={{display: startGame && !predict ? 'inline' : 'none'}}
                                className="off text-center">All bets are off</span>
                        : <div style={{
                            display: predict === 'up' || !predict ? 'inline' : 'none',
                            transform: startGame && (predict === 'down' || !predict) ? 'scale(0)' : 'scale(1)'
                        }} className="up">
                            <div style={{display: predict === 'down' ? "none" : "inherit"}} className="profit">
                                                    <span style={{
                                                        fontSize: '21px',
                                                        display: widthMode === "mobile" ? "inline" : "inline"
                                                    }}
                                                          className={currentLang + " green"}>{LANG.Training.UsualState.MakeBet.yourProfit} </span>
                                <span style={{fontSize: '21px'}}>
                                                    {up || down ? ((bet / (bet + upBets) * downBets) * 0.97).toFixed(6) : 0}
                                                </span>
                                <img style={{marginTop: '-5px'}} src={bitcoin} width="15" height="21" alt="b"/>
                            </div>
                        </div>}
                    {startGame && (predict === 'up' || !predict)
                        ? <></>
                        :
                        <div style={{display: (predict === 'down' || !predict) ? 'block' : 'none'}}
                             className="down">
                            <div style={{display: predict === 'up' ? "none" : "inherit"}} className="profit">
                                                    <span style={{
                                                        fontSize: '21px',
                                                        display: widthMode === "mobile" ? "inline" : "inline"
                                                    }}
                                                          className={currentLang + " red"}>{LANG.Training.UsualState.MakeBet.yourProfit} </span>
                                <span
                                    style={{fontSize: '21px'}}>{up || down ? ((bet / (bet + downBets) * upBets) * 0.97).toFixed(6) : 0}
                                                </span>
                                <img style={{marginTop: '-5px'}} src={bitcoin} width="15" height="21" alt="b"/>
                            </div>
                        </div>}
                </div>
            </div>
        );
    } else {
        return (
            <div className={`${widthMode} row bottom-container`}>
                {widthMode === "desktop" ? <Rates/> : <></>}
                <div className={`${widthMode} round dashboard`}>
                    <div className="range">
                        <div className="form-label d-flex justify-content-between">
                            <div>
                                <h2 className={predict || startGame ? "text-left" : "make-bet text-left"}>{LANG.BettingRealMoney.UsualState.MakeBet.title}</h2>
                                {/*<span className="time-bet">{timeBet ? counterBet : ''}</span>*/}
                            </div>
                            <div>
                                {widthMode === "mobile" ? <Online/> : <></>}
                                <span className={balance - bet >= 0 ? '' : 'red'}>
                                <input id="numberBet" type="number" step="0.0001" min="0.0001" max="1"
                                       className={balance - bet >= 0 ? '' : 'red'}
                                       disabled={predict || !timeBet}
                                       onInput={setBetHandler}
                                       value={bet}/>
                                <img className="numberBet" width="15" src={bitcoin} alt="up"/>
                            </span>
                            </div>
                        </div>
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="form">
                                <div className="bet">
                                    <input min="0.0001" max="1" step="0.0001"
                                           type="range"
                                           disabled={predict || !timeBet || startGame}
                                           value={bet}
                                           style={{backgroundImage: `linear-gradient(to right, ${balance - bet >= 0 ? '#32D74B' : '#FF453A'} 0%, ${balance - bet >= 0 ? '#32D74B' : '#FF453A'} ${bet * 100}%, #fff ${bet * 100}%, white 100%)`}}
                                           onChange={setBetHandler}
                                           className={balance - bet >= 0 ? 'green-range' : 'red-range'}
                                           id="range"/>
                                </div>
                                <div className='wrap-btn'>

                                    {startGame && (predict === 'down' || !predict)
                                        ? <span style={{display: startGame && !predict ? 'flex' : 'none'}}
                                                className="off">All bets are off</span>
                                        : <div style={{
                                            display: predict === 'up' || !predict ? 'block' : 'none',
                                            transform: startGame && (predict === 'down' || !predict) ? 'scale(0)' : 'scale(1)'
                                        }} className="up">
                                            <div className="profit">
                                                    <span style={{display: widthMode === "mobile" ? "block" : "inline"}}
                                                          className={" green"}>{LANG.BettingRealMoney.UsualState.MakeBet.yourProfit}</span>
                                                <span> <br/>
                                                    {up || down ? ((bet / (bet + upBets) * downBets) * 0.97).toFixed(6) : 0}
                                                </span>
                                                <img src={bitcoin} width="15" height="20" alt="b"/>
                                            </div>
                                            <button disabled={predict || balance - bet < 0 || !timeBet}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        betDone(e);
                                                    }}
                                                    className={" btn green predict-btn"}>{LANG.BettingRealMoney.UsualState.MakeBet.btnUp}

                                                <img src={arrowUp} width="15" height="20" alt="b"/>
                                                <Rect idButton={'up'} mode={timeBet ? 'rectUp' : ""}/>
                                            </button>
                                        </div>}

                                    <p
                                        style={{
                                            display: startGame && predict === 'up' ? 'flex' : 'none'
                                        }}
                                        id="predict"
                                        className="btn bet-btn col-sm-4">
                                            <span className="gold">{counter}
                                                <span className='circle'>
                                                    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                                                    <g>
                                                        <title>Layer 1</title>
                                                        <circle
                                                            strokeDasharray={440}
                                                            strokeDashoffset={counter === 10 ? -2 * initialOffset : ((i + 1) * (initialOffset / time)) - 2 * initialOffset}
                                                            id="circle" className="circle_animation" r="69.85699"
                                                            cy="81"
                                                            cx="81" strokeWidth="6"
                                                            stroke="#F7931A" fill="none"/>
                                                    </g>
                                                </svg>
                                                </span>
                                            </span>
                                    </p>

                                    <p style={{
                                        display: startGame && (predict === 'down' || !predict) ? 'flex' : 'none'
                                    }}
                                       id="predict"
                                       className="btn bet-btn col-sm-4">
                                            <span className="gold">{counter}
                                                <span className='circle'>
                                                    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                                                    <g>
                                                        <title>Layer 1</title>
                                                        <circle
                                                            strokeDasharray={440}
                                                            strokeDashoffset={counter === 10 ? -2 * initialOffset : ((i + 1) * (initialOffset / time)) - 2 * initialOffset}
                                                            id="circle" className="circle_animation" r="69.85699"
                                                            cy="81"
                                                            cx="81" strokeWidth="6"
                                                            stroke="#F7931A" fill="none"/>
                                                    </g>
                                                </svg>
                                                </span>
                                            </span>
                                    </p>

                                    {startGame && (predict === 'up' || !predict)
                                        ? <></>
                                        :
                                        <div style={{display: (predict === 'down' || !predict) ? 'block' : 'none'}}
                                             className="down">
                                            <div className="profit">
                                                    <span style={{display: widthMode === "mobile" ? "block" : "inline"}}
                                                          className={" red"}>{LANG.BettingRealMoney.UsualState.MakeBet.yourProfit}</span>
                                                <span> <br/>
                                                    {up || down ? ((bet / (bet + downBets) * upBets) * 0.97).toFixed(6) : 0}
                                                </span>
                                                <img src={bitcoin} width="15" height="20" alt="b"/>
                                            </div>
                                            <button disabled={predict || balance - bet < 0 || !timeBet}
                                                // onClick={() => up_down()}
                                                    onClick={(e) => {
                                                        btnDownHandler(e)
                                                    }}
                                                    className={" btn red predict-btn"}
                                                    id="down">{LANG.BettingRealMoney.UsualState.MakeBet.btnDown}
                                                <img src={arrowDown} width="15" height="20" alt="b"/>
                                                <Rect idButton={'down'} mode={timeBet ? 'rectDown' : ""}/>
                                            </button>
                                        </div>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        balance: state.balanceReducer.balance,
        congratulation: state.balanceReducer.congratulation,
        course: state.courseReducer.course,
        currentCourse: state.courseReducer.currentCourse,
        currentTime: state.courseReducer.currentTime,
        lastSeconds: state.courseReducer.lastSeconds,
        lastWin: state.balanceReducer.lastWin,
        predict: state.balanceReducer.predict,
        downBets: state.balanceReducer.downBets,
        upBets: state.balanceReducer.upBets,
        up: state.balanceReducer.up,
        down: state.balanceReducer.down,
        widthMode: state.switchOptions.widthMode,
        currentLang: state.switchOptions.lang
    }
}
const mapDispatchToProps = {
    betWin,
    betLose,
    predictUp,
    predictDown,
    predictClear,
    click,
    up_down,
    you_lose,
    bell,
    playTimer,
    playTimer2,
    fireworks,
    closeCongratulation,
    muteToggle,
    userdata
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
