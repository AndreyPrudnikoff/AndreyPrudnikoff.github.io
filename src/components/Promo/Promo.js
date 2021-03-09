import React, {useState, useEffect} from 'react';
import Wallet from "../Ads/components/Wallet";
import back from "../../images/back.svg";
import {playClick} from "../../redux/actions/music";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";
import {User} from "../../api/User";
import './Promo.scss';
import {getPromoList} from "../../redux/actions/advertising";

const Promo = ({history, playClick, currentLang, getPromoList, promoList}) => {
    const LANG = currentLang === "en" ? EN : RU;
    const reducer = (accumulator, currentValue) => accumulator.earning + currentValue.earning;
    const data = [
        {
            "name": "Vadym Netrebko",
            "totalTime": "10:20:13",
            "deposited": 0.02,
            "wathdrawed": 0,
            "bets": 0.02,
            "earning": 0.00059999999999999995
        },
        {
            "name": "Vasya Pupkin",
            "totalTime": "10:20:13",
            "deposited": 0.02,
            "wathdrawed": 0,
            "bets": 0.02,
            "earning": 0.00059999999999999995
        }
    ]
    console.log()
    useEffect(()=> {
        User.promoList().then(res=>{
            getPromoList(res.data.data);
            // getPromoList(data);
        }).catch(e => console.log(e.data));
    }, [])
    return (
        <div className="wrap-promo">
            <div className="row main promo">
                <div className="left-sector">
                             <span onClick={() => {
                                 history.push('/game');
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
                            {promoList.map((item, index) => (
                                <tr key={index * 1.1}>
                                    <td>{item.name}</td>
                                    <td>{item.totalTime}</td>
                                    <td>{item.deposited} $</td>
                                    <td>{item.wathdrawed} $</td>
                                    <td>{item.bets} $</td>
                                    <td>{item.earning} $</td>
                                </tr>
                            ))}

                            <tr className="hr">
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td style={{opacity: ".5"}}>Total bonus</td>
                                <td>{promoList.reduce((a, b) => a + b.earning, 0)} $</td>
                            </tr>
                            </tbody>
                        </table>
                        <Link to='/support' className={currentLang + " support-link"}
                              onClick={playClick}>{LANG.support}</Link>
                    </div>

                </div>
                <div className="right-sector"><Wallet input={true}/></div>
            </div>

        </div>
    );
};
const mapStateToProps = state => {
    return {
        currentLang: state.switchOptions.lang,
        promoList: state.adsOptions.promoList
    }
}
const mapDispatchToProps = {
    playClick,
    getPromoList
}
export default connect(mapStateToProps, mapDispatchToProps)(Promo);
