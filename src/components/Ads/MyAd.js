import React from 'react';
import './ads.scss';
import back from "../../images/back.svg";
import {addImage} from '../../redux/actions/advertising'
import {connect} from "react-redux";
import Wallet from './components/Wallet'
import { useHistory } from 'react-router';

const MyAd = ({objData}) => {
    const history = useHistory()

    const encodeImageFileAsURL = (element) => {
        let file = element.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            addImage(reader.result);
        }
        reader.readAsDataURL(file);
    }


    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className='my-ad-main'>
            <form onSubmit={(e) => handleSubmit(e)} className="round-dark ads">
                <div>
                    <span className='backbtn-title-span'>
                        <img src={back} alt='back' className='backbtn-title-span__btn' onClick={() => history.goBack()}/>
                        <h2 className='backbtn-title-span__title'>Ad creative</h2>
                    </span>
                    <div className="wrapper-input-file">
                        <div className="label-file">
                            Select a banner to add <br/>
                            275 x 270 px
                        </div>
                        <div className="wrap-input">
                            <label className="dashed" htmlFor="image-file">
                                <img className="image-preview" alt="ban" src={objData.image}/>

                                <input onChange={(e) => {
                                    encodeImageFileAsURL(e)
                                }} type="file" id="image-file"/>
                            </label>

                            <label htmlFor="image-file" className="btn-file">
                                Choose file
                            </label>
                        </div>
                    </div>
                </div>
                <div className="website-block">
                    <span className="block-description">Website URL</span>
                    <input
                        value={objData.website_url}
                        type="text"
                        placeholder={objData.website_url}
                    />
                </div>
                <hr/>
                <div className='audience section-block'>
                    <h2 className='audience__title section-title'>Audience</h2>
                    <span className='country-block'>
                        <p className='country-block__title opacity-name'>Country</p>
                        <p className='country-block__country'>{Object.keys(objData.country_timezone)[0] || null}</p>
                    </span>
                    <span className='time-zone-block'>
                        <p className='time-zone__title opacity-name'>Time zone</p>
                        <p className='time-zone__time-zone'>UTC {objData.country_timezone[`${Object.keys(objData.country_timezone)[0]}`] || null}</p>

                    </span>
                </div>
                <hr/>
                <div className='timeAds section-block'>
                    <h2 className='timeAds__title section-title'>Time</h2>
                    <span className='start-time-block'>
                        <p className='start-time-block__title opacity-name'>Started</p>
                        <p className='start-time-block__time'>{objData.start_date}</p>
                    </span>
                    <span className='finished-time-block'>
                        <p className='finished-time-block__title opacity-name'>Finished</p>
                        <p className='finished-time-block__time'>{objData.end_date}</p>
                    </span>
                    {/*<span className='total-time-block'>*/}
                    {/*    <p className='total-time-block__title opacity-name'>Total time</p>*/}
                    {/*    <p className='total-time-block__total-time total-time'>8h 30 mins</p>*/}
                    {/*</span>*/}
                </div>
                <hr/>
                <div className='results section-block'>
                    <h2 className='result__title section-title'>Results</h2>
                    <span className='displays-block'>
                        <p className='displays-block__title opacity-name'>Displays</p>
                        <p className='displays-block__time result-data'>{+objData.displays}</p>
                    </span>
                    <span className='clicks-block'>
                        <p className='clicks-block__title opacity-name'>Clicks</p>
                        <p className='clicks-block__time result-data'>{+objData.clicks}</p>
                    </span>
                    <span className='budget-block'>
                        <p className='budget-block__title opacity-name'>Budget</p>
                        <p className='budget-block__total-time result-data currency-block'>{+objData.budget}
                            <span className='dollar'>&#36;</span>
                            {/* <span className='btn-block'>
                                0.035
                                <span className='btn'>&#8383;</span>
                            </span> */}
                        </p>
                    </span>
                </div>
                <div className="footer foter-BTNs" style={{marginTop: '53px'}}>
                    <button type="submit" className='myAd-btn'>Change</button>
                    <button className='myAd-btn'>Repeat</button>
                </div>
            </form>
            <Wallet input={true}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        objData: state.adsOptions.adDetail
    }
}

const mapDispatchToProps = {
    addImage
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAd)
