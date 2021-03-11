import React from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header/Header";
import Playlist from "./sound/Playlist";
import Start from "./components/Start/Start";
import Restore from "./components/Auth/restore";
import Reset from "./components/Auth/Reset";
import Refill from "./components/Refill/Refill";
import Btc from "./components/Refill/Btc";
import Usd from "./components/Refill/Usd";
import Support from "./components/Auth/Support";
import Ads from "./components/Ads/Ads";
import ListAds from './components/Ads/ListAds';
import MyAd from './components/Ads/MyAd';
import CompletePay from "./components/Refill/CompletePay";
import CompleteWith from "./components/Refill/CompleteWith";
import Withdraw from "./components/Refill/Withdraw";
import Invite from "./components/Refill/Invite";
import gotodesktop from "./components/Auth/gotodesktop";
import {prohibition, resizeScreen, switchView, touchstart} from "./redux/actions";
import {clear_ad, getCurrentList} from "./redux/actions/advertising";
import Promo from "./components/Promo/Promo";


document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("saveReload")) {
        sessionStorage.removeItem("token");
    } else {
        sessionStorage.removeItem("saveReload");
    }
})


const routing = [
    {path: "/", component: Start},
    // {path: "/intro/:number", component: Presentation},
    {path: "/game", component: Main},
    {path: "/restore", component: Restore},
    {path: "/reset", component: Reset},
    {path: "/refill", component: Refill},
    {path: "/invite", component: Invite},
    {path: "/refill/btc", component: Btc},
    {path: "/refill/usd", component: Usd},
    {path: "/support", component: Support},
    {path: "/login", component: Auth},
    {path: "/signup", component: Auth},
    {path: "/ads", component: Ads},
    {path: "/myad", component: MyAd},
    {path: '/myads', component: ListAds},
    {path: "/complete/pay", component: CompletePay},
    {path: "/complete/withdraw", component: CompleteWith},
    {path: "/withdraw", component: Withdraw},
    {path: "/promo", component: Promo},
    {path: "/gotodesktop", component: gotodesktop},
]

class App extends React.Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.forceUpdate();
    }

    componentDidMount() {
        if (this.props.unauthorized) {
            this.props.prohibition();
        }
        window.addEventListener("resize", () => {
            if (window.outerWidth < 768) {
                this.props.resizeScreen("mobile");
            } else if (window.outerWidth >= 768) {
                this.props.resizeScreen("desktop");
            }
        })

        let start = "";
        let end = "";

        document.addEventListener("click", () => {
            if (!this.props.touch) {
                this.props.touchstart();
            } else {
                document.removeEventListener("click", () => {
                }, false);
            }
        });

        document.addEventListener("touchstart", (e) => {
            if (!this.props.touch) {
                this.props.touchstart();
            }
            start = e.changedTouches[0].screenX;
            document.addEventListener("touchend", (e) => {
                if (e.path[0].id === "range") {
                    document.removeEventListener("touchend", () => {
                    }, false);
                    document.removeEventListener("touchstart", () => {
                    }, false);
                } else if (e.path[0].id !== "range") {
                    end = e.changedTouches[0].screenX;
                    if (start - end > 100) {
                        this.props.switchView(false);
                    } else if (start - end < -100) {
                        this.props.switchView(true);
                    }
                    document.removeEventListener("touchstart", () => {
                    }, false);
                    document.removeEventListener("touchend", () => {
                    }, false);
                }
            })
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => {
        }, false);
    }

    render() {
        return (
            <Router className={this.props.currentLang}>
                <Header refresh={this.refresh}/>
                <Playlist/>
                {routing.map((content, index) => {
                    return <Route key={index} exact path={content.path} component={content.component}/>
                })}
                <Redirect from="*" to={sessionStorage.getItem('token') ? "/game" : "/"}/>
                {this.props.unauthorized ? <Redirect to='/'/> : null}
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        unauthorized: state.authReducer.unauthorized,
        currentLang: state.switchOptions.lang,
        touch: state.switchOptions.touchstart,
    }
}
const mapDispatchToProps = {
    prohibition,
    resizeScreen,
    switchView,
    touchstart,
    getCurrentList,
    clear_ad
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
