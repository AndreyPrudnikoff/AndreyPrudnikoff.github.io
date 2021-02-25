import React from 'react';
import ad from '../../images/intro/Ad_banner.png';
import bets from '../../images/intro/Bets_in_progress.png';
import graph from '../../images/intro/Graph.png';
import make_bet from '../../images/intro/Make_your_bet.png';
import score from '../../images/intro/Score_demo.png';
import modal from '../../images/intro/modal1.svg';
import {useHistory} from "react-router-dom";

const Step1 = (props) => {
    const history = useHistory();
    return (
        <div className="step">
            <div className="modal1">
                <div className="text-intro">
                    <div className="wrap-text">
                        <h3 className="text-center">Graph</h3>
                        <p>Here you can see Bitcoin price changes. This will help you to make your bet.</p>
                    </div>
                    <div className="wrap-buttons">
                        <button onClick={()=>history.push("/game")} className="skip btn btn-link">SKIP INTRO</button>
                        <button onClick={()=>history.push("/intro/2")} className="next">NEXT</button>
                    </div>
                </div>
                <img src={modal} alt=""/>
            </div>
            <div className="left">
                <img className="graph light" src={graph} alt=""/>
                <div className="left-bottom">
                    <div className="rates">
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

export default Step1;
