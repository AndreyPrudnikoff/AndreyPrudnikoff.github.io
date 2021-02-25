import React from 'react';
import ad from '../../images/intro/Ad_banner.png';
import bets from '../../images/intro/Bets_in_progress.png';
import graph from '../../images/intro/Graph.png';
import make_bet from '../../images/intro/Make_your_bet.png';
import score from '../../images/intro/Score_demo.png';
import human from '../../images/intro/human.png';
import dash from '../../images/intro/dash2.png';
import arrow_left from '../../images/intro/arrow_left.png';
import {useHistory} from "react-router-dom";

const Step2 = (props) => {
    const history = useHistory();
    return (
        <div className="step">
            <div className="modal2">
                <img className="dash" src={dash} alt=""/>
                <img className="arrow_left" src={arrow_left} alt=""/>
                <div className="text-intro">
                    <div className="wrap-text">
                        <h3 className="text-center">Bank</h3>
                        <p className="text-center">Here you can see how many players bet and how much is total bets amount.</p>
                    </div>
                    <div className="wrap-buttons justify-content-center">
                        <button onClick={()=>history.goBack()} className="next">PREV</button>
                        <button onClick={()=>history.push("/game")} className="skip btn btn-link">SKIP INTRO</button>
                        <button onClick={()=>history.push("/intro/3")} className="next">NEXT</button>
                    </div>
                </div>
                <div className="human"><img src={human} alt=""/></div>
            </div>
            <div className="left">
                <img className="graph" src={graph} alt=""/>
                <div className="left-bottom">
                    <div className="rates light">
                        <img src={bets} alt=""/>
                    </div>
                    <div className="bets">
                        <img src={make_bet} alt=""/>
                    </div>
                </div>
            </div>
            <div className="right">
                <img src={score} alt=""/>
                <img src={ad} alt=""/>
            </div>
        </div>
    );
};

export default Step2;
