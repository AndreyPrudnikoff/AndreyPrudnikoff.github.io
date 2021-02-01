import React, {useEffect, useState} from 'react';
import arrup from "../../images/arrup.png";
import person from "../../images/person.svg";
import bitcoin from "../../images/bitcoin.svg";
import arrdown from "../../images/arrdown.png";
import {rates} from "../../redux/actions/game";
import {connect} from "react-redux";

const Rates = ({rates, down, up, downBets, upBets}) => {
    const bankCoin = new Array(up + down).fill('bank');
    const upCoin = new Array(up).fill('up');
    const downCoin = new Array(down).fill('down');
    const fillBank = bankCoin.map((coin, index) => {
        if(index > 9) {return null;}
       return (<div key={index + coin} style={{height: "34px", width: "100%", bottom: index * 7 + "px"}} className="coin"/>);
    })
    const fillDown = downCoin.map((coin, index) => {
        if(index > 9) {return null;}
        return (<div key={index + coin} style={{height: "34px", width: "100%", bottom: index * 7 + "px"}} className="coin"/>)
    })
    const fillUp = upCoin.map((coin, index) => {
        if(index > 9) {return null}
        return (<div key={index + coin} style={{height: "34px", width: "100%", bottom: index * 7 + "px"}} className="coin"/>)
    })
    useEffect(() => {
        const getRates = setInterval(() => {
            rates();
        }, 1000);
        return () => clearInterval(getRates);
    }, [])
    const bank = downBets + upBets;
    const rateUp = 10 * ((up / down) ? (up / down) : 1);
    const rateDown = 10 * ((down / up) ? (down / up) : 1);
    return (
        <div className="round rates">
            <h2 className="text-center">Bets in progress</h2>
            <div className="wrap-table">
                <div className="rates-col rates-up">
                    <img className="arrow" src={arrup} alt="arrow"/>
                    {fillUp.length ? fillUp : <div style={{height: "34px", width: "100%", bottom: 0 + "px"}} className="coin"/>}
                    {/*<div style={{height: `${rateUp <= 70 ? rateUp : 70}%`}} className="green-bg backgroundRate"/>*/}
                    <div className="text">
                        <span className="mb-1 persons">{up}<img className="mb-1" src={person} alt=""/></span>
                        {/*<span className='pr-2'>0.125<img className="mb-1" width="15" height="20" src={bitcoin} alt=""/></span>*/}
                    </div>
                </div>
                <div onClick={rates} className="rates-col bank">
                    <img className="arrow middle" src={bitcoin} alt="arrow"/>
                    {/*<div style={{height: '60%'}} className="gold-bg backgroundRate"/>*/}
                    {fillBank.length ? fillBank : <div style={{height: "34px", width: "100%", bottom: 0 + "px"}} className="coin"/>}
                    <div className="text">
                        <span className="mb-1 nowrap persons">{Math.trunc(bank * 1000 / 1000) || '0.000'}<img className="bank-img" width="15"
                                                                                    height="20"
                                                                                    src={bitcoin} alt=""/></span>
                    </div>
                </div>
                <div className="rates-col rates-down">
                    <img className="arrow" src={arrdown} alt="arrow"/>
                    {fillDown.length ? fillDown : <div style={{height: "34px", width: "100%", bottom: 0 + "px"}} className="coin"/>}
                    {/*<div style={{height: `${rateDown <= 70 ? rateDown : 70}%`}} className="red-bg backgroundRate"/>*/}
                    <div className="text">
                        <span className="mb-1 persons">{down}<img className="mb-1" src={person} alt=""/></span>
                        {/*<span className='pr-2'>0.185<img className="mb-1" width="15" height="20" src={bitcoin} alt=""/></span>*/}
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
        upBets: state.balanceReducer.upBets
    }
}
const mapDispatchToProps = {
    rates
}
export default connect(mapStateToProps, mapDispatchToProps)(Rates);
