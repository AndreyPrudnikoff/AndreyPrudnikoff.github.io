import React, {useEffect, useState} from "react";
// components
import {RangeInput} from "./FormInput";
// styles
import "./style.scss";
// images
import bitcoin from "../../../../../images/bitcoin.svg";
import dollar from "../../../../../images/dollar.svg";
import {connect} from "react-redux";
import {setBudget} from "../../../../../redux/actions/advertising";


let socket = new WebSocket("wss://bitcybets.com:8080/serv");
let bitcoins = [];
socket.onmessage = async e => {
    (JSON.parse(e.data)).forEach(course => {
        bitcoins.push(course.Bitcoin);
    });
}

const Tabs = ({tabs, budget, setBudget, balance}) => {
    let currentCourse = bitcoins[bitcoins.length - 1];
    // useEffect(() => socket.close());
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className="tabsContainer">
            <div className="tabs">
                {tabs.map(({id, label}) => (
                    <div key={id}
                        className={activeTab === id ? "activeTab" : "tab"}
                        onClick={() => setActiveTab(id)}>
                        {label}
                    </div>
                ))}
            </div>

            <div className="daily">
                <span>Daily budget</span>
                <span className="opacity">Actual amount spend daily may vary</span>
                <div>
                    <span className="opacity">1 click = 1 $</span>
                    <span style={{marginLeft: "60px"}} className="opacity">1 display = 0.05 $</span>
                </div>
            </div>

            <div className="estimated">
                <div className="estimated-perDay">
                    <div style={{textAlign: "left"}}>
                        Estimated 1K – 1,5K people <br/>
                        reached per day
                    </div>

                    <div className="amount">
                        <div className="amount-btc">
                            {budget > 0 ? +budget.toFixed(4) : 0}<img src={bitcoin} alt="btc"/>
                        </div>
                        <div className="amount-dollar">
                            <div className="dollarContainer">{(+budget * +currentCourse).toFixed(0)}</div>
                            <img src={dollar} alt="dollar"/>
                        </div>
                    </div>
                </div>
                <RangeInput withError min={50} max={50000} course={currentCourse} balance={(balance * currentCourse)}/>
            </div>
            <div className="content">{tabs[activeTab]?.content}</div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        budget: state.adsOptions.budget,
        balance: state.balanceReducer.balance,
    }
}
const mapDispatchToProps = {
    setBudget
}
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
