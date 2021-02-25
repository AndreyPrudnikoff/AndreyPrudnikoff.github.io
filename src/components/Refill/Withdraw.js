import React, {useState} from 'react';
import Header from "../Header/Header";
import back from "../../images/back.svg";
import {Link} from "react-router-dom";
import {User} from "../../api/User";
import {playClick} from "../../redux/actions/music";
import {connect} from "react-redux";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Withdraw = ({history, currentLang, playClick}) => {
    const [wallet, setWallet] = useState('');
    const [amount, setAmount] = useState('');
    const [err, setErr] = useState('')
    const LANG = currentLang === "en" ? EN : RU;
    const submitRequest = (e) => {
        e.preventDefault();
        if (wallet && amount) {
            User.withdraw({btcWallet: wallet, value: amount})
                .then(res => {
                    if (res.data.status === "success") {
                        history.push("/complete/withdraw");
                    }
                })
        } else {
            setErr("Something went wrong, try again")
        }
    }
    return (
        <div>
            <Header/>
            <div className="refill">
                <div className="round-dark">
                    <span onClick={() => {history.goBack(); playClick()}} className="back"><img src={back} alt="back"/></span>
                    <form onSubmit={e => submitRequest(e)}>
                        <h2 className="currentLang">{LANG.BettingRealMoney.WithdrawalMethod.title}</h2>
                        <div className={currentLang + " amount"}>{LANG.BettingRealMoney.WithdrawalMethod.BTCWalletTitle}</div>
                        <br/>
                        <div className="refill-input">
                            <div style={{width: "100%"}} className="input-wrap">
                                <input value={wallet} onInput={e => setWallet(e.target.value)} required
                                       placeholder="1FC2Jv4m2cEMi7RRzY34nNFgNkaDSonvcK" type="text"/>
                            </div>
                        </div>
                        <div className={currentLang + " amount mt-4"}>{LANG.BettingRealMoney.WithdrawalMethod.AmountBTCTitle}</div>
                        <br/>
                        <div className="refill-input">
                            <div style={{width: "100%"}} className="input-wrap">
                                <input value={amount} onInput={e => setAmount(e.target.value)} required
                                       placeholder="0.125" step="0.001" type="number"/>
                            </div>
                            <span style={{display: err ? "block" : "none"}} className="red">{err}</span>
                        </div>
                        <div className="refill-btn">
                            <button type="submit" className={currentLang + " pay"} onClick={playClick}><span>{LANG.BettingRealMoney.WithdrawalMethod.btnWithdraw}</span>
                            </button>
                        </div>
                        <div className="d-flex justify-content-center mt-3"><Link to="/support"
                                                                                  className={currentLang + " support-link"} onClick={playClick}>{LANG.support}</Link></div>
                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
