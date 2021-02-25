import React, {useState, useRef} from 'react';
import back from "../../images/back.svg";
import add from "../../images/add_photo_alternate.svg";
import qrcode from "../../images/qrqcode.png";
import Header from "../Header/Header";
import {User} from "../../api/User";
import {Link} from "react-router-dom";
import {playClick, playSuccess} from "../../redux/actions/music";
import {connect} from "react-redux";
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const Btc = ({history, currentLang, playClick}) => {
    const [copied, setCopied] = useState(false);
    const [file, setFile] = useState(null);
    const [transaction, setTransaction] = useState('');
    const [fileName, setFileName] = useState('');
    const [err, setErr] = useState('');
    const LANG = currentLang === "en" ? EN : RU;
    const fileRef = useRef(null);
    const reader = new FileReader();
    const copy = (e) => {
        setCopied(true);
        document.getElementById('link').select();
        document.execCommand('copy');
    }
    const saveFile = () => {
        setErr('');
        setFileName(fileRef.current.files[0].name);
        setFile(fileRef.current.files[0]);
    }
    const submitScreen = () => {
        if (file && transaction) {
            const width = 300;
            const height = 150;
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();

                img.src = event.target.result;
                img.onload = () => {
                    const elem = document.createElement('canvas');
                    elem.width = width;
                    elem.height = height;
                    const ctx = elem.getContext('2d');
                    // img.width и img.height будет содержать оригинальные размеры
                    ctx.drawImage(img, 0, 0, width, height);
                    ctx.canvas.toBlob((blob) => {
                        const file1 = new File([blob], fileName, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        reader.readAsDataURL(file1);
                        reader.onload = () => {
                            User.sendDeposit({transactionId: transaction, transactionPhoto: reader.result})
                                .then(res => {
                                    if (res.data.status === "success") {
                                        history.push("/complete/pay")
                                        playSuccess()
                                    }
                                });
                        }
                    }, 'image/jpeg', 0.8);
                };
                reader.onerror = error => console.log(error);
            }
        } else if (file && !transaction) {
            setErr(LANG.FulfillingRealMoney.BTC.emptyID);
        } else {
            setErr(LANG.FulfillingRealMoney.BTC.emptyData);
        }
    }
    return (
        <div>
            <Header/>
            <div className="refill btc">
                <div className="round-dark">
                    <div className="qrcode">
                        <h2 className="currentLang">{LANG.FulfillingRealMoney.BTC.OurBTCWallet}</h2>
                        <img src={qrcode} alt="qr"/>
                    </div>
                    <span onClick={() => {history.goBack(); playClick()}} className="back"><img src={back} alt="back"/></span>
                    <h2 className="currentLang">{LANG.FulfillingRealMoney.BTC.title}</h2>
                    <div className="amount label-payment"><span className={currentLang + " nowrap"}>{LANG.FulfillingRealMoney.BTC.BTCWalletAddress}</span><span
                        style={{display: copied ? "block" : "none"}} className={currentLang + " green"}>{LANG.FulfillingRealMoney.BTC.linkCopy}</span></div>
                    <div className="refill-input">
                        <div className="input-wrap">
                            <input id='link' className="card-number" readOnly
                                   defaultValue="1FC2Jv4m2cEMi7RRzY34nNFgNkaDSonvcK" type="text"/>
                        </div>
                    </div>

                    <div className="refill-btn">
                        <button onClick={() => {copy(); playClick()} } className={currentLang + " pay"}>{LANG.FulfillingRealMoney.BTC.btnCopyLink}</button>
                        <div className="refill-btn">
                            <div className="">
                                <span className={currentLang + " nowrap"}>{LANG.FulfillingRealMoney.BTC.paymentScreenshotTitle}</span>
                                <label className="label overflow-hidden">
                                    <span className={currentLang + " drag nowrap"}>{fileName || LANG.FulfillingRealMoney.BTC.paymentScreenshotDrag}</span>
                                    <img src={add} alt="add"/>
                                    <span className={currentLang + " title"}>{LANG.FulfillingRealMoney.BTC.paymentScreenshotChoose}</span>
                                    <input accept=".png, .jpg, .jpeg" ref={fileRef} onChange={saveFile} type="file"/>
                                </label>
                            </div>
                        </div>
                        <div className="refill-input mt-5">
                            <div className="input-wrap">
                                <span className={currentLang + " nowrap"}>{LANG.FulfillingRealMoney.BTC.transactionIDTitle}</span>
                                <input value={transaction} onInput={(e) => {
                                    setErr('');
                                    setTransaction(e.target.value)
                                }} required name="trans" id='trans' className="card-number"
                                       placeholder="11223344"
                                       type="text"/>
                            </div>
                        </div>

                        <button onClick={() => {submitScreen(); playClick()}} className={currentLang + " pay mt-5"}>{LANG.FulfillingRealMoney.BTC.btnSend}
                        </button>
                        <span style={{display: err ? "block" : "none"}} className="red mt-2 text-center">{err}</span>
                        <Link to="/support" className={currentLang + " support-link text-center mt-4"} onClick={playClick}>{LANG.support}</Link>
                    </div>
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
    playClick,
    playSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Btc);
