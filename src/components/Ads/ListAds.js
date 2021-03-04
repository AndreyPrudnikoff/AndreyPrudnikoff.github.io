import React, { useState, useEffect } from 'react'
import "./ads.scss";
import {User} from '../../api/User';
import deposit from '../../images/deposit.svg';
import { useHistory, Link } from 'react-router-dom';
import {playClick} from "../../redux/actions/music";
import {getCurrentList, getDetails} from '../../redux/actions/advertising'
import { connect } from 'react-redux';
import Wallet from './components/Wallet'
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const ListAds = ({playClick, name, balance, currentLang, currentList, finishedList, getCurrentList, getDetails}) => {
    let history = useHistory();
    const LANG = currentLang === "en" ? EN : RU;
    const [isCurrent, setIsCurrent] = useState(false)
    // const [finished, setFinished] = useState(false)
    const [arrList, setArrList] = useState()
    let ADS = isCurrent ? currentList : finishedList;
    // const [isData, setIsData] = useState(false)

    
    useEffect(() => {
        ADS = isCurrent ? currentList : finishedList;
    }, [isCurrent])

    useEffect(() => {
        getCurrentList()
    }, [])
    
    return (
        <div className='listBlock'>
            <div className='round-dark listAds'>
                <h1 className='listAds__title'>{LANG.Ads.MyAds.title}</h1>
                <div className='ads-switch'>
                    <span onClick={() => {setIsCurrent(true)}} className={!isCurrent ? 'ads-switch__item' : 'ads-switch__item active'}>{LANG.Ads.MyAds.current}</span>
                    <span onClick={() => {setIsCurrent(false)}} className={isCurrent  ? 'ads-switch__item' : 'ads-switch__item active'}>{LANG.Ads.MyAds.finished}</span>
                </div>
                <ul className='ads-list'>
                    {ADS.length !== 0
                        ?   ADS.map((item, index) => (
                                <React.Fragment>
                                    <li className='ads-list__item' onClick={() => {getDetails(item); history.push('/myad')}}>
                                        <span className='item__title'>myheadphones.com</span>
                                        <span className='item__date'>{item.end_date}</span>
                                    </li>
                                </React.Fragment>
                            )) : <h1 className='ads-list__not-ads'>{LANG.Ads.MyAds.notAds}</h1>
                            }
                    {/* {!Object.keys(testData).length == 0 ?
                        current ? 
                            testData.current.map((item, index) => (
                                <React.Fragment>
                                    <li className='ads-list__item' onClick={() => {history.push('/myad')}}>
                                        <span className='item__title'>{item.site}</span>
                                        <span className='item__date'>{item.date}</span>
                                    </li>
                                </React.Fragment>
                            ))
                        : testData.finished.map((item,index) => (
                            <React.Fragment>
                                    <li className='ads-list__item' onClick={() => {history.push('/myad')}}>
                                        <span className='item__title'>{item.site}</span>
                                        <span className='item__date'>{item.date}</span>
                                    </li>
                                </React.Fragment>
                        ))
                    
                    :
                    <h1 className='ads-list__not-ads'>{LANG.Ads.MyAds.notAds}</h1>
                    } */}
                    
                </ul>
            </div>
            <Wallet input={false}/>
        </div>  
    )
}

const mapStateToProps = state => {
    return {
        currentLang: state.switchOptions.lang,
        balance: state.balanceReducer.balance,
        name: state.balanceReducer.name,
        currentList: state.adsOptions.currentList,
        finishedList: state.adsOptions.finishedList
    }
}

const mapDispatchToProps = { 
    playClick, 
    getCurrentList, 
    getDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAds)
