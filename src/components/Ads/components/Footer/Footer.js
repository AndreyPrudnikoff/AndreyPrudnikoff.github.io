import React from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {setIsPreview} from '../../../../redux/actions/advertising'
// styles
import "./style.scss";


const Footer = ({setIsPreview, isCorrectDate, errors}) => {
    let history = useHistory()


    return (
        <div className="footer">
            <div style={{display: errors ? "block" : "none"}} className="errors">Property <span className="red">{errors}</span> not specified</div>
            <button type='submit'>Promote now</button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isCorrectDate: state.adsOptions.isCorrectDate
    }
}

const mapDispatchToProps = {
    setIsPreview
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
