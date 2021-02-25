import React, {useState} from 'react';
import "./refill.scss";
import back from "../../images/back.svg";
import gplus from "../../images/social/gplus.svg";
import telegram from "../../images/social/telegram.svg";
import {playClick} from "../../redux/actions/music";
import sms from "../../images/social/sms.svg";
import viber from "../../images/social/viber.svg";
import twitter from "../../images/social/twitter.svg";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";


const Invite = ({history, currentLang, playClick}) => {
    const [copied, setCopied] = useState(false);
    const LANG = currentLang === "en" ? EN : RU;
    const copy = (e) => {
        setCopied(true);
        document.getElementById('link').select();
        document.execCommand('copy');
        return setInterval(() => setCopied(false), 5000);
    }
    return (
        <div className="invite">
            {/*<Header />*/}
            <div className="round-dark">
                <span onClick={() => {history.goBack(); playClick()}} className="back"><img src={back} alt="back"/></span>
                <div className="text">
                    <h2 className='currentLang'>{LANG.Training.InviteFriends.Form.title}</h2>
                    <span className={currentLang + " gold"}>{LANG.Training.InviteFriends.Form.content}</span>
                </div>
                <div className="social">
                    <span className={currentLang+ " label "}>{LANG.Training.InviteFriends.Form.sendInvitation}</span>
                    <div className="wrap">
                        <div className="wrap-image"><img width="28" src={telegram} alt="telegram"/></div>
                        <div className="wrap-image"><img width="24" src={sms} alt="sms"/></div>
                        <div className="wrap-image"><img width="28" src={viber} alt="viber"/></div>
                        <div className="wrap-image"><img width="28" src={gplus} alt="gplus"/></div>
                        <div className="wrap-image"><img width="28" src={twitter} alt="twitter"/></div>
                    </div>
                    <input type="email" placeholder="hi@gmail.com"/>
                    <button className={currentLang + " invite-btn"} onClick={playClick}>{LANG.Training.InviteFriends.Form.btnSendInvite}</button>
                </div>
                <div className="share-link">
                    <span className={currentLang + " label "}>{LANG.Training.InviteFriends.Form.shareLinkTitle} <span
                        style={{display: copied ? "block" : "none"}} className={currentLang + " green"}>{LANG.Training.InviteFriends.Form.copyLink}</span></span>
                    <input type="text" id="link" readOnly defaultValue="bitcybets.com/inviting"/>
                    <button onClick={() => {copy(); playClick()}} className={currentLang + " invite-btn"}>{LANG.Training.InviteFriends.Form.btnCopyShareLink}</button>
                </div>
                <div className="d-flex justify-content-center mt-3"><Link to="/support" className={currentLang + " support-link"} onClick={playClick}>{LANG.support}</Link></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
