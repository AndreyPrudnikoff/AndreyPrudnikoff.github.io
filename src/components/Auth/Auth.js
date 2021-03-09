import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import './auth.scss';
import {authorization, betWin, registration, switchStep} from "../../redux/actions";
import {User} from "../../api/User";
import {fireworks, muteToggle, playClick} from "../../redux/actions/music";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Auth = ({reg, authorization, registration, muteToggle, mute, betWin, fireworks, history, widthMode, currentLang, playClick, switchStep}) => {
    const [password, setPassword] = useState(true)
    const [passwordConfirm, setPasswordConfirm] = useState(true)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confpass, setConfpass] = useState('')
    const [promocode, setPromocode] = useState('')
    const [code, setCode] = useState('')
    const [enterCode, setEnterCode] = useState(false)
    const [err, setErr] = useState('')
    const [privacy, setPrivacy] = useState(false)
    const [country, setCountry] = useState("US")

    const LANG = currentLang === "en" ? EN : RU

    const phoneRef = useRef(null);

    useEffect(() => {
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => {
                setCountry(response.countryCode);
            })
            .catch((data, status) => {
                console.log('Request failed:', data);
            });
    }, [])
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

    const checkForLatin = event => {
        let val = event.replace(/[^\x00-\x7F]/ig, '');
        setName(val);
    }

    const handleSubmit = event => {
        event.preventDefault();
        const body = JSON.stringify({name, phone, email, pass, confpass, promocode});
        if (confpass.length < 8 || confpass.length < 8) {
            setErr('Password length must be 8 characters')
        } else {
            User.register(body)
                .then(data => {
                    if (data.data.status === "success") {
                        setEnterCode(true);
                    } else {
                        if (data.data.error) {
                            setErr(data.data.data);
                        } else return false;
                    }
                })
                .catch(error => setErr(error.response.data.data))
        }
    }
    const codeSubmit = (e) => {
        e.preventDefault();
        User.code({code: code})
            .then(res => {
                if (res.data.status === "success") {
                    sessionStorage.setItem('token', res.data.data.accessToken);
                    authorization();
                    if(res.data.newUser) {
                        switchStep(1);
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
                    if (data.data.status === "success") {
                        sessionStorage.setItem('token', data.data.data.accessToken);
                        history.push('/game');
                        if (!mute) {
                            muteToggle()
                        }
                        return authorization();
                    } else if (data.data.error) {
                        return setErr(data.data.error);
                    } else {
                        return setErr('error, try again later')
                    }
                }
            )
            .catch(error => setErr(error.response.data.error));

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
                privacy
                    ? <div style={{display: privacy ? "block" : "none"}} className="round-dark auth privacy-block">
                        <span onClick={() => {
                            playClick();
                            setPrivacy(false);
                        }} className="back">
                        &larr;
                        </span>
                        <p>
                            <h2>{LANG.Auth.Register.privacy}</h2>
                            {LANG.Auth.Register.text}
                        </p>
                    </div>
                    : <div className="round-dark auth">

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
                                    checkForLatin(e.target.value);
                                    // setName(e.target.value);
                                    setErr('');
                                }} value={name}
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
                                            defaultCountry={country}
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
                            <span onClick={() => {
                                setPassword(!password);
                                playClick()
                            }} className="eye"/>
                                <label className={currentLang} htmlFor="password">{LANG.Auth.Register.password}</label>
                                <input min='8' onChange={e => {
                                    setPass(e.target.value);
                                    setErr('');
                                }}
                                       value={pass}
                                       id="password" name="password" type={password ? 'password' : 'text'} required/>
                            </div>
                            <div className={passwordConfirm ? 'pass' : 'text'}>
                            <span onClick={() => {
                                setPasswordConfirm(!passwordConfirm);
                                playClick()
                            }} className="eye"/>
                                <label className={currentLang}
                                       htmlFor="passwordConfirm">{LANG.Auth.Register.passwordRepeat}</label>
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

                            <div className='text'>
                                <label className={currentLang}
                                       htmlFor="promo">{LANG.Auth.Register.promo}</label>

                                <input onChange={(e) => {
                                    setPromocode(e.target.value);
                                    setErr('');
                                }} value={promocode} id="promo" name="promo" type="text"/>
                            </div>

                            <div className="privacy">
                                <label>
                                    <input type="checkbox" id="privacy" required/>
                                    <span>{LANG.Auth.Register.begin}</span>


                                </label>
                                <label className="privacy-row">
                                    <input type="checkbox" id="privacy" required/>
                                    <span onClick={() => setPrivacy(true)}
                                          className="gold link">{LANG.Auth.Register.legal}  <span className="and">{LANG.Auth.Register.and} </span>
                                           {LANG.Auth.Register.privacy}</span>
                                </label>
                            </div>

                            <button className={currentLang} onClick={playClick}>{LANG.Auth.Register.signUp}</button>


                            <Link to='/support' className={currentLang + " support-link"}
                                  onClick={playClick}>{LANG.support}</Link>
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
                        }} id="phone" limitMaxLength={true} placeholder={LANG.Auth.Login.phone} value={phone}
                                    international
                                    defaultCountry={country}
                                    displayInitialValueAsLocalNumber required/>
                    </div>
                    <div className={password ? 'pass' : 'text'}>
                        <span onClick={() => {
                            setPassword(!password);
                            playClick()
                        }} className="eye"/>
                        <label className={currentLang} htmlFor="password">{LANG.Auth.Login.password}</label>
                        <input onInput={e => {
                            setPass(e.target.value);
                            setErr('');
                        }} id="password" name="password"
                               type={password ? 'password' : 'text'} required/>
                    </div>
                    <span style={{display: err ? 'block' : 'none'}} className="error red">{err}</span>
                    <Link to="/restore" className={currentLang + " forgot mb-3"}
                          onClick={playClick}>{LANG.Auth.Login.forgotPassword}</Link>
                    <button className={currentLang} onClick={playClick}>{LANG.Auth.Login.loginIn}</button>
                    <span className={currentLang}>{LANG.Auth.Login.or}</span>
                    <button className={currentLang} onClick={e => {
                        e.preventDefault();
                        registration();
                        clearData();
                        playClick();
                    }}>{LANG.Auth.Login.signUp}
                    </button>
                    <Link to="/support" className={currentLang + " support-link"}
                          onClick={playClick}>{LANG.support}</Link>
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
    playClick,
    switchStep
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
