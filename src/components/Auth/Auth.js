import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import './auth.scss';
import {authorization, betWin, registration} from "../../redux/actions";
import {User} from "../../api/User";
import {fireworks, muteToggle, playClick} from "../../redux/actions/music";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Auth = ({reg, authorization, registration, muteToggle, mute, betWin, fireworks, history, widthMode, currentLang, playClick}) => {
    const [password, setPassword] = useState(true)
    const [passwordConfirm, setPasswordConfirm] = useState(true)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confpass, setConfpass] = useState('')
    const [code, setCode] = useState('')
    const [enterCode, setEnterCode] = useState(false)
    const [err, setErr] = useState('')

    const LANG = currentLang === "en" ? EN : RU

    const phoneRef = useRef(null);
    const moveCaretToEnd = () => {
        if (phoneRef.createTextRange) {
            const r = phoneRef.createTextRange();
            r.collapse(false);
            r.select();
        }
    }
    const clearData = () => {
        setName('');
        setPhone('');
        setEmail('');
        setPass('');
        setConfpass('');
        setErr('');
        setCode('');
        setEnterCode(false);
    }
    const setPhoneNumber = (value) => {
        setPhone(value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const body = JSON.stringify({name, phone, email, pass, confpass});
        if (confpass.length < 8 || confpass.length < 8) {
            setErr('Password length must be 8 characters')
        } else {
            User.register(body)
                .then(data => {
                    if (data.data.status === "success") {
                        setEnterCode(true);
                    } else {
                        if (data.data.error) {
                            setErr(data.data.error);
                        } else return false;
                    }
                })
                .catch(error => setErr(error.response.data.error))
        }
    }
    const codeSubmit = (e) => {
        e.preventDefault();
        User.code({code: code})
            .then(res => {
                if (res.data.status === "success") {
                    if (widthMode === "desktop") {
                        sessionStorage.setItem('token', res.data.data.accessToken);
                        authorization();
                        history.push('/game');
                        if (!mute) {
                            muteToggle();
                        }
                        betWin();
                        fireworks();
                    } else {
                        history.push("/gotodesktop")
                    }
                } else {
                    if (res.data.error) {
                        setErr(res.data.error);
                    } else return false;
                }
            })
            .catch(error => setErr(error.response.data.error))
    }

    const handleLogin = event => {
        event.preventDefault();
        const body = JSON.stringify({phone, pass});

        User.login(body)
            .then(res => res)
            .then(data => {
                    // if (widthMode === "desktop") {
                        if (data.data.status === "success") {
                            sessionStorage.setItem('token', data.data.data.accessToken);
                            history.push('/game');
                            return authorization();
                        } else if (data.data.error) {
                            return setErr(data.data.error);
                        } else {
                            return setErr('error, try again later')
                        }
                    // } else {
                    //     history.push("/gotodesktop")
                    // }
                }
            )
            .catch(error => setErr(error.response.data.error));
        // authorization();
    }
    if (reg) {

        if (enterCode) {
            return (
                <div className="round-dark auth">
                         <span onClick={() => {
                             setEnterCode(false);
                             clearData();
                             playClick()
                         }} className="back">&larr;</span>
                    <h2>Enter code</h2>
                    <form onSubmit={e => codeSubmit(e)}>
                        <div className="">
                            <input value={code} onInput={e => setCode(e.target.value)} id="code" name="code" type="text"
                                   required/>
                        </div>
                        <span style={{display: err ? 'block' : 'none'}} className="error red">{err}</span>
                        <button type="submit" onClick={playClick}>SEND</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="round-dark auth">
                <span onClick={() => {
                    registration();
                    clearData();
                    playClick()
                }} className="back">&larr;</span>
                    <h2 className={currentLang}>{LANG.Auth.Register.title}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label className={currentLang} htmlFor="name">{LANG.Auth.Register.nameTitle}</label>
                            <input onChange={e => {
                                setName(e.target.value);
                                setErr('');
                            }}
                                   value={name}
                                   placeholder={LANG.Auth.Register.name}
                                   id="name" name="name" type="text" required/>
                        </div>
                        <div className="">
                            <label className={currentLang} htmlFor="phone">{LANG.Auth.Register.phoneTitle}</label>
                            <PhoneInput onChange={e => {
                                setErr('');
                                setPhoneNumber(e);
                                moveCaretToEnd();
                            }} id="phone" ref={phoneRef} limitMaxLength={true} placeholder={LANG.Auth.Register.phone}
                                        value={phone} international
                                        displayInitialValueAsLocalNumber required/>
                        </div>
                        <div className="">
                            <label className={currentLang} htmlFor="email">{LANG.Auth.Register.emailTitle}</label>
                            <input onChange={e => {
                                setEmail(e.target.value);
                                setErr('');
                            }}
                                   value={email}
                                   placeholder={LANG.Auth.Register.email}
                                   id="email" name="email" type="email" required/>
                        </div>
                        <div className={password ? 'pass' : 'text'}>
                            <span onClick={() => {setPassword(!password); playClick()}} className="eye"/>
                            <label className={currentLang} htmlFor="password">{LANG.Auth.Register.password}</label>
                            <input min='8' onChange={e => {
                                setPass(e.target.value);
                                setErr('');
                            }}
                                   value={pass}
                                   id="password" name="password" type={password ? 'password' : 'text'} required/>
                        </div>
                        <div className={passwordConfirm ? 'pass' : 'text'}>
                            <span onClick={() => {setPasswordConfirm(!passwordConfirm); playClick()}} className="eye"/>
                            <label className={currentLang} htmlFor="passwordConfirm">{LANG.Auth.Register.passwordRepeat}</label>
                            <input min='8' onChange={e => {
                                setConfpass(e.target.value);
                                setErr('');
                            }}
                                   value={confpass}
                                   id="passwordConfirm" name="passwordConfirm"
                                   type={passwordConfirm ? 'password' : 'text'}
                                   required/>
                        </div>
                        <span style={{display: err ? 'block' : 'none'}} className="error red">{err}</span>
                        <button className={currentLang} onClick={playClick}>{LANG.Auth.Register.signUp}</button>
                        <Link to='/support' className={currentLang + " support-link"} onClick={playClick}>{LANG.support}</Link>
                    </form>

                </div>
            );
        }
    } else {
        return (
            <div className="round-dark auth">
               <span onClick={() => {
                   clearData();
                   playClick()
               }} className="back"><Link to="/">&larr;</Link></span>
                <h2 className={currentLang}>{LANG.Auth.Login.title}</h2>
                <form onSubmit={handleLogin}>
                    <div className="">
                        <label className={currentLang} htmlFor="phone">{LANG.Auth.Login.phoneTitle}</label>
                        <PhoneInput onChange={e => {
                            setPhone(e);
                            setErr('');
                        }} id="phone" limitMaxLength={true} placeholder={LANG.Auth.Login.phone} value={phone} international
                                    displayInitialValueAsLocalNumber required/>
                    </div>
                    <div className={password ? 'pass' : 'text'}>
                        <span onClick={() => {setPassword(!password); playClick()}} className="eye"/>
                        <label className={currentLang} htmlFor="password">{LANG.Auth.Login.password}</label>
                        <input onInput={e => {
                            setPass(e.target.value);
                            setErr('');
                        }} id="password" name="password"
                               type={password ? 'password' : 'text'} required/>
                    </div>
                    <span style={{display: err ? 'block' : 'none'}} className="error red">{err}</span>
                    <Link to="/restore" className={currentLang + " forgot mb-3"} onClick={playClick}>{LANG.Auth.Login.forgotPassword}</Link>
                    <button className={currentLang} onClick={playClick}>{LANG.Auth.Login.loginIn}</button>
                    <span className={currentLang}>{LANG.Auth.Login.or}</span>
                    <button className={currentLang} onClick={e => {
                        e.preventDefault();
                        registration();
                        clearData();
                        playClick();
                    }}>{LANG.Auth.Login.signUp}
                    </button>
                    <Link to="/support" className={currentLang + " support-link"} onClick={playClick}>{LANG.support}</Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reg: state.authReducer.reg,
        mute: state.soundReducer.mute,
        widthMode: state.switchOptions.widthMode,
        currentLang: state.switchOptions.lang
    }
}
const mapDispatchToProps = {
    authorization,
    registration,
    muteToggle,
    betWin,
    fireworks,
    playClick
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
