
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getCurrentList, setAdErrors, setWebsite} from "../../redux/actions/advertising";
// import {objData, isChange} from '../../redux/actions/changeAd'
import {createAdProp} from "../../redux/actions";
import {playClick} from "../../redux/actions/music";
import {userdata} from "../../redux/actions/game";
import {User} from "../../api/User";
import {setChangedObj} from '../../redux/actions/changeAd'
import {website_err} from '../../redux/actions/ad_errors'
// styles
import "./ads.scss";
// components
import {TextInput} from "./components/Duration/components";
import {Audience, Duration, Footer, ImagePreview} from "./components";
import Wallet from "./components/Wallet"

const Ads = (props) => {
    const [errors, setErrors] = useState("");
    const [successBtn, setSuccessBtn] = useState(false);
    let timezones = {};
    props.country_codes_timezones.forEach(item => {
        const k = Object.keys(item)[0];
        timezones[k] = item[k];
    })
    useEffect(() => {
        // console.log(props.objData, props.isChange)
    }, [props.objData, props.isChange])

    const withTime = props.withDate ? {
        start_date: props.start_date,
        start_time: props.start_time,
        end_date: props.end_date,
        end_time: props.end_time,
    } : null;
    const ad = {
        image: props.image,
        website_url: props.website_url,
        country_codes_timezones: timezones,
        budget: props.budget.toString(),
        ...withTime
    }
    const handleSubmit = e => {
        e.preventDefault();
        let errorArray = [];

        for (const adKey in ad) {
            if (!ad[adKey]) {
                errorArray.push(adKey);
            } else if (props.withDate) {
                if (!ad.country_codes_timezones) {
                    errorArray.push("country_codes_timezones");
                }
            }
        }
        if (!errorArray.length) {
            User.createAd(ad)
                .then((res => {
                    if (res.data.status === "success") {
                        props.createAdProp();
                        props.userdata();
                        props.getCurrentList();
                    }
                }))
                .catch(e => console.log(e.data));
        }
    }

    return (
        <div className="father-ads" style={{position: 'relative', display: 'flex'}}>
            <div style={{display: props.createAd ? "block" : "none"}} className="blur soon">
                <div className="round-dark win">
                    <div className="win-btn">
                        <h2>Your ad completed</h2>
                        <button onClick={() => {
                            props.createAdProp();
                            props.history.push("/myads");
                            props.playClick();
                        }} className="btn btn-primary">My ads
                        </button>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', position: 'relative'}}>
                <form onSubmit={(e) => handleSubmit(e)} className="round-dark ads">
                    <ImagePreview />

                    <TextInput onChange={props.setWebsite} setChangedWebUrl={(e) => {props.setChangedObj('website_url', e)}} isChange={props.isChange} changeUrl={props.objData.website_url} label="Website URL" onChangeErrFalse={() => props.website_err(false)} urlErr={props.website_urlErr} />

                    <hr/>

                    <Audience/>

                    <Duration/>

                    <Footer/>
                </form>
                <Wallet input={true}/>
            </div>

        </div>
    )
}
const mapStateToProps = state => {
    return {
        image: state.adsOptions.image,
        website_url: state.adsOptions.website_url,
        country_codes_timezones: state.adsOptions.country_codes_timezones,
        start_date: state.adsOptions.banner_start_date,
        start_time: state.adsOptions.banner_start_time,
        end_date: state.adsOptions.banner_end_date,
        end_time: state.adsOptions.banner_end_time,
        budget: state.adsOptions.budget,
        withDate: state.adsOptions.withDate,
        adErrors: state.adsOptions.errorsObj,
        createAd: state.switchOptions.createAd,
        isChange: state.adChange.isChange,
        objData: state.adChange.objData,
        website_urlErr: state.ad_errors_reducer.website_url
    }
}
const mapDispatchToProps = {
    setWebsite,
    createAdProp,
    playClick,
    userdata,
    getCurrentList,
    website_err,
    setChangedObj
}
export default connect(mapStateToProps, mapDispatchToProps)(Ads);
