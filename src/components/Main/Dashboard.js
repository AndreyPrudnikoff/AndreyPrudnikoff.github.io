import React from 'react';
import bitcoin from "../../images/bitcoin.svg";
import arrowUp from "../../images/arrowUp.svg";
import arrowDown from "../../images/arrowDown.svg";
import {connect} from "react-redux";
import {betLose, betWin, closeCongratulation} from "../../redux/actions";
import {bell, click, tic, fireworks, muteToggle} from "../../redux/actions/music";
import Rates from "./Rates";
import {User} from "../../api/User";
import {predictClear, predictDown, predictUp, userdata} from "../../redux/actions/game";
import Rect from "./Rect/Rect";
import SelectList from "./SelectList";
import Timer from "./Timer";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bet: .0001,
            counter: 10,
            // counterBet: 10,
            initialOffset: 440,
            gameStart: undefined
        };
        this.setBet = this.setBet.bind(this);
        this.predictSubmit = this.predictSubmit.bind(this);
        // this.countSec = this.countSec.bind(this);
        this.betDone = this.betDone.bind(this);
    }

    setBet(e) {
        let bet = +e.target.value.slice(0, 5);
        if (!bet) {
            bet = 0.0001;
        }
        if (bet > 1) {
            bet = 1;
        }
        this.setState((state) => ({...state, ...{bet: bet ? bet : 0.0001}}));
    }

    betDone(e) {
        let rate = e.target.id;
        this.props.click();
        if (rate === 'up') {
            this.props.predictUp({value: this.state.bet.toString()});
        } else if (rate === 'down') {
            this.props.predictDown({value: this.state.bet.toString()});
        }
    }

    // countSec() {
    //     const betTimer = setInterval(() => {
    //         this.setState((state) => ({...state, counterBet: state.counterBet - 1}));
    //         // this.props.tic();
    //     }, 1000)
    //     return setTimeout(() => {
    //         clearInterval(betTimer);
    //         this.setState((state) => ({...state, counterBet: 10}));
    //     }, 10000)
    // }

    predictSubmit() {
        const timer = setInterval(() => {
            this.setState((state) => ({...state, counter: state.counter - 1}));
            // this.props.tic();
        }, 1000)
        const predict = this.props.predict;
        return setTimeout(() => {
            clearInterval(timer);
            this.setState((state) => ({...state, counter: 10}));
            User.userdata()
                .then(data => {
                    if (+data.data.data.lastWin === 1 && predict !== '') {
                        // this.props.bell();
                        this.props.betWin();
                        this.props.fireworks();
                    } else if (+data.data.data.lastWin === -1 && predict !== '') {
                        this.props.bell();
                        this.props.betLose();
                        this.props.userdata();
                    } else if (this.props.up > 0 && this.props.down > 0) {
                        this.props.bell();
                        this.props.userdata();
                    } else {
                        this.props.userdata();
                    }
                })
            this.setState((state) => ({...state, gameStart: undefined}));
            this.props.predictClear();
            // this.countSec();
        }, 10000)
    }



    render() {
        const {bet, counter, initialOffset} = this.state;
        const {balance, predict, upBets, downBets, up, down, lastSeconds, widthMode, currentLang} = this.props;
        const LANG = currentLang === "en" ? EN : RU;
        console.log(currentLang)
        const time = 10;
        const i = 10 - counter || 1;
        let timeBet = lastSeconds % 20 === 0 || lastSeconds % 20 === 5;
        let startGame = lastSeconds % 20 === 10 || lastSeconds % 20 === 15;

        if (startGame && this.state.gameStart === undefined) {
            this.setState((state) => ({...state, gameStart: lastSeconds}));
            this.predictSubmit();
        }

        if (startGame) {
            return (
                <div className={`${widthMode} row bottom-container`}>
                    {widthMode === "desktop" ? <Rates/> : <></>}
                    <div className={`${widthMode} round dashboard big-timer`}>
                        <Timer />
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
                                                        display: widthMode === "mobile" ? "inline" : "inline"}}
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
                                                        display: widthMode === "mobile" ? "inline" : "inline"}}
                                                          className={currentLang + " red"}>{LANG.Training.UsualState.MakeBet.yourProfit} </span>
                                    <span style={{fontSize: '21px'}}>{up || down ? ((bet / (bet + downBets) * upBets) * 0.97).toFixed(6) : 0}
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
                                    {widthMode === "mobile" ? <SelectList/> : <></>}
                                    <span className={balance - bet >= 0 ? '' : 'red'}>
                                <input id="numberBet" type="number" step="0.0001" min="0.0001" max="1"
                                       className={balance - bet >= 0 ? '' : 'red'}
                                       disabled={predict || !timeBet}
                                       onInput={this.setBet}
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
                                               onChange={this.setBet}
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
                                                            this.betDone(e);
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
                                                            id="circle" className="circle_animation" r="69.85699" cy="81"
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
                                                            id="circle" className="circle_animation" r="69.85699" cy="81"
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
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            this.betDone(e);
                                                        }}
                                                        className={" btn red predict-btn"} id="down">{LANG.BettingRealMoney.UsualState.MakeBet.btnDown}
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
    tic,
    bell,
    fireworks,
    closeCongratulation,
    muteToggle,
    userdata
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
