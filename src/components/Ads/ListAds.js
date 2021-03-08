import React, {useState, useEffect} from "react"
import "./ads.scss";
import {useHistory} from "react-router-dom";
import {playClick} from "../../redux/actions/music";
import {getCurrentList, getDetails} from "../../redux/actions/advertising"
import {connect} from "react-redux";
import Wallet from "./components/Wallet"
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const ListAds = ({playClick, name, balance, currentLang, currentList, finishedList, getCurrentList, getDetails}) => {
    let history = useHistory();
    const LANG = currentLang === "en" ? EN : RU;
    const [isCurrent, setIsCurrent] = useState(true);

    useEffect(() => {
        getCurrentList();
    }, [])

    return (
        <div className='listBlock'>
            <div className='round-dark listAds'>
                <h2 className='listAds__title'>{LANG.Ads.MyAds.title}</h2>
                <div className='ads-switch'>
                    <span onClick={() => {
                        setIsCurrent(true)
                    }}
                          className={!isCurrent ? 'ads-switch__item' : 'ads-switch__item active'}>{LANG.Ads.MyAds.current}</span>
                    <span onClick={() => {
                        setIsCurrent(false)
                    }}
                          className={isCurrent ? 'ads-switch__item' : 'ads-switch__item active'}>{LANG.Ads.MyAds.finished}</span>
                </div>
                <ul className='ads-list'>
                    {isCurrent ? currentList.length
                        ? currentList.map((item, index) => (
                            <li key={index * 2} className='ads-list__item' onClick={() => {
                                getDetails(item);
                                history.push('/myad')
                            }}>
                                <span className='item__title'>{item.website_url || "mysite.com"}</span>
                                <span className='item__date'>{item.end_date}</span>
                            </li>
                        )) : <h2 className='ads-list__not-ads'>{LANG.Ads.MyAds.notAds}</h2> :
                        finishedList.length
                            ? finishedList.map((item, index) => (
                                <li key={index * 2} className='ads-list__item' onClick={() => {
                                    getDetails(item);
                                    history.push('/myad')
                                }}>
                                    <span className='item__title item__url'>{item.website_url || "mysite.com"}</span>

                                    <span className='item__date'>{item.end_date}</span>
                                </li>
                            )) : <h2 className='ads-list__not-ads'>{LANG.Ads.MyAds.notAds}</h2>
                    }
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
