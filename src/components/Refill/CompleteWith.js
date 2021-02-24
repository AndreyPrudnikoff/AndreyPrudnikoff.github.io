import React from 'react';
import './refill.scss';
import {Link} from "react-router-dom";
import Header from "../Header/Header";
import {connect} from 'react-redux';
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";


const CompletePay = ({currentLang}) => {

    const LANG = currentLang === "en" ? EN : RU;
    return (
        <div>
            <Header/>
            <div className="refill">
                <div style={{height: "250px"}} className="round-dark">

                    <h2 className={currentLang + " pay-header"}>{LANG.BettingRealMoney.CompletionNotification.title}</h2>
                    <div className={currentLang + " text-center"}>{LANG.BettingRealMoney.CompletionNotification.content}</div>
                    <div className="refill-btn">
                        <Link to="/game" className={currentLang + " pay mt-4"}><span>{LANG.BettingRealMoney.CompletionNotification.btnStartBetting}</span></Link>
                    </div>
                    <div className="d-flex justify-content-center mt-3"><Link to="/support" className={currentLang + " support-link"}>{LANG.support}</Link></div>
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

export default connect(mapStateToProps, null)(CompletePay);
