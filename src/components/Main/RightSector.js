import React, { useEffect} from 'react';
import deposit from '../../images/deposit.svg';
import withdraw from '../../images/withdraw.svg';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {click} from "../../redux/actions/music";
import switchWallet from "../../images/switch_wallet.svg";
import {userdata} from "../../redux/actions/game";

const RightSector = ({balance, lastWin, lastgame, wins, predict, click, userdata, name, isDemo, threewins}) => {
    // const [switcher, setSwitcher] = useState(false);
    const balanceColor = {color: predict === 'green' ? '#32D74B' : predict === 'red' ? '#FF453A' : '#FFFFFF'}

    useEffect(() => {
        userdata();
    }, [])

    return (
        <div className="right-sector">
            {/*<div style={{display: switcher ? "block" : "none"}} className="blur">*/}

            {/*    <div className="round-dark win">*/}
            {/*        <h2>My bitcoin wallet {'3wins'}</h2>*/}
            {/*        /!*<div className="text-center">You are going to play on real <br/> money. Are you sure? </div>*!/*/}
            {/*        <div className="win-btn">*/}
            {/*            <button className="btn btn-primary">Bet real bitcoin*/}
            {/*            </button>*/}
            {/*            <button className="btn btn-primary">Contunue demo*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="score-wrap round-dark">
                <h2>Demo wallet <span className={!isDemo ? "switch-wrapper demo" : "switch-wrapper real"}><img
                     src={switchWallet} alt=""/></span></h2>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <div className="label">Name</div>
                            <div className="score" id="name">{name}</div>
                        </td>
                        <td>
                            <div className="label">Wins</div>
                            <div className="score" id="wins">{wins}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="label">Balance</div>
                            <div style={balanceColor} className="score" id="balance">{balance} BTC</div>
                        </td>
                        <td>
                            <div className="label">Last Win</div>
                            <div className="score" id="lastWin">{lastWin || '0.000'} BTC</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <Link to="/refill" className="btn money-btn green">DEPOSIT
                        <img src={deposit} alt="deposit"/>
                    </Link>
                    <button onClick={()=> {
                        userdata();
                    }} type="btn" className="btn money-btn red">WITHDRAW
                        <img src={withdraw} alt="withdraw"/>
                    </button>
                </div>
            </div>
            <div onClick={() => {
                window.location.href = 'https://bitrxapp.com/?gb';
            }} className="banner round-dark">
                <button className="btn learn-more">Learn more</button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        balance: state.balanceReducer.balance,
        lastWin: state.balanceReducer.lastWin,
        lastgame: state.balanceReducer.lastgame,
        predict: state.balanceReducer.predict,
        wins: state.balanceReducer.wins,
        name: state.balanceReducer.name,
        threewins: state.balanceReducer['3wins'],
        isDemo: state.balanceReducer.isDemo
    }
}
const mapDispatchToProps = {
    click,
    userdata
}
export default connect(mapStateToProps, mapDispatchToProps)(RightSector);
