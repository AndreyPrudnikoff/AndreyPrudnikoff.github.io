import React from 'react';
import bitcoin from "../../images/bitcoin.svg";
import {connect} from "react-redux";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Offer = (currentLang) => {
    const LANG = currentLang === "en" ? EN : RU;
    return (
        <div style={{display: winnings ? "block" : "none"}} className="blur">
            <div className="round-dark win">
                <h2 className="currentPage">{LANG.Training.ThreeWinning.title}</h2>
                <div className={currentLang + " text-center"}>{LANG.Training.ThreeWinning.content} <br/> {LANG.Training.ThreeWinning.yourWinnings} {sumWIns} <img src={bitcoin} width="15" alt="bit"/></div>
                <div className="win-btn">
                    <button onClick={() => {
                    }} className={currentLang + " btn btn-primary"}>{LANG.Training.ThreeWinning.btnInvest}
                    </button>
                    <button disabled onClick={() => {
                        document.getElementById('fireworks').pause();
                    }} className={currentLang + " btn btn-primary"}>{LANG.Training.ThreeWinning.btnTrain}
                    </button>
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

export default connect(mapStateToProps, null)(Offer);
