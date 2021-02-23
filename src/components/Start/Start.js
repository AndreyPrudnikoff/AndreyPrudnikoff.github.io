import React, {useState, useEffect} from 'react';
import './start.scss';
import Graph from "../Graph";
import Time from "../Main/Time";
import bitcoin from "../../images/bitcoin.svg";
import {connect} from "react-redux";
import arrowDown from "../../images/arrowDown.svg";
import arrowUp from "../../images/arrowUp.svg";
import bull from "../../images/bull_start.png";
import bear from "../../images/bear_start.png";
import Rect from "../Main/Rect/Rect";
import Preloader from "../Main/Preloader";
import bitsybets from "../../images/BITCYBETS.svg";
import coin from "../../images/coin.svg";
import {userdata} from "../../redux/actions/game";
import {registration} from "../../redux/actions";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Start = ({currentCourse, course, history, lastSeconds, userdata, widthMode, registration, currentLang}) => {
    const [timeGame, setTimeGame] = useState(false);
    const [bet, setBet] = useState('');
    const [predict, setPredict] = useState('');

    const LANG = currentLang === "en" ? EN : RU

    useEffect(() => {
        if (lastSeconds % 10 === 0) {
            setTimeGame(true);
        }
    }, [lastSeconds])
    useEffect(() => {
        if (lastSeconds % 10 === 0) {
            if (bet === 'down' && currentCourse < course[course.length - 2]) {
                setPredict('win');
                setBet('');
            } else if (bet === 'down' && currentCourse > course[course.length - 2]) {
                setPredict('lose');
                setBet('');
            } else if (bet === 'up' && currentCourse > course[course.length - 2]) {
                setPredict('win');
                setBet('');
            } else if (bet === 'up' && currentCourse < course[course.length - 2]) {
                setPredict('lose');
                setBet('');
            } else {
                setBet('');
            }
        }

    }, [currentCourse])
    return (
        <div  className="start">

            {/*<div style={{display: predict === 'win' ? "block" : "none"}} className="blur soon">*/}
            {/*    <div className="round-dark win">*/}
            {/*        <div className="win-btn">*/}
            {/*            <h2>Sorry, you're out of luck! <br/> try again!</h2>*/}
            {/*            <button onClick={() => {*/}
            {/*                setPredict('');*/}
            {/*                setBet('');*/}
            {/*            }} className="btn btn-primary">OK*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div style={{display: predict ? "block" : "none"}} className="blur soon">
                <div className="round-dark win">
                    <div className="win-btn">
                       <span onClick={() => {
                           setPredict('');
                           setBet('');
                       }} className="chross">&#10008;</span>
                        <h2>{LANG.Main.Modal.title.first} <br/> {currentLang === "en" ? LANG.Main.Modal.title.second : null}</h2>
                        {/* <h2>{currentLang === "en" ? LANG.Main.Modal.title.first <br/> LANG.Main.Modal.title.second : LANG.Main.Modal.title.first}</h2> */}
                        {/* <h2>You did great! <br/> Join now!</h2> */}
                        <button onClick={() => {
                            setPredict('');
                            setBet('');
                            history.push('/login')
                        }} className="btn btn-primary">
                            {LANG.Main.Modal.logIn}
                        </button>
                        <button onClick={() => {
                            setPredict('');
                            setBet('');
                            history.push('/signup');
                            registration();
                        }} className="btn btn-primary">
                            {LANG.Main.Modal.signUp}
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${widthMode}-start round round-dark`}>
                <div className="bull-start-mobile"><img src={bull} width="" alt="bull"/></div>
                <div className="bear-start-mobile"><img src={bear} width="" alt="bear"/></div>
                <div className="bull-start"><img src={bull} alt="bull"/></div>
                <div className="bear-start"><img src={bear} alt="bear"/></div>
                <div className="text text-center">
                    <span className="gold">{LANG.Main.Start.implemented}</span>
                    <h2>
                        {/* {currentLang === 'en' ? <span><span className="gold">BITCY</span>BETS</span> : LANG.Main.Start.title} */}
                        <span className="gold">BITCY</span>BETS
                        
                    </h2>
                    <p className="mt-3">{LANG.Main.Start.content}</p>
                </div>
                <div className="dark">
                    <Time/>
                    <div className="course">
                        <h2 style={{opacity: !currentCourse ? 0 : 1}} className="text-center"><img src={bitcoin} alt="course"/>
                            {currentCourse} <span>$</span>
                        </h2>
                        <div>
                            {/*<SelectList/>*/}
                        </div>
                    </div>
                    <div style={{display: !currentCourse ? "none" : "block"}} className="graph">
                        <Graph gradient1={20} gradient2={150} chartHeight={widthMode === "desktop" ? 200 : 150}/>
                    </div>
                    <div style={{display: currentCourse ? "none" : "block"}}  className="load">
                        <div className="wrap-img-preload">
                            <img className="coin1"  src={coin} alt=""/>
                            <img className="coin2"  src={coin} alt=""/>
                            <img className="coin3"  src={coin} alt=""/>
                            <img className="coin4"  src={coin} alt=""/>
                        </div>
                    </div>
                    <div className="buttons">
                        <div className="wrap-btn">
                            <button disabled={bet || !currentCourse} onClick={() => setBet('down')}
                                    className="btn green green-start predict-btn"
                                    id="down">
                                        {LANG.Main.Start.btnUp}
                                <img src={arrowUp} width="15" height="20" alt="b"/>
                                <Rect start={timeGame} infinite={'infinity'} idButton={'down'}
                                      mode={timeGame ? 'rectUp' : ''}/>
                            </button>
                            <button disabled={bet || !currentCourse} onClick={() => setBet('up')}
                                    className="btn red red-start predict-btn"
                                    id="down">
                                        {LANG.Main.Start.btnDown}
                                <img src={arrowDown} width="15" height="20" alt="b"/>
                                <Rect infinite={'infinity'} idButton={'down'} mode={timeGame ? 'rectDown' : ''}/>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bg"/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentCourse: state.courseReducer.currentCourse,
        course: state.courseReducer.course,
        lastSeconds: state.courseReducer.lastSeconds,
        widthMode: state.switchOptions.widthMode,
        currentLang: state.switchOptions.lang
    }
}
const mapDispatchToProps = {
    userdata,
    registration
}
export default connect(mapStateToProps, mapDispatchToProps)(Start);
