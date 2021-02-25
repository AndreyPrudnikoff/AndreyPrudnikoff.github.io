import React from 'react';
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import "./intro.scss";

const IntroList = [
    <Step1 key="1"/>,
    <Step2 key="2"/>,
    <Step3 key="3"/>,
    <Step4 key="4"/>,
    <Step5 key="5"/>
];

const Presentation = ({match}) => {
    return (
        <div className="presentation">
            {IntroList.map((item, index) => (match.params.number === index + 1 + "" ? item : null))}
        </div>
    );
};

export default Presentation;
