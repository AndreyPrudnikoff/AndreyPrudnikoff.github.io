import React, {useEffect, useState} from 'react';
// import arrup from "../../images/arrup.png";
import person from "../../images/person.svg";
import bitcoin from "../../images/bitcoin.svg";
// import arrdown from "../../images/arrdown.png";
import {rates} from "../../redux/actions/game";
import {connect} from "react-redux";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Rates = ({rates, down, up, downBets, upBets, widthMode}, currentLang) => {
    const mobile = widthMode === "mobile";
    const LANG = currentLang === "en" ? EN : RU
    const bankCoin = new Array(Math.ceil(downBets+upBets)).fill(downBets+upBets);
    const upCoin = new Array(up).fill('up');
    const downCoin = new Array(down).fill('down');
    const fillBank = bankCoin.map((coin, index) => {
        if(index > 9 && !mobile) {return null;}
        if(index > 1 && mobile) {return null;}
       return (<div key={index + coin} style={{height: "36px", width: "100%", bottom: index * 7 + "px"}} className="coin"/>);
    })
    const fillDown = downCoin.map((coin, index) => {
        if(index > 9 && !mobile) {return null;}
        if(index > 1 && mobile) {return null;}
        return (<div key={index + coin} style={{height: "36px", width: "100%", bottom: index * 7 + "px"}} className="coin"/>)
    })
    const fillUp = upCoin.map((coin, index) => {
        if(index > 9 && !mobile) {return null}
        if(index > 1 && mobile) {return null}
        return (<div key={index + coin} style={{height: "36px", width: "100%", bottom: index * 7 + "px"}} className="coin"/>)
    })
    useEffect(() => {
        const getRates = setInterval(() => {
            rates();
        }, 1000);
        return () => clearInterval(getRates);
    }, [])
    const bank = downBets + upBets;
    // const rateUp = 10 * ((up / down) ? (up / down) : 1);
    // const rateDown = 10 * ((down / up) ? (down / up) : 1);
    return (
        <div className="round rates">
            <h2 className={currentLang + " text-center"}>{LANG.BettingRealMoney.UsualState.BetsInProgress.title}</h2>
            <div className="wrap-table">
                <div className="rates-col rates-up">
                    {/*<img className="arrow" src={arrup} alt="arrow"/>*/}
                    {fillUp.length ? fillUp : null}
                    <div className="text">
                        <span className="mb-1 persons">{up}<img className="mb-1" src={person} alt=""/></span>
                    </div>
                </div>
                <div onClick={rates} className="rates-col bank">
                    {/*<img className="arrow middle" src={bitcoin} alt="arrow"/>*/}
                    {bankCoin[0] > 0 ? fillBank : null}
                    <div className="text">
                        <span className="mb-1 nowrap persons">{bank.toFixed(3)}<img className="bank-img" width="15"
                                                                                    height="20"
                                                                                    src={bitcoin} alt=""/></span>
                    </div>
                </div>
                <div className="rates-col rates-down">
                    {/*<img className="arrow" src={arrdown} alt="arrow"/>*/}
                    {fillDown.length ? fillDown : null}
                    <div className="text">
                        <span className="mb-1 persons">{down}<img className="mb-1" src={person} alt=""/></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        down: state.balanceReducer.down,
        up: state.balanceReducer.up,
        downBets: state.balanceReducer.downBets,
        upBets: state.balanceReducer.upBets,
        widthMode: state.switchOptions.widthMode,
        currentLang: state.switchOptions.lang
    }
}
const mapDispatchToProps = {
    rates
}
export default connect(mapStateToProps, mapDispatchToProps)(Rates);
