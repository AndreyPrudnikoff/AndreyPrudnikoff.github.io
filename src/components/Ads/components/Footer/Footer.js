import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
// styles
import "./style.scss";

const Footer = (props) => {
    const [green, setGreen] = useState("");
    let timezones = {};
    props.country_codes_timezones.forEach(item => {
        const k = Object.keys(item)[0];
        timezones[k] = item[k];
    })
    const withTime = !props.withDate ? {
        start_date: props.start_date,
        start_time: props.start_time,
        end_date: props.end_date,
        end_time: props.end_time,
    } : null
    const ad = {
        image: props.image,
        website_url: props.website_url,
        country_codes_timezones: timezones,
        budget: props.budget,
        ...withTime
    }
    useEffect(() => {
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
            setGreen("green");
        } else {
            setGreen("");
        }
    }, [props.start_date, props.start_time, props.end_date, props.end_time, props.image, props.website_url, timezones, props.budget])

    return (
        <div className="footer">
            <button className={green} type='submit'>{props.isChange ? 'Change now' : 'Promote now'}</button>
        </div>
    );
};

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
        isChange: state.adChange.isChange
        // image: state.ad_errors_reducer.image,
        // website_url: state.ad_errors_reducer.website_url,
        // country_codes_timezones: state.ad_errors_reducer.country_codes_timezones,
        // start_date: state.ad_errors_reducer.start_date,
        // start_time: state.ad_errors_reducer.start_time,
        // end_date: state.ad_errors_reducer.end_date,
        // end_time: state.ad_errors_reducer.end_time,
        // budget: state.ad_errors_reducer.budget,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
