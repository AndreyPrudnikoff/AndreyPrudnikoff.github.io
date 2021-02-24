import React, {useState} from 'react';
import back from "../../images/back.svg";
import visa from "../../images/visa.svg";
import mastercard from "../../images/mastercard.svg";
import dollar from "../../images/dollar.svg";
import Header from "../Header/Header";
import {connect} from "react-redux";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Usd = (props, currentLang) => {
    const [done, setDone] = useState(false);
    const LANG = currentLang === "en" ? EN : RU;
    if (!done) {
        return (
            <div>
                <Header/>
                <div className="refill false">
                    <div className="round-dark main-usd">
                        <span onClick={() => props.history.goBack()} className="back"><img src={back} alt="back"/></span>
                        <h2 className="currentLang">{LANG.FulfillingRealMoney.USD.title}</h2>
                        <p className="currentLang">{LANG.FulfillingRealMoney.USD.content}</p>
                        <div className="wrap-img"><img src={visa} alt="visa"/><img src={mastercard} alt="master"/></div>
                        <div className={currentLang + " amount label-payment"}>{LANG.FulfillingRealMoney.USD.cardNumber}</div>
                        <div className="refill-input mb-3">
                            <div className="input-wrap">
                                <input className="card-number" placeholder="_ _ _ _ – _ _ _ _ – _ _ _ _ – _ _ _ _"
                                       type="text"/>
                            </div>
                        </div>
                        <div className="amount"><span className="currentLang">{LANG.FulfillingRealMoney.USD.expiring}</span><span className={currentLang + " left"}>{LANG.FulfillingRealMoney.USD.CVC}</span></div>
                        <br/>

                        <div className="refill-input">
                            <div className="input-wrap">
                                <input placeholder="_ _ /_ _" type="text"/>
                            </div>
                            <div className="input-wrap">
                                <input placeholder="_ _ _" type="text"/>
                            </div>
                        </div>
                        <div className="refill-input mt-3 mb-3">
                            <div className="input-wrap">
                                <span className={currentLang + " nowrap"}>{LANG.FulfillingRealMoney.USD.holdersNameTitle}</span>
                                <input className={currentLang + " card-number"} placeholder={LANG.FulfillingRealMoney.USD.holdersName}
                                       type="text"/>
                            </div>
                        </div>
                        <div className="refill-btn">
                            <button onClick={() => setDone(true)} className={currentLang + " pay"}>{LANG.FulfillingRealMoney.USD.deposit}<img src={dollar} width="15"
                                                                                          alt="bit"/></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Header/>
                <div className="refill done">
                    <div className="round-dark main-usd">
                        <h2 className="currentLang">{LANG.FulfillingRealMoney.CompletionNotification.title}</h2>
                        <p className="currentLang">{LANG.FulfillingRealMoney.CompletionNotification.content}</p>
                        <div className="refill-btn">
                            <button onClick={() => props.history.push('/')} className={currentLang + " pay"}>{LANG.FulfillingRealMoney.CompletionNotification.btnGoToBets}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        currentLang: state.switchOptions.lang
    }
}

export default connect(mapStateToProps, null)(Usd);
