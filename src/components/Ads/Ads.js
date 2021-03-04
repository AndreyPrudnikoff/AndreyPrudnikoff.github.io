import React from "react";
import {connect} from "react-redux";
// styles
import "./ads.scss";
// components
import {TextInput} from "./components/Duration/components";
import {Duration, ImagePreview, Audience, Footer} from "./components";
import Wallet from './components/Wallet'
import {countryList} from "../../country/country";
import {setWebsite} from "../../redux/actions/advertising";

const Ads = (props) => {
    const asd = Object.keys(countryList);
    const ad = {
        banner: props.banner,
        website_url: props.website_url,
        country_codes_timezones: props.country_codes_timezones,
        banner_start_date: props.banner_start_date,
        banner_start_time: props.banner_start_time,
        banner_end_date: props.banner_end_date,
        banner_end_time: props.banner_end_time,
        budget: props.budget
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(ad);
    }
    return (
        <div style={{position: 'relative', display: 'flex'}}>
            <form onSubmit={(e) => handleSubmit(e)} className="round-dark ads">
                <ImagePreview/>

                <TextInput onChange={props.setWebsite} label="Website URL"/>

                <hr/>

                <Audience/>

                <Duration/>

                <Footer/>
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

    }
}
const mapDispatchToProps = {
    setWebsite
}
export default connect(mapStateToProps, mapDispatchToProps)(Ads);
