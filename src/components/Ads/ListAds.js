import React, { useState, useEffect } from 'react'
import "./ads.scss";
import {User} from '../../api/User';
import { useHistory } from 'react-router-dom';

const ListAds = () => {
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
                console.log(data.data.data)
            }
            console.log(data)
        })
        .catch(e => console.log(e))
        }
    }, [current, finished])
    
    return (
        <div className='round-dark listAds'>
            <h1 className='listAds__title'>My ads</h1>
            <div className='ads-switch'>
                <span onClick={() => {setCurrent(true); setFinished(false)}} className={!current ? 'ads-switch__item' : 'ads-switch__item active'}>Current</span>
                <span onClick={() => {setFinished(true); setCurrent(false)}} className={!finished  ? 'ads-switch__item' : 'ads-switch__item active'}>Finished</span>
            </div>
            <ul className='ads-list'>
                {!arrList.length === 0 ? 
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
                : <h1>Тустота ...</h1>}
                {/* {arrList.map((item, index) => {})} */}
                
                
            </ul>
        </div>
    )
}

export default ListAds