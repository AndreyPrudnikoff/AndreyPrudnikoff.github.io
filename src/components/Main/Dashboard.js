import React, {useState, useEffect} from 'react';
import bitcoin from "../../images/bitcoin.svg";
import arrowUp from "../../images/arrowUp.svg";
import arrowDown from "../../images/arrowDown.svg";
import {connect} from "react-redux";
import store from '../../redux/store'
import {betLose, betWin, closeCongratulation, closeYourLose} from "../../redux/actions";
import {
    bell,
    click,
    up_down,
    fireworks,
    you_lose,
    muteToggle,
    playTimer,
    playTimer2,
    stop,
    stopBetTimer, stopGameTimer, playBetTimer, playGameTimer, playYouWon
} from "../../redux/actions/music";
import Rates from "./Rates";
import {User} from "../../api/User";
import {predictClear, predictDown, predictUp, userdata} from "../../redux/actions/game";
import Rect from "./Rect/Rect";
import Timer from "./Timer";
import Online from "./Online";
import YouWon from '../../images/You_won (2).png';
import GoldCoins from '../../images/Gold_coins1.png';
import CoinUpImg from '../../images/coinUp.svg'
import CoinDownImg from '../../images/coinDown.svg'


import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";


const Dashboard = ({
                       stopBetTimer,
                       stopGameTimer,
                       playBetTimer,
                       playGameTimer,
                       step,
                       predictUp,
                       betWin,
                       betLose,
                       fireworks,
                       userdata,
                       predictClear,
                       predictDown,
                       balance,
                       predict,
                       upBets,
                       downBets,
                       up,
                       down,
                       lastSeconds,
                       widthMode,
                       currentLang,
                       up_down,
                       you_lose,
                       playTimer,
                       playTimer2,
                       stop,
                       play,
                       yourlose,
                       closeYourLose,
                       congratulation,
                       closeCongratulation,
                       playYouWon,
                       lastWinGame
                   }) => {
    const [bet, setBet] = useState(.0001);
    const [counter, setCounter] = useState(10);
    const [gameStart, setGameStart] = useState(undefined);
    const LANG = currentLang === "en" ? EN : RU;
    let timeBet = lastSeconds % 20 === 0 || lastSeconds % 20 === 5;
    let startGame = lastSeconds % 20 === 10 || lastSeconds % 20 === 15;

    useEffect(() => {
        if (startGame && gameStart === undefined) {
            setGameStart(lastSeconds);
            predictSubmit();
        }

    }, [lastSeconds])

    useEffect(() => {
        if (startGame && !!predict) {
            stopBetTimer();
            playGameTimer();
            playTimer();
        } else if (timeBet && !!predict) {
            stopGameTimer();
            playBetTimer();
            playTimer2();
        } else {
            stopBetTimer();
            stopGameTimer();
        }

    }, [startGame, timeBet, predict])

    useEffect(() => {
        if (yourlose === true) {
            you_lose();
            setTimeout(() => {
                closeYourLose()
            }, 3000);
        }

    }, [yourlose])

    useEffect(() => {
        if (congratulation === true) {
            playYouWon();
            setTimeout(() => {
                closeCongratulation()
            }, 4000);
        }
    }, [congratulation])

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
    const setBetStep = (bool) => {
        if (!bet || +bet < 0) {
            setBet(0.0001);
        }else if (bet > 1) {
            setBet(1);
        } else {
            bool ? setBet(bet + .0001) : setBet(bet - .0001);
        }
    }

    const betDone = (e) => {
        let rate = e.target.id;
        up_down();
        if (rate === 'up') {
            playBetTimer();
            playGameTimer();
            predictUp({value: bet.toString()});
        } else if (rate === 'down') {
            playBetTimer();
            playGameTimer();
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
                        // fireworks();
                    } else if (+data.data.data.lastWin === -1 && predict !== '') {
                        you_lose();
                        betLose();
                        userdata();
                    } else if (up > 0 && down > 0) {
                        userdata();
                    } else {
                        userdata();
                    }
                }).catch(e => {
                console.log(e)
            });
            setGameStart(undefined);
            predictClear();
        }, 10000)
    }

    const btnDownHandler = (e) => {
        e.preventDefault();
        betDone(e);
    }

    if (congratulation) { // congratulation
        return (
            <div className={`${widthMode} row bottom-container`}>
                {widthMode === "desktop" ? <Rates/> : <></>}
                <div style={{zIndex: step === 3 ? "10" : ""}} className={`${widthMode} round dashboard congratulation`}>
                    <img src={YouWon} className='congratulation__youWon-img'/>
                    <img src={GoldCoins} className='congratulation__coins-img'/>
                    <p className='congratulation__score'>{lastWinGame} <img className='congratulation__btc'
                                                                            src={bitcoin} alt='btc'/></p>
                </div>
            </div>
        )
    }

    if (yourlose) { //yourlose
        return (
            <div className={`${widthMode} row bottom-container`}>
                {widthMode === "desktop" ? <Rates/> : <></>}
                <div style={{zIndex: step === 3 ? "10" : ""}} className={`${widthMode} round dashboard yourLose`}>
                    <h1>You lose</h1>
                </div>
            </div>
        )
    }

    if (startGame) { //startGame
        console.log(predict)
        return (
            <div className={`${widthMode} row bottom-container`}>
                {widthMode === "desktop" ? <Rates/> : <></>}
                <div style={{zIndex: step === 3 ? "10" : ""}} className={`${widthMode} round dashboard big-timer`}>
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
                                <div className='coinImg'>
                                    <img src={CoinUpImg} alt='coin'/>
                                </div>
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
                                <div className='coinImg'>
                                    <img src={CoinDownImg} alt='coin'/>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
        );
    } else {
        return (
            <div className={`${widthMode} row bottom-container`}>
                {widthMode === "desktop" ? <Rates/> : <></>}
                <div style={{zIndex: step === 3 ? "10" : ""}} className={`${widthMode} round dashboard`}>
                    <div className="range">
                        <div className="form-label d-flex justify-content-between">
                            <div className='makeYourBet'>
                                <h2 className={predict || startGame ? "text-left" : "make-bet text-left"}>
                                    {/* {widthMode === "desktop" ? LANG.BettingRealMoney.UsualState.MakeBet.title : ""}</h2> */}
                                    {LANG.BettingRealMoney.UsualState.MakeBet.title}</h2>
                                <p className='setSize'>Set bet size</p>
                            </div>
                            <div className="balanceInput">
                                {widthMode === "mobile" ? <Online/> : <></>}
                                <span className='balanceBtn minus' onClick={() => setBet(bet - 0.001)}>-</span>
                                <span
                                    className={balance - bet >= 0 ? 'balanceInput__balance' : 'balanceInput__balance red'}
                                    onClick={() => setBetStep(false)}>
                                    <input id="numberBet" type="number" step="0.0001" min="0.0001" max="1"
                                           className={balance - bet >= 0 ? '' : 'red'}
                                           disabled={predict || !timeBet}
                                           onInput={setBetHandler}
                                           value={bet}/>
                                    <img className="numberBet" width="15" src={bitcoin} alt="up"/>
                                </span>
                                <span className='balanceBtn plus' onClick={() => setBetStep(true)}>+</span>
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
                                                <span>
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

                                    {startGame && (predict === 'up' || !predict)
                                        ? <></>
                                        :
                                        <div style={{display: (predict === 'down' || !predict) ? 'block' : 'none'}}
                                             className="down">
                                            <div className="profit">
                                                    <span style={{display: widthMode === "mobile" ? "block" : "inline"}}
                                                          className={" red"}>{LANG.BettingRealMoney.UsualState.MakeBet.yourProfit}</span>
                                                <span>
                                                    {up || down ? ((bet / (bet + downBets) * upBets) * 0.97).toFixed(6) : 0}
                                                </span>
                                                <img src={bitcoin} width="15" height="20" alt="b"/>
                                            </div>
                                            <button disabled={predict || balance - bet < 0 || !timeBet}
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
        lastWinGame: state.balanceReducer.lastWinGame,
        congratulation: state.balanceReducer.congratulation,
        predict: state.balanceReducer.predict,
        yourlose: state.balanceReducer.yourlose,
        downBets: state.balanceReducer.downBets,
        upBets: state.balanceReducer.upBets,
        up: state.balanceReducer.up,
        down: state.balanceReducer.down,
        widthMode: state.switchOptions.widthMode,
        currentLang: state.switchOptions.lang,
        step: state.switchOptions.step,
        play: state.soundReducer.play,
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
    stop,
    playTimer,
    playTimer2,
    fireworks,
    closeCongratulation,
    muteToggle,
    userdata,
    stopBetTimer,
    stopGameTimer,
    playBetTimer,
    playGameTimer,
    closeYourLose,
    closeCongratulation,
    playYouWon
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
