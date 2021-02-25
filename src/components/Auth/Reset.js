import React, {useState} from 'react';
import {User} from "../../api/User";
import {Link} from "react-router-dom";
import {playClick} from "../../redux/actions/music";
// import store from '../../redux/store'
import {connect} from 'react-redux'
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Reset = ({history, currentLang, playClick}) => {
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState(true)
    const [passwordConfirm, setPasswordConfirm] = useState(true)
    const [secret, setSecret] = useState('');
    const [pass, setPass] = useState('');
    const [confpass, setConfpass] = useState('');
    const [err, setErr] = useState('');

    // const { lang } = store.getState().switchOptions;
    const LANG = currentLang === "en" ? EN : RU
    
    if (!success) {
        return (
            <div className="round-dark auth">
              <span onClick={() => {
                  setSecret('');
                  history.push("/restore");
                  playClick()
              }} className="back">&larr;</span>
                <h2 className={currentLang}>{LANG.Auth.ResetPassword.title}</h2>
                <form onSubmit={e => {
                    e.preventDefault();
                    if (confpass.length < 8 || confpass.length < 8) {
                        setErr('Password length must be 8 characters')
                    } else {
                        User.updatePassword({secret, pass, confpass})
                            .then(res => {
                                if (res.data.status === "success") {
                                    setSuccess(true);
                                } else {
                                    setErr("Wrong secret code!")
                                }
                            })
                            .catch(error => setErr("Expired or missed secret code"))
                    }

                }}>
                    <div className="">
                        <input value={secret} onInput={e => setSecret(e.target.value)} id="secret" name="secret"
                               type="text"
                               required/>
                    </div>

                    <div className={password ? 'pass' : 'text'}>
                        <span onClick={() => {setPassword(!password); playClick()}} className="eye"/>
                        <label className={currentLang} htmlFor="password">{LANG.Auth.ResetPassword.passwordNew}</label>
                        <input min='8' onChange={e => {
                            setPass(e.target.value);
                            setErr('');
                        }}
                               value={pass}
                               id="password" name="password" type={password ? 'password' : 'text'} required/>
                    </div>
                    <div className={passwordConfirm ? 'pass' : 'text'}>
                        <span onClick={() => {setPasswordConfirm(!passwordConfirm); playClick()}} className="eye"/>
                        <label className={currentLang} htmlFor="passwordConfirm">{LANG.Auth.ResetPassword.passwordRepeat}</label>
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
                    <button className={currentLang} type="submit" onClick={playClick}>{LANG.Auth.ResetPassword.reset}</button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="round-dark auth">
                <h2 className={currentLang}>{LANG.Auth.ResetPassword.passwordChanged}</h2>
                <form>
                    <button onClick={playClick}><Link className={currentLang} to="/login">{LANG.Auth.ResetPassword.ok}</Link></button>
                </form>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        currentLang: state.switchOptions.lang
    }
}

const mapDispatchToProps = {
    playClick
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
