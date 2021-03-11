import React, {useState, useEffect} from "react"
import "./ads.scss";
import {useHistory} from "react-router-dom";
import {playClick} from "../../redux/actions/music";
import {getCurrentList, getDetails} from "../../redux/actions/advertising"
import {connect} from "react-redux";
import moment from 'moment';
import addNewImg from '../../images/add-new.png'
import back from "../../images/back.svg";
import Wallet from "./components/Wallet"
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const ListAds = ({playClick, name, balance, currentLang, currentList, finishedList, getCurrentList, getDetails}) => {
    let history = useHistory();
    const LANG = currentLang === "en" ? EN : RU;
    const [isCurrent, setIsCurrent] = useState(true);
    const [totalTime, setTotalTime] = useState();

    useEffect(() => {
        getCurrentList();
        console.log(currentList)
    }, [])

    const getTotalTime = (startTime, startDate, endTime, endDate) => {
        const start = `${startDate} ${startTime}`;
        const end = `${endDate} ${endTime}`;
        return moment.utc(moment(end).diff(moment(start))).format("DDD:HH:mm:ss")
    }

    return (
        <div className='list-main-block'>
            <div className='listBlock'>
                <div className='round-dark listAds'>
                    <span className='backbtn-title-span'>
                        <img src={back} alt='back' onClick={() => history.push('/game')} className='backbtn-title-span__btn'/>
                        <h2 className='backbtn-title-span__title'>{LANG.Ads.MyAds.title}</h2>
                    </span>
                    
                    <div className='images-switch'>
                        <span onClick={() => {
                            setIsCurrent(true)
                        }}
                            className={!isCurrent ? 'images-switch__item' : 'images-switch__item active'}>{LANG.Ads.MyAds.current}</span>
                        <span onClick={() => {
                            setIsCurrent(false)
                        }}
                            className={isCurrent ? 'images-switch__item' : 'images-switch__item active'}>{LANG.Ads.MyAds.finished}</span>
                    </div>
                    <ul className='images-list'>
                        {isCurrent ?
                            currentList.length
                            ? 
                            <React.Fragment>{currentList.map((item, index) => (
                                <li key={index * 2} className='images-list__item' onClick={() => {
                                    getDetails(item);
                                    history.push('/myad')
                                }}>
                                    <ul className='ad-detail-list'>
                                        <li className='ad-detail-list__item ad-detail-list__img'>
                                            <img src={item.image} alt='image' width='259' height='245'/>
                                        </li>
                                        <li className='ad-detail-list__item ad-detail-list__url'>{item.website_url}</li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>{Object.keys(item.country_timezone)[0]}</span>
                                            <span>UTC {item.country_timezone[`${Object.keys(item.country_timezone)[0]}`]}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Started</span>
                                            <span>{item.start_date}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Finished</span>
                                            <span>{item.end_date}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Totel time</span>
                                            <span>{getTotalTime(item.start_time, item.start_date, item.end_time, item.end_date)}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Displays</span>
                                            <span>{item.displays}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Clicks</span>
                                            <span>{item.clicks}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Budget</span>
                                            <span>
                                                {item.budget}
                                                <span className='item-dollar'>&#36;</span>
                                            </span>
                                        </li>
                                    </ul>
                                    {/* <span className='item__title item__url'>{item.website_url || "mysite.com"}</span>
                                    <span className='item__date'>{item.end_date}</span> */}
                                </li>
                            ))} <li className='images-list__item add-new' onClick={() => history.push('/ads')}>
                                    <img src={addNewImg} alt='add new' width='47' height='47' />
                                    <span className='add-new__content-text'>Add new</span>
                                </li>
                                </React.Fragment> : <h2 className='images-list__not-images'>{LANG.Ads.MyAds.notAds}</h2>
                            :
                            finishedList.length
                                ? finishedList.map((item, index) => (
                                    <li key={index * 2} className='images-list__item' onClick={() => {
                                        getDetails(item);
                                        history.push('/myad')
                                    }}>
                                        <ul className='ad-detail-list'>
                                        <li className='ad-detail-list__item ad-detail-list__img'>
                                            <img src={item.image} alt='image' width='259' height='245'/>
                                        </li>
                                        <li className='ad-detail-list__item ad-detail-list__url'>{item.website_url}</li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>{Object.keys(item.country_timezone)[0]}</span>
                                            <span>UTC {item.country_timezone[`${Object.keys(item.country_timezone)[0]}`]}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Started</span>
                                            <span>{item.start_date}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Finished</span>
                                            <span>{item.end_date}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Totel time</span>
                                            <span></span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Displays</span>
                                            <span>{item.displays}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Clicks</span>
                                            <span>{item.clicks}</span>
                                        </li>
                                        <li className='ad-detail-list__item'>
                                            <span className='item-title'>Budget</span>
                                            <span>
                                                {item.budget}
                                                <span className='item-dollar'>&#36;</span>
                                            </span>
                                        </li>
                                    </ul>
                                        {/* <span className='item__title item__url'>{item.website_url || "mysite.com"}</span>

                                        <span className='item__date'>{item.end_date}</span> */}
                                    </li>
                                )) : <h2 className='images-list__not-images'>{LANG.Ads.MyAds.notAds}</h2>
                        }
                    </ul>
                </div>
                <Wallet input={false}/>
            </div>
            
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
