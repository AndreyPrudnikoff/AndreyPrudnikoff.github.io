import React from 'react';
import Wallet from "../Ads/components/Wallet";
import back from "../../images/back.svg";
import {playClick} from "../../redux/actions/music";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Promo = ({history, playClick, currentLang}) => {
    const LANG = currentLang === "en" ? EN : RU
    return (
        <div className="wrap-promo">
            <div className="row main promo">

                <div className="left-sector">
                             <span onClick={() => {
                                 history.goBack();
                                 playClick()
                             }} className="back"><img src={back} alt="back"/></span>
                    <div className="round-dark">
                        <h2>Promo</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Player</th>
                                <th>Total time</th>
                                <th>Deposited</th>
                                <th>Withdrawed</th>
                                <th>Total bets</th>
                                <th>Your bonus</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Simon White</td>
                                <td>10 h 20 m</td>
                                <td>5 000 $</td>
                                <td>2 000 $</td>
                                <td>7 000 $</td>
                                <td>35 $</td>
                            </tr>
                            <tr>
                                <td>Michael Smith</td>
                                <td>10 h 20 m</td>
                                <td>5 000 $</td>
                                <td>2 000 $</td>
                                <td>7 000 $</td>
                                <td>35 $</td>
                            </tr>
                            <tr>
                                <td>James Briggs</td>
                                <td>10 h 20 m</td>
                                <td>5 000 $</td>
                                <td>2 000 $</td>
                                <td>7 000 $</td>
                                <td>35 $</td>
                            </tr>
                            <tr className="hr">
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td style={{opacity: ".5"}}>Total bonus</td>
                                <td>105 $</td>
                            </tr>
                            </tbody>
                        </table>
                        <Link to='/support' className={currentLang + " support-link"}
                              onClick={playClick}>{LANG.support}</Link>
                    </div>

                </div>
                <div className="right-sector"><Wallet/></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Promo);
