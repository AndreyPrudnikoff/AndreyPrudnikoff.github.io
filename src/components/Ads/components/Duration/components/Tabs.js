import React, {useEffect, useState} from "react";
// components
import {RangeInput} from "./FormInput";
// styles
import "./style.scss";
// images
import bitcoin from "../../../../../images/bitcoin.svg";
import dollar from "../../../../../images/dollar.svg";
import {connect} from "react-redux";
import {budget_err} from '../../../../../redux/actions/ad_errors'
import {setBudget, setWithDate} from "../../../../../redux/actions/advertising";
import {setChangedObj} from '../../../../../redux/actions/changeAd';


let socket = new WebSocket("wss://bitcybets.com:8080/serv");
let bitcoins = [];
socket.onmessage = async e => {
    (JSON.parse(e.data)).forEach(course => {
        bitcoins.push(course.Bitcoin);
    });
}

const Tabs = ({tabs, budget, setBudget, balance, setWithDate, adErrors, budget_err, budgetErr, objData, isChange, setChangedObj}) => {
    let currentCourse = bitcoins[bitcoins.length - 1];
    // useEffect(() => socket.close());
    const [activeTab, setActiveTab] = useState(0);

    const [cost, setCost] = useState(50)
    const [firstEntry, setFirstEntry] = useState(true)
    useEffect(() => {
        // console.log(currentCourse * objData.budget)
        if(isChange)  {
            setCost(currentCourse * objData.budget)
        } else {
            setCost(50)
        }
    }, [])

    const setFirstEntryHandler = () => {
        setFirstEntry(false)
    }

    return (
        <div className="tabsContainer">
            <div className="tabs">
                {tabs.map(({id, label}) => (
                    <div key={id}
                        className={activeTab === id ? "activeTab" : "tab"}
                        onClick={() => {
                            setActiveTab(id);
                            setWithDate(!!id);
                            console.log(!!id)
                        }}>
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
                        <div className="amount-dollar website-block">

                            <input onInput={e => {isChange ? setChangedObj(+e.target.value / +currentCourse) : setBudget(+e.target.value / +currentCourse); budget_err(false); setFirstEntryHandler()}} value={firstEntry ? (currentCourse * objData.budget) :((+budget * +currentCourse) || cost).toFixed(0)}
                                   style={{borderColor: budgetErr ? '#F94439' : '#fff'}}
                                   className="dollarContainer" />

                            <img src={dollar} alt="dollar"/>
                        </div>
                    </div>
                </div>
                <RangeInput withError min={50} max={50000} course={currentCourse} value={firstEntry ? (currentCourse * objData.budget) :((+budget * +currentCourse) || cost).toFixed(0)} balance={(balance * currentCourse)} budgetErr={budgetErr} onChangeFirstEntry={() => {setFirstEntry(false)}} onChangeBudgetErr={() => {budget_err(false)}}/>
            </div>
            <div className="content">{tabs[activeTab]?.content}</div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        budget: state.adsOptions.budget,
        balance: state.balanceReducer.balance,
        adErrors: state.adsOptions.errorsObj,
        budgetErr: state.ad_errors_reducer.budget,
        isChange: state.adChange.isChange,
        objData: state.adChange.objData
    }
}
const mapDispatchToProps = {
    setBudget,
    setWithDate,
    budget_err,
    setChangedObj
}
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
