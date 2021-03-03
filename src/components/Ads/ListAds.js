import React, { useState, useEffect } from 'react'
import "./ads.scss";
import {User} from '../../api/User';
import deposit from '../../images/deposit.svg';
import { useHistory, Link } from 'react-router-dom';
import {playClick} from "../../redux/actions/music";
import { connect } from 'react-redux';

const ListAds = ({playClick, name, balance}) => {
    let history = useHistory();
    const [current, setCurrent] = useState(true)
    const [finished, setFinished] = useState(false)
    const [arrList, setArrList] = useState()
    const [isData, setIsData] = useState(false)
    useEffect(() => {
        return () => {
            User.listAds()
        .then(data => {
            if(data.status === 200) {
                setIsData(true)
                setArrList(data.data.data.slice())
                // console.log(data.data.data)
            }
            // console.log(data)
        })
        .catch(e => console.log(e))
        }
    }, [current, finished])

    const testData = {
        current: [
            {site: 'myheadphones.com', date: 'Jan 5, 2021'},
            {site: 'mybeats.com', date: 'Jan 4, 2021'}
        ],
        finished: [
            {site: 'myairpods.com', date: 'Jan 1, 2021'},
            {site: 'myheadphones.com', date: 'Dec 28, 2020'}
        ]
    }
    
    return (
        <div className='listBlock'>
            <div className='round-dark listAds'>
                <h1 className='listAds__title'>My ads</h1>
                <div className='ads-switch'>
                    <span onClick={() => {setCurrent(true); setFinished(false)}} className={!current ? 'ads-switch__item' : 'ads-switch__item active'}>Current</span>
                    <span onClick={() => {setFinished(true); setCurrent(false)}} className={!finished  ? 'ads-switch__item' : 'ads-switch__item active'}>Finished</span>
                </div>
                <ul className='ads-list'>
                    {current ? 
                            testData.current.map((item, index) => (
                                <React.Fragment>
                                    <li className='ads-list__item' onClick={() => {history.push('/ads')}}>
                                        <span className='item__title'>{item.site}</span>
                                        <span className='item__date'>{item.date}</span>
                                    </li>
                                </React.Fragment>
                            ))
                        : testData.finished.map((item,index) => (
                            <React.Fragment>
                                    <li className='ads-list__item' onClick={() => {history.push('/ads')}}>
                                        <span className='item__title'>{item.site}</span>
                                        <span className='item__date'>{item.date}</span>
                                    </li>
                                </React.Fragment>
                        ))
                        }
                    {/* {!(isData) ? 
                    <React.Fragment>
                        <li className='ads-list__item' onClick={() => {history.push('/ads')}}>
                            <span className='item__title'>myheadphones.com</span>
                            <span className='item__date'>Jan 5, 2021</span>
                        </li>
                        <li className='ads-list__item'>
                            <span className='item__title'>myheadphones.com</span>
                            <span className='item__date'>Jan 5, 2021</span>
                        </li>
                    </React.Fragment>
                    : <h1>Тустота ...</h1>} */}
                    {/* {arrList.map((item, index) => {})} */}
                </ul>
            </div>
            <div className='round-dark wallet'>
                <div className='wallet__title'>My wallet</div>
                <div className='wallet__name-title'>Name</div>
                <div className='wallet__name'>{name}</div>
                <div className='wallet__balance-title'>Balance</div>
                <div className='wallet__balance'>{balance} &#8383;</div>
                <Link to="/refill" className="wallet__deposit btn green" onClick={playClick}>Deposit
                    {/* {LANG.BettingRealMoney.UsualState.MyWallet.btnWithdraw} */}
                    <img src={deposit} alt="withdraw"/>
                </Link>
            </div>
        </div>  
    )
}

const mapStateToProps = state => {
    console.log(state.balanceReducer.name)
    return {
        balance: state.balanceReducer.balance,
        name: state.balanceReducer.name
    }
}

const mapDispatchToProps = { 
    playClick
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAds)