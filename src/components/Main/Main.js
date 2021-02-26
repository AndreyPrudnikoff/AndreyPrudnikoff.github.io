import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";
import './main.scss';
import bitcoin from '../../images/bitcoin.svg';
import Graph from "../Graph";
import RightSector from "./RightSector";
import Dashboard from "./Dashboard";
// import SelectList from "./SelectList";
import {closeCongratulation, closeYourLose, createAd, logoutQuestion, prohibition, switchView} from "../../redux/actions";
import {money, stop, you_lose, add_to_wallet, playClick} from "../../redux/actions/music";
import JS_FIREWORKS from "../fireworks";
import Time from "./Time";
import Preloader from "./Preloader";
import {userdata} from "../../redux/actions/game";
import Rates from "./Rates";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";
import Online from "./Online";
import Presentation from "../Intro/Presentation";

const fire = () => {
    document.getElementById('fireworks-canvas').style.width = '100%'
    document.getElementById('fireworks-canvas').style.height = '100%'
    const firework = JS_FIREWORKS.Fireworks({
        id: 'fireworks-canvas',
        hue: 120,
        particleCount: 100,
        delay: 0,
        minDelay: 5,
        maxDelay: 10,
        boundaries: {
            top: 50,
            bottom: 240,
            left: 50,
            right: 590
        },
        fireworkSpeed: 2,
        fireworkAcceleration: 1.05,
        particleFriction: .95,
        particleGravity: 1.5
    });
    firework.start();
};

const Main = ({history, step, view, switchView, course, lastWin, closeCongratulation, congratulation, yourlose, closeYourLose, currentCourse, money, muteToggle, logout, logoutQuestion, prohibition, userdata, lastWinGame, createAd, createAdProp, widthMode, currentLang, you_lose, add_to_wallet, playClick}) => {

    useEffect(() => {
        userdata();
        fire();
    }, [congratulation]);
    useEffect(() => {fire()}, []);
    useEffect(()=> switchView(false), []);
    const LANG = currentLang === "en" ? EN : RU;
    let flag = course ? course.length : false;
    return (
        <div className={`${widthMode}-bg main`}>
            <Preloader show={flag}/>
            <div style={{display: congratulation ? "block" : "none"}} className="blur">
                <canvas width="640" height="480" id="fireworks-canvas" style={{background: 'rgba(0,0,0, .2)'}}/>
                <div className="round-dark win">
                    <h2 className="currentLang">{LANG.BettingRealMoney.WinningAndLosing.Winning.title}</h2>
                    <div className={currentLang + " text-center"}>{LANG.BettingRealMoney.WinningAndLosing.Winning.youWon} {lastWinGame || 1} <img src={bitcoin} width="15" alt="bit"/>
                    </div>
                    <div className="win-btn">
                        <button onClick={() => {
                            closeCongratulation();
                            userdata();
                            document.getElementById('fireworks').pause();

                            // money();
                            add_to_wallet();
                        }} className={currentLang + " btn btn-primary"}>{LANG.BettingRealMoney.WinningAndLosing.Winning.btnAddToWallet}
                        </button>
                        <button disabled onClick={() => {
                            closeCongratulation();
                            userdata();
                            playClick()
                            document.getElementById('fireworks').pause();
                            // money();
                        }} className={currentCourse + " btn btn-primary"}>{LANG.BettingRealMoney.WinningAndLosing.Winning.btnWithdraw}
                        </button>
                    </div>
                </div>
            </div>

            <div style={{display: yourlose ? "block" : "none"}} className="blur">
                <div className="round-dark win">
                    <h2>Your lose</h2>
                    <div className="win-btn">
                        <button onClick={() => {
                            closeYourLose();
                            userdata();
                            playClick()
                        }} className="btn btn-primary">Bet again
                        </button>
                    </div>
                </div>
            </div>
            <div style={{display: createAdProp ? "block" : "none"}} className="blur soon">
                <div className="round-dark win">
                    <div className="win-btn">
                        <h2>This feature coming soon</h2>
                        <button onClick={() => {
                            createAd();
                            playClick()
                        }} className="btn btn-primary">OK
                        </button>
                    </div>
                </div>
            </div>

            <main style={{display: flag ? 'block' : 'none'}}>
                <div className="row main">
                    <Presentation />
                    <div style={{display: widthMode === "mobile" && view ? "none" : "flex"}} className="left-sector">
                        {widthMode === "mobile" ? <Rates/> : <></>}
                        <div style={{zIndex: step === 1 ?  "10" : "" } } className={`${widthMode} round globe`}>
                            {widthMode === "desktop" ? <Time/> : <></>}
                            <div>
                                <h2 className="text-center"><img src={bitcoin} className="m-2" alt="course"/>
                                    {currentCourse} <span>$</span>
                                </h2>
                                <div>
                                    {widthMode === "desktop" ? <Online/> : <></>}
                                </div>
                            </div>
                            <div className="graph-wrapper">
                                <div className="graph">
                                    <Graph gradient1={widthMode === "desktop" ? undefined : 20}
                                           gradient2={widthMode === "desktop" ? undefined : 150}
                                           chartHeight={widthMode === "desktop" ? 250 : 150}/>
                                </div>
                            </div>
                        </div>
                        <Dashboard/>
                    </div>
                    {widthMode === "desktop" ? <RightSector/> : <></>}
                    {widthMode === "mobile" && view ? <RightSector/> : <></>}

                </div>
            </main>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        course: state.courseReducer.course,
        currentCourse: state.courseReducer.currentCourse,
        lastWin: state.balanceReducer.lastWin,
        lastWinGame: state.balanceReducer.lastWinGame,
        congratulation: state.balanceReducer.congratulation,
        yourlose: state.balanceReducer.yourlose,
        logout: state.authReducer.logoutQuestion,
        createAdProp: state.switchOptions.createAd,
        widthMode: state.switchOptions.widthMode,
        view: state.switchOptions.view,
        currentLang: state.switchOptions.lang,
        step: state.switchOptions.step
    }
}
const mapDispatchToProps = {
    closeCongratulation,
    closeYourLose,
    money,
    stop,
    logoutQuestion,
    prohibition,
    userdata,
    createAd,
    you_lose,
    add_to_wallet,
    playClick,
    switchView
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
