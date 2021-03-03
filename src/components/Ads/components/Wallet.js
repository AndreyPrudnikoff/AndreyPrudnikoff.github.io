import React from 'react'
import '../ads.scss'
import {User} from '../../../api/User';
import {Link} from 'react-router-dom';
import deposit from '../../../images/deposit.svg';
import {playClick} from "../../../redux/actions/music";
import { connect } from 'react-redux';

const Wallet = ({name, balance, playClick}) => {
    return (
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
    )
}

const mapStateToProps = state => {
    return {
        balance: state.balanceReducer.balance,
        name: state.balanceReducer.name
    }
}

const mapDispatchToProps = {
    playClick
}
export default connect(mapStateToProps, null)(Wallet)