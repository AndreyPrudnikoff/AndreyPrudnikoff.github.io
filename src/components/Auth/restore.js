import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {User} from "../../api/User";
import {connect} from 'react-redux'
import {playClick} from "../../redux/actions/music";
// import store from '../../redux/store'
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

class Restore extends Component {
    constructor(props) {
        super(props);
        this.state = {restore: true, userEmail: '', err: ''};
        this.toggleRestore = this.toggleRestore.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.setErr = this.setErr.bind(this);
    }

    toggleRestore(e) {
        this.setState(state => ({...state, ...{restore: false}}));
    }

    setErr(string) {
        this.setState(state => ({...state, ...{err: string}}));
    }

    inputHandler(e) {
        this.setState(state => ({...state, ...{userEmail: e.target.value}}));
        this.setErr('');
    }

    render() {
        const {restore, userEmail, err} = this.state;
        const {history, currentLang, playClick} = this.props;

        // const { lang } = store.getState().switchOptions;

        const LANG = currentLang === "en" ? EN : RU

        if (restore) {
            return (
                <div className="round-dark restore auth col-3">
                    <span onClick={() => {history.push('/login'); playClick()}} className="restore-arrow">&larr;</span>
                    <form onSubmit={e => {
                        e.preventDefault();
                        User.forgotPassword({email: userEmail})
                            .then(res => {
                                if (res.data.status === "success") {
                                    this.toggleRestore(e);
                                } else {
                                    this.setErr('Wrong email');
                                }
                            })
                            .catch(error => this.setErr('Wrong email'));
                    }
                    }>
                        <div>
                            <h2 className={currentLang}>{LANG.Auth.ForgotPassword.title}</h2>
                            <label className={currentLang} htmlFor="phone">{LANG.Auth.ForgotPassword.emailTitle}</label>
                            <input onInput={this.inputHandler} placeholder={LANG.Auth.ForgotPassword.email} id="phone" name="phone"
                                   type="email" required/>
                        </div>
                        <span style={{display: err ? 'block' : 'none'}} className="error red">{err}</span>
                        <button className={currentLang} onClick={playClick}>{LANG.Auth.ForgotPassword.reset}</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="round-dark restore auth col-3">
                    <form onSubmit={e => e.preventDefault()}>
                        <h2 className={currentLang}>{LANG.Auth.StatusInfo.title}</h2>
                        <p className={currentLang} style={{fontWeight: 300, opacity: "0.8"}}>{LANG.Auth.StatusInfo.statusContent.sendLinkContent}<span style={{textDecoration: "underline", fontWeight: 400, opacity: "1"}}>{this.state.userEmail}</span>. {LANG.Auth.StatusInfo.statusContent.checkEmailContent}</p>
                        <Link className={currentLang + " ok"} to="/reset" onClick={playClick}>{LANG.Auth.StatusInfo.ok}</Link>
                    </form>
                </div>
            );
        }
    }

}

const mapStateToProps = state => {
    return {
        currentLang: state.switchOptions.lang
    }
}

const mapDispatchToProps = {
    playClick
}

export default connect(mapStateToProps, mapDispatchToProps)(Restore);
