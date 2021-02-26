import React from 'react';
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import "./intro.scss";
import {connect} from "react-redux";
import {switchStep} from "../../redux/actions";

const IntroList = [
    Step1,
    Step2,
    Step3,
    Step4,
    Step5
];

const Presentation = ({step}) => {
    return (
        <div style={{display: !step ? "none" : "block"}}  className="presentation">
             {IntroList.map((item, index) => (step === index + 1 ? <item key={index} />: null))}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        step: state.switchOptions.step
    }
}
const mapDispatchToProps = {
    switchStep
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
