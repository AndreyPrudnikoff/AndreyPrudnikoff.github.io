import React from 'react';
import './refill.scss';
import {Link} from "react-router-dom";
import Header from "../Header/Header";
import {playClick} from "../../redux/actions/music";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";
import {connect} from "react-redux";

const CompletePay = ({currentLang, playClick}) => {
    const LANG = currentLang === "en" ? EN : RU;
    return (
        <div>
            <Header/>
            <div className="refill">
                <div style={{height: "250px"}} className="round-dark">
                    <h2 className={currentLang + " pay-header"}>{LANG.BettingRealMoney.CompletionNotification.title}</h2>
                    <div className="refill-btn">
                        <Link to="/game" className={currentLang + " pay"} onClick={playClick}><span>{LANG.BettingRealMoney.CompletionNotification.btnStartBetting}</span></Link>
                    </div>
                    <div className={currentLang + " d-flex justify-content-center mt-3"}><Link to="/support" className="support-link" onClick={playClick}>{LANG.support}</Link></div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        currentLang: state.switchOptions.lang
    }
}

const mapDispatchToProps = {
    playClick
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletePay);
