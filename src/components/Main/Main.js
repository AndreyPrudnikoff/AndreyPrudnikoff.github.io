import React, { useEffect } from 'react';
import {connect} from "react-redux";
import './main.scss';
import bitcoin from '../../images/bitcoin.svg';
import Graph from "../Graph";
import RightSector from "./RightSector";
import Dashboard from "./Dashboard";
// import SelectList from "./SelectList";
import {
    closeCongratulation,
    closeYourLose,
    createAdProp,
    logoutQuestion,
    prohibition,
    switchView
} from "../../redux/actions";
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

const Main = ({history, step, view, switchView, course, lastWin, closeCongratulation, congratulation, yourlose, closeYourLose, currentCourse, money, muteToggle, logout, logoutQuestion, prohibition, userdata, lastWinGame, createAd, createAdProp, widthMode, currentLang, you_lose, add_to_wallet, playClick}) => {

    useEffect(() => {
        userdata();
    }, [congratulation, userdata]);
    useEffect(()=> switchView(false), []);

    const LANG = currentLang === "en" ? EN : RU;
    let flag = course ? course.length : false;
    return (
        <div className={`${widthMode}-bg main`}>
            <Preloader show={flag}/>
            <div style={{display: createAd ? "block" : "none"}} className="blur soon">
                <div className="round-dark win">
                    <div className="win-btn">
                        <h2>This feature coming soon</h2>
                        <button onClick={() => {
                            createAdProp();
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
        createAd: state.switchOptions.createAd,
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
    createAdProp,
    you_lose,
    add_to_wallet,
    playClick,
    switchView
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
