import React, { useEffect } from "react";
import {connect} from "react-redux";
import {clear_ad, getCurrentList, setIsPreview, setWebsite} from "../../redux/actions/advertising";
// import {objData, isChange} from '../../redux/actions/changeAd'
import {createAdProp} from "../../redux/actions";
import {playClick} from "../../redux/actions/music";
import {userdata} from "../../redux/actions/game";
import {User} from "../../api/User";

import {setChangedObj} from '../../redux/actions/changeAd'
import {
    budget_err,
    country_err,
    end_date_err,
    end_time_err,
    image_err,
    start_date_err,
    start_time_err,
    website_err
} from '../../redux/actions/ad_errors'

// styles
import "./ads.scss";
// components
import {TextInput} from "./components/Duration/components";
import {Audience, Duration, Footer, ImagePreview} from "./components";
import Wallet from "./components/Wallet"

const Ads = (props) => {
    // const [successBtn, setSuccessBtn] = useState(false);
    let timezones = {};
    props.country_codes_timezones.forEach(item => {
        const k = Object.keys(item)[0];
        timezones[k] = item[k];
    })

    useEffect(()=> {
        props.clear_ad();
    }, []);
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
        budget: props.budget,
        ...withTime
    }

    const lighting = (err) => {
        switch (err) {
            case "image":
                return props.image_err(true);
            case "website_url":
                return props.website_err(true);
            case "country_codes_timezones":
                return props.country_err(true);
            case "budget":
                return props.budget_err(true);
            case "start_date":
                return props.start_date_err(true);
            case "start_time":
                return props.start_time_err(true);
            case "end_date":
                return props.end_date_err(true);
            case "end_time":
                return props.end_time_err(true);
            default:
                return null;
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        let errorArray = [];
        for (const adKey in ad) {
            if (!ad[adKey]) {
                errorArray.push(adKey);
            }
        }
        if (Object.keys(ad.country_codes_timezones).length === 0) {
            errorArray.push("country_codes_timezones");
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
        } else {
            errorArray.forEach(err => lighting(err));
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
                    <ImagePreview/>


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
        website_urlErr: state.ad_errors_reducer.website_url,
        errors: state.ad_errors_reducer
    }
}
const mapDispatchToProps = {
    setWebsite,
    createAdProp,
    playClick,
    userdata,
    getCurrentList,
    setChangedObj,
    image_err,
    website_err,
    country_err,
    budget_err,
    start_date_err,
    start_time_err,
    end_date_err,
    end_time_err,
    clear_ad,
    setIsPreview
}
export default connect(mapStateToProps, mapDispatchToProps)(Ads);
