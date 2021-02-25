import React, {useState, useEffect} from 'react';
import './header.scss';
import logo from '../../images/logoLeft.svg';
import burger from '../../images/burger.png';
import refreshIcon from '../../images/refresh.svg';
import sound from '../../images/volume-up-solid.svg';
import noSound from '../../images/volume-mute-solid.svg';
import signup from '../../images/user_plus.svg';
import login from '../../images/sign_in.svg';
import caret from '../../images/lang.svg';
import russian from '../../images/russian.png';
import british from '../../images/british.png';
import bets from '../../images/bets.png';
import wallet from '../../images/wallet.png';
import {connect} from "react-redux";
import {authorization, chooseLang, createAd, logoutQuestion, prohibition, registration, switchView} from "../../redux/actions";
import {Link, useLocation, useHistory} from "react-router-dom";
import {muteToggle} from "../../redux/actions/music";

import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Header = ({auth, reg, mute, muteToggle, logoutQuestion, createAd, logout, registration, prohibition, authorization, unauthorized, predict, refresh, view, switchView, widthMode, currentLang, chooseLang}) => {
    const [menu, setMenu] = useState(false);
    const [showLang, setShowLang] = useState(true);
    const LANG = currentLang === "en" ? EN : RU;
    const switchLang = () => setShowLang(!showLang);
    useEffect(() => {
        authorization();
    }, [])
    const handleMute = () => {
        muteToggle();
    }
    let location = useLocation();
    let history = useHistory();
    let isGame = location.pathname === "/game";
    const chooseLanguages = () => {
        if (currentLang === "en") {
            chooseLang("ru")
        } else {
            chooseLang("en")
        }
        switchLang();
    }
    useEffect(() => {
        if (location.pathname === "/" || location.pathname === "/login") {
            prohibition();

        }
    }, [location.pathname])
    return (
        <div>
            <header className="header">
                <div style={{display: logout ? "block" : "none"}} className="blur">
                    <div className="round-dark win">
                        <h2 className={currentLang}>{LANG.ModalWindows.LogOut.title}</h2>
                        <div className="win-btn">
                            <button onClick={() => {
                                logoutQuestion();
                                sessionStorage.removeItem('token');
                                prohibition();
                                window.location.reload();
                            }} className="btn btn-primary"><Link to="/">{LANG.ModalWindows.LogOut.btnLogOut}</Link>
                            </button>
                            <button onClick={() => {
                                logoutQuestion();
                            }} className={currentLang + " btn btn-primary"}>{LANG.ModalWindows.LogOut.btnContunue}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="wrap-header">
                    <nav className="navbar">
                        <a onClick={() => {
                            sessionStorage.setItem("saveReload", "0");
                            sessionStorage.removeItem('token');
                            window.location.reload();
                        }} className="navbar-brand">
                            <img src={logo} alt="logo" height="23"/>
                        </a>
                    </nav>
                    <div className="header-right">
                        <div className="flag-wrapper">
                            <img onClick={switchLang} className="flag"
                                 src={currentLang === "en" ? british : russian} width="30" alt="lang"/>
                            <img onClick={chooseLanguages} style={{display: showLang ? "none" : "inline"}}
                                 className="flag hide-flag" src={currentLang === "ru" ? british : russian} width="30"
                                 alt="lang"/>
                            <img style={{transform: showLang ? "none" : "rotate(180deg)"}} onClick={switchLang}
                                 className="sound "
                                 src={caret}
                                 height="18" width="18"
                                 alt="lang"/>
                        </div>

                        <img onClick={() => {
                            if (sessionStorage.getItem("token")) {
                                sessionStorage.setItem("saveReload", "1");
                            }
                            window.location.reload();
                        }} style={{marginRight: "30px"}} className="sound reload" height="18" width="18"
                             src={refreshIcon}
                             alt="refresh"/>
                        <img onClick={handleMute} className="sound " src={mute ? sound : noSound} height="18" width="18"
                             alt="sound"/>
                        {!auth ? <div className="startHeader">
                            <Link onClick={() => {
                                if (reg) {
                                    registration();
                                }
                            }} className={currentLang + " login auth-header"}
                                  to="/login">{LANG.Auth.Login.loginIn}</Link>
                            <Link onClick={() => {
                                if (reg) {
                                    registration();
                                }
                            }} className="login auth-header-icon" to="/login">
                                <img width={18} src={login} alt="signin"/>
                            </Link>
                            <Link onClick={registration} className={currentLang + " signup auth-header"}
                                  to="/signup">{LANG.Auth.Login.signUp}</Link>
                            <Link onClick={registration} className="signup auth-header-icon" to="/signup">
                                <img width={18} src={signup} alt="signup"/></Link>
                        </div> : null}
                        <div onClick={(e) => {
                            setMenu(!menu)
                        }}
                             style={{
                                 display: auth && isGame ? 'flex' : 'none',
                                 pointerEvents: predict ? "none" : "auto"
                             }}
                             className="menu">
                            <img className="burger"
                                 src={burger} alt="icon"/>
                            <ul style={{display: menu ? 'block' : 'none'}} className="burger-menu">
                                {/*<li className="burger-menu-item bord"><Link to="/ads">Create ad</Link></li>*/}
                                <li onClick={createAd} className="burger-menu-item bord">{LANG.Menu.first}</li>
                                <li onClick={createAd} className="burger-menu-item bord"><span>{LANG.Menu.second}</span></li>
                                <li onClick={()=>history.push("/intro/1")} className="burger-menu-item bord"><span>{LANG.Menu.third}</span></li>
                                <li className="burger-menu-item" onClick={() => {
                                    logoutQuestion();
                                }}>{LANG.Menu.exit}
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div style={{display: isGame && widthMode !== "desktop" ? "block" : "none"}} className="tabs">
                    <div className="wrap-tabs">
                        <div onClick={() => switchView(false)} className={view ? "tab bets" : "tab bets active"}>
                            <img src={bets} alt="tab"/>
                        </div>
                        <div onClick={() => switchView(true)} className={!view ? "tab wallet" : "tab wallet active"}>
                            <img src={wallet} alt="tab"/>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        reg: state.authReducer.reg,
        mute: state.soundReducer.mute,
        logout: state.authReducer.logoutQuestion,
        unauthorized: state.authReducer.unauthorized,
        predict: state.balanceReducer.predict,
        widthMode: state.switchOptions.widthMode,
        view: state.switchOptions.view,
        currentLang: state.switchOptions.lang
    }
}
const mapDispatchToProps = {
    muteToggle,
    logoutQuestion,
    createAd,
    registration,
    prohibition,
    authorization,
    switchView,
    chooseLang
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
