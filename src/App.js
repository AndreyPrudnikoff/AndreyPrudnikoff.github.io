import React from "react";
import {connect} from "react-redux";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
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
import CompletePay from "./components/Refill/CompletePay";
import CompleteWith from "./components/Refill/CompleteWith";
import Withdraw from "./components/Refill/Withdraw";
import {prohibition, resizeScreen, switchView} from "./redux/actions";
import Invite from "./components/Refill/Invite";
import gotodesktop from "./components/Auth/gotodesktop";

document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("saveReload")) {
        sessionStorage.removeItem("token");
    } else {
        sessionStorage.removeItem("saveReload");
    }
})


const routing = [
    {path: "/", component: Start},
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
    {path: "/complete/pay", component: CompletePay},
    {path: "/complete/withdraw", component: CompleteWith},
    {path: "/withdraw", component: Withdraw},
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
        document.addEventListener("touchstart", (e) => {
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
            <Router>
                <Header refresh={this.refresh}/>
                <Playlist/>
                {routing.map((content, index) => {
                    return <Route key={index} exact path={content.path} component={content.component}/>
                })}
                <Redirect from="*" to={sessionStorage.getItem('token') ? "/game" : "/"}/>
                {this.props.unauthorized ? <Redirect to='/login'/> : null}
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        unauthorized: state.authReducer.unauthorized,
        currentLang: state.switchOptions.lang
    }
}
const mapDispatchToProps = {
    prohibition,
    resizeScreen,
    switchView
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
