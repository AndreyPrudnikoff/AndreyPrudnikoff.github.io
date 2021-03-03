import React from "react";
import {connect} from "react-redux";
// styles
import "./ads.scss";
// components
import {TextInput} from "./components/Duration/components";
import {Duration, ImagePreview, Audience, Footer} from "./components";
import {countryList} from "../../country/country";

const Ads = (props) => {
    const asd = Object.keys(countryList);
    console.log(countryList)
    const ad = {
        banner: props.banner,
        website_url: props.website_url,
        country_codes: props.country_codes,
        country_cities: props.country_cities,
        banner_start_date: props.banner_start_date,
        banner_start_time: props.banner_start_time,
        banner_end_date: props.banner_end_date,
        banner_end_time: props.banner_end_time,
        banner_timezone: props.banner_timezone
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(ad);
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="round-dark ads">
            <ImagePreview/>

            <TextInput label="Website URL"/>

            <hr/>

            <Audience/>

            <Duration/>

            <Footer/>
        </form>
    )
}
const mapStateToProps = state => {
    return {
        banner: state.adsOptions.banner,
        website_url: state.adsOptions.website_url,
        country_codes: state.adsOptions.country_codes,
        country_cities: state.adsOptions.country_cities,
        banner_start_date: state.adsOptions.banner_start_date,
        banner_start_time: state.adsOptions.banner_start_time,
        banner_end_date: state.adsOptions.banner_end_date,
        banner_end_time: state.adsOptions.banner_end_time,
        banner_timezone: state.adsOptions.banner_timezone,
    }
}
export default connect(mapStateToProps, null)(Ads);
