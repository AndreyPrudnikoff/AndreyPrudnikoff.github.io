import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/store";
import Restore from "./components/Auth/restore";
import Refill from "./components/Refill/Refill";
import Btc from "./components/Refill/Btc";
import Usd from "./components/Refill/Usd";
import Header from "./components/Header/Header";
import Start from "./components/Start/Start";
import Support from "./components/Auth/Support";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import Playlist from "./sound/Playlist";
import Ads from "./components/Ads/Ads";
import Complete from "./components/Refill/Complete";

const routing = [
    {path: "/", component: Start},
    {path: "/game", component: Main},
    {path: "/restore", component: Restore},
    {path: "/refill", component: Refill},
    {path: "/refill/btc", component: Btc},
    {path: "/refill/usd", component: Usd},
    {path: "/support", component: Support},
    {path: "/login", component: Auth},
    {path: "/signup", component: Auth},
    {path: "/ads", component: Ads},
    {path: "/complete", component: Complete},
]
render(
    <Provider store={store}>
        <Router>
            <Header />
            <Playlist />
            {routing.map((content, index) => {
                return <Route key={index} exact path={content.path} component={content.component}/>
            })}
            <Redirect from="*" to={localStorage.getItem('token') ? "/game" : "/"} />
            {/*<Route exact path="/" component={Start}/>*/}
            {/*<Route exact path="/game" component={Main}/>*/}
            {/*<Route path="/restore" component={Restore}/>*/}
            {/*<Route path="/refill" component={Refill}/>*/}
            {/*<Route path="/refill/btc" component={Btc}/>*/}
            {/*<Route path="/refill/usd" component={Usd}/>*/}
            {/*<Route path="/start" component={Start}/>*/}
            {/*<Route path="/support" component={Support}/>*/}
            {/*<Route path="/login" component={Auth}/>*/}
            {/*<Route path="/signup" component={Auth}/>*/}
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
