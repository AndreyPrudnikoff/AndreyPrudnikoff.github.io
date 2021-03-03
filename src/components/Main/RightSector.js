import React, {useEffect, useState} from 'react';
import bitcoin from "../../images/bitcoin.svg";
import deposit from '../../images/deposit.svg';
import withdraw from '../../images/withdraw.svg';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {playClick, transition} from "../../redux/actions/music";
import switchWallet from "../../images/switch_wallet.svg";
import {changeDemo, userdata} from "../../redux/actions/game";
import {createAd} from "../../redux/actions";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const RightSector = ({step, balance, lastWinGame, lastgame, wins, colorBlalance, userdata, name, isDemo, threewins, changeDemo, createAd, predict, currentLang, playClick, transition}) => {
    const [switcher, setSwitcher] = useState(false);
    const [banner, setBanner] = useState("banner one round-dark");
    const LANG = currentLang === "en" ? EN : RU;
    const balanceColor = {color: colorBlalance === 'green' ? '#32D74B' : colorBlalance === 'red' ? '#FF453A' : '#FFFFFF'}

    // useEffect(() => {
    //     const addBanner = setInterval(() => {
    //         if(banner === "banner one round-dark") {
    //             setBanner("banner three round-dark");
    //         // } else if (banner === "banner two round-dark") {
    //         //     setBanner("banner three round-dark");
    //         } else if(banner === "banner three round-dark") {
    //             setBanner("banner one round-dark");
    //         }
    //     }, 30000)
    //     return () => clearInterval(addBanner)
    // }, [banner])
    useEffect(() => {
        userdata();
    }, [userdata])

    return (
        <div className="right-sector">
            <div style={{display: switcher ? "block" : "none"}} className="blur">
                <div className="round-dark win">
                    <h2 className="curremtLang">{LANG.Training.UsualState.SwitchingToReal.title}</h2>
                    {/*<div className="text-center">You are going to play on real <br/> money. Are you sure? </div>*/}
                    <div className="win-btn">
                        <button onClick={() => {
                            transition();
                            changeDemo();
                            setSwitcher(false);
                        }}
                                className={currentLang + " btn btn-primary"}>{isDemo ? LANG.Training.UsualState.SwitchingToReal.btnSwitchToReal : LANG.Training.UsualState.SwitchingToDemo.btnSwitchToDemo}
                        </button>
                        <button onClick={() => {
                            transition();
                            userdata();
                            setSwitcher(false);
                        }} className={currentLang + " btn btn-primary"}>{!isDemo ? LANG.Training.UsualState.SwitchingToDemo.btnContinueReal : LANG.Training.UsualState.SwitchingToReal.btnContinueDemo}
                        </button>
                    </div>
                </div>
            </div>
            <div style={{zIndex: step === 4 || step === 5 ? "10" : ""}} className="score-wrap round-dark">
                <h2 className="currentLang">{isDemo ? LANG.Training.UsualState.DemoWallet.title : LANG.BettingRealMoney.UsualState.MyWallet.title}
                    <span onClick={() => {
                        if(!predict) {
                            setSwitcher(true)
                        }
                        playClick()
                    }} className={isDemo ? "switch-wrapper demo" : "switch-wrapper real"}
                    style={predict ? {filter: 'grayscale(1)', opacity: .5} : null}>
                    <img src={switchWallet} alt=""/>
                </span></h2>
                <table>
                    <tbody>
                    <tr>
                        <td width='50%'>
                            <div className={currentLang + " label"}>{LANG.BettingRealMoney.UsualState.MyWallet.nameTitle}</div>
                            <div className="score" id="name">{name}</div>
                        </td>
                        <td>
                            <div className={currentLang + " label"}>{LANG.BettingRealMoney.UsualState.MyWallet.lastWinTitle}</div>
                            <div className="score" id="lastWin">{lastWinGame || '0.000'} BTC</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td> 
                            <div className={currentLang + " label"}>{LANG.BettingRealMoney.UsualState.MyWallet.balanceTitle}</div>
                            <div style={balanceColor} className="score score-balance" id="balance">{balance} &#8383;</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                    
               
                {!isDemo
                    ? <div>
                    <Link to="/refill" style={{pointerEvents: predict ? "none" : "auto"}} className={currentLang + " btn money-btn green"} onClick={playClick}>{LANG.BettingRealMoney.UsualState.MyWallet.btnDeposit}
                    <img src={deposit} alt="deposit"/>
                    </Link>
                    <Link to="/withdraw" style={{pointerEvents: predict ? "none" : "auto"}} className={currentLang + " btn money-btn red"} onClick={playClick}>{LANG.BettingRealMoney.UsualState.MyWallet.btnWithdraw}
                    <img src={withdraw} alt="withdraw"/>
                    </Link>
                    </div>
                    : <div>
                        <button disabled={predict} onClick={() => {setSwitcher(true); playClick()}}  className={currentLang + " btn money-btn green"}>{LANG.Training.UsualState.DemoWallet.btnBetBitcoin}
                            {/*<img src={withdraw} alt="withdraw"/>*/}
                        </button>
                        <Link to="/invite" style={{pointerEvents: predict ? "none" : "auto"}} className={currentLang + " btn money-btn friends"} onClick={playClick}>{LANG.Training.UsualState.DemoWallet.btnPlayWithFriends}
                            {/*<img src={deposit} alt="deposit"/>*/}
                        </Link>

                    </div>}
            </div>
            <div onClick={() => {
                window.open('https://bitrxapp.com/?gb', '_blank')
            }} className={"banner three round-dark"}>
                <button style={{display: banner === "banner one round-dark" ? "none" : "block"}} className="btn learn-more" onClick={playClick}>Learn more</button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        balance: state.balanceReducer.balance,
        lastWinGame: state.balanceReducer.lastWinGame,
        lastgame: state.balanceReducer.lastgame,
        colorBlalance: state.balanceReducer.colorBlalance,
        wins: state.balanceReducer.wins,
        name: state.balanceReducer.name,
        threewins: state.balanceReducer['3wins'],
        isDemo: state.balanceReducer.isDemo,
        predict: state.balanceReducer.predict,
        currentLang: state.switchOptions.lang,
        step: state.switchOptions.step
    }
}
const mapDispatchToProps = {
    // click,
    userdata,
    changeDemo,
    createAd,
    playClick,
    transition
}
export default connect(mapStateToProps, mapDispatchToProps)(RightSector);
