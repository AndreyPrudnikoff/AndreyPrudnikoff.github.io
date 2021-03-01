import React, {useEffect, useState} from 'react';
import {geoposition} from "../../redux/actions";
import {connect} from "react-redux";

const Time = ({geo, geoposition}) => {
    useEffect(() => {
        geoposition()
    },[geo]);
    useEffect(() => {
        const clock = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(clock);
    }, [])
    let [time, setTime] = useState(new Date().toLocaleTimeString());
    return (
        <div className="time">
            <h2 className="time-text">{time.slice(0, 5)}</h2>
            <div className="label text-center">{geo || <span style={{fontSize: "10px"}}>Please, allow location access</span>}</div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        geo: state.geoReducer.geoposition,
    }
}
const mapDispatchToProps = {
    geoposition
}
export default connect(mapStateToProps, mapDispatchToProps)(Time);
