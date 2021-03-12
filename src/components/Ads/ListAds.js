import React, {useEffect, useState} from "react"
import "./ads.scss";
import {useHistory} from "react-router-dom";
import {playClick} from "../../redux/actions/music";
import {getCurrentList, getDetails} from "../../redux/actions/advertising"
import {connect} from "react-redux";
import {User} from '../../api/User'
import moment from 'moment';
import addNewImg from '../../images/add-new.png'
import back from "../../images/back.svg";
import trash from "./../../images/trash.svg"
import opentrash from "./../../images/open-trash.svg"
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const ListAds = ({playClick, name, balance, currentLang, currentList, finishedList, getCurrentList, getDetails}) => {
    let history = useHistory();
    const LANG = currentLang === "en" ? EN : RU;
    const [isCurrent, setIsCurrent] = useState(true);
    const [totalTime, setTotalTime] = useState();

    useEffect(() => {
        getCurrentList();
    }, [])
    const lengthArray = 6 - currentList.length;
    const adNew = [];

    for (let i = 0; i < lengthArray; i++) {
        adNew.push(1);
    }

    const getTotalTime = (startTime, startDate, endTime, endDate) => {
        const start = `${startDate} ${startTime}`;
        const end = `${endDate} ${endTime}`;
        return moment.utc(moment(end).diff(moment(start))).format("DDD:HH:mm:ss")
    }
    const deleteAdHandler = id => {
        User.deleteAd(id).then((res) => {
            if(res.status === 200) {
                console.log('delete')
            }
        }).catch(err => console.log(err))
    }
    return (
        <div className='list-main-block'>
            <div className='listBlock'>
                <div className='round-dark listAds'>
                    <span className='backbtn-title-span'>
                        <img src={back} alt='back' onClick={() => history.push('/game')}
                             className='backbtn-title-span__btn'/>
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
                                        {/*<div className="trashwrap"><img className="trash"  src={trash} height={25} width={30} alt="trash"/><img className="open-trash" src={opentrash} height={30} width={35} alt="trash"/></div>*/}
                                        <ul className='ad-detail-list'>
                                            <li className='ad-detail-list__item ad-detail-list__img'>
                                                <img src={item.image} alt='image' width='259' height='245'/>
                                            </li>
                                            <li className='ad-detail-list__item ad-detail-list__url'>{item.website_url}</li>
                                            <li className='ad-detail-list__item'>
                                                <span
                                                    className='item-title'>{Object.keys(item.country_timezone)[0]}</span>
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
                                                <span className='item-title'>Total time</span>
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
                                ))} {adNew.map(() => (<li className='images-list__item add-new'
                                                                              onClick={() => history.push('/ads')}>
                                    <img src={addNewImg} alt='add new' width='47' height='47'/>
                                    <span className='add-new__content-text'>Create ad</span>
                                </li>))}

                                </React.Fragment>
                                : [1, 2, 3, 4, 5, 6].map(() => (
                                    <li className='images-list__item add-new' onClick={() => history.push('/ads')}>
                                        <img src={addNewImg} alt='add new' width='47' height='47'/>
                                        <span className='add-new__content-text'>Create ad</span>
                                    </li>))
                            :
                            finishedList.length
                                ? finishedList.map((item, index) => (
                                    <li key={index * 2} className='images-list__item' onClick={() => {
                                        getDetails(item);
                                        history.push('/myad')
                                    }}>
                                        <div className="trashwrap">
                                            {console.log(item)}
                                            <img className="trash"  src={trash} height={25} width={30} alt="trash"/>
                                            <img className="open-trash" src={opentrash} height={30} width={35} alt="trash" onClick={() => deleteAdHandler(item.id)}/>
                                        </div>
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
                                                <span className='item-title'>Total time</span>
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
