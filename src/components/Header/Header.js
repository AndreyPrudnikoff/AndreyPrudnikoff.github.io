import React, {useState, useEffect} from 'react';
import './header.scss';
import logo from '../../images/logoLeft.svg';
// import logo2 from '../../images/logoCentre.svg';
import burger from '../../images/burger.png';
import refreshIcon from '../../images/refresh.svg';
import sound from '../../images/volume-up-solid.svg';
import noSound from '../../images/volume-mute-solid.svg';
import signup from '../../images/user_plus.svg';
import login from '../../images/sign_in.svg';
import bets from '../../images/bets.png';
import wallet from '../../images/wallet.png';
import {connect} from "react-redux";
import {authorization, createAd, logoutQuestion, prohibition, registration, switchView} from "../../redux/actions";
import {Link, useLocation} from "react-router-dom";
import {muteToggle} from "../../redux/actions/music";

import {LANG} from "../../languges/en";

const Header = ({
                    auth,
                    reg,
                    mute,
                    muteToggle,
                    logoutQuestion,
                    createAd,
                    logout,
                    registration,
                    prohibition,
                    authorization,
                    history,
                    unauthorized,
                    predict,
                    refresh,
                    view,
                    switchView,
                    widthMode
                }) => {
    const [menu, setMenu] = useState(false);
    useEffect(() => {
        authorization();
    }, [])
    const handleMute = () => {
        muteToggle();
    }
    let location = useLocation();
    let isGame = location.pathname === "/game";
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
                        <h2>Are you sure?</h2>
                        <div className="win-btn">
                            <button onClick={() => {
                                logoutQuestion();
                                sessionStorage.removeItem('token');
                                prohibition();
                                window.location.reload();
                            }} className="btn btn-primary"><Link to="/">LOG OUT</Link>
                            </button>
                            <button onClick={() => {
                                logoutQuestion();
                            }} className="btn btn-primary">STAY
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
                            }} className="login auth-header" to="/login">LOG IN</Link>
                            <Link onClick={() => {
                                if (reg) {
                                    registration();
                                }
                            }} className="login auth-header-icon" to="/login">
                                <img width={18} src={login} alt="signin"/>
                            </Link>
                            <Link onClick={registration} className="signup auth-header" to="/signup">{LANG.SIGN_UP}</Link>
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
                                <li onClick={createAd} className="burger-menu-item bord">Create ad</li>
                                <li onClick={createAd} className="burger-menu-item bord"><span>My ads</span></li>
                                <li className="burger-menu-item" onClick={() => {
                                    logoutQuestion();
                                }}>Log out
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
        view: state.switchOptions.view
    }
}
const mapDispatchToProps = {
    muteToggle,
    logoutQuestion,
    createAd,
    registration,
    prohibition,
    authorization,
    switchView
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
