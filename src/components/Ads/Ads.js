import React from "react";
import {connect} from "react-redux";
// styles
import "./ads.scss";
// components
import {TextInput} from "./components/Duration/components";
import {Duration, ImagePreview, Audience, Footer} from "./components";
import Wallet from "./components/Wallet"
import {getCurrentList, setWebsite} from "../../redux/actions/advertising";
import {User} from "../../api/User";

import { useHistory } from "react-router-dom";
import {createAdProp} from "../../redux/actions";
import {playClick} from "../../redux/actions/music";
import {userdata} from "../../redux/actions/game";


const Ads = (props) => {
    let timezones = {};
    let history =  useHistory();
    props.country_codes_timezones.forEach(item => {
        const k = Object.keys(item)[0];
        timezones[k] = item[k];
    })
    const ad = {
        banner: props.banner,
        website_url: props.website_url,
        country_codes_timezones: timezones,
        banner_start_date: props.banner_start_date,
        banner_start_time: props.banner_start_time,
        banner_end_date: props.banner_end_date,
        banner_end_time: props.banner_end_time,
        budget: props.budget
    }
    const handleSubmit = e => {
        e.preventDefault();
        User.createAd(ad)
            .then((res=> {if(res.data.status === "success") {
                props.createAdProp();
                props.userdata();
                props.getCurrentList();
            }}))
            .catch(e => console.log(e.data));
    }

    return (
        <div style={{position: 'relative', display: 'flex'}}>
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
            <form onSubmit={(e) => handleSubmit(e)} className="round-dark ads">
                <ImagePreview/>

                <TextInput onChange={props.setWebsite} label="Website URL"/>

                <hr/>

                <Audience/>

                <Duration/>

                <Footer />
            </form>
            <Wallet input={true}/>
        </div>
    )

}
const mapStateToProps = state => {

    return {
        banner: state.adsOptions.banner,
        website_url: state.adsOptions.website_url,
        country_codes_timezones: state.adsOptions.country_codes_timezones,
        banner_start_date: state.adsOptions.banner_start_date,
        banner_start_time: state.adsOptions.banner_start_time,
        banner_end_date: state.adsOptions.banner_end_date,
        banner_end_time: state.adsOptions.banner_end_time,
        budget: state.adsOptions.budget,
        createAd: state.switchOptions.createAd

    }
}
const mapDispatchToProps = {
    setWebsite,
    createAdProp,
    playClick,
    userdata,
    getCurrentList
}
export default connect(mapStateToProps, mapDispatchToProps)(Ads);
