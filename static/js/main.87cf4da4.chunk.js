(this.webpackJsonpbitcoin=this.webpackJsonpbitcoin||[]).push([[0],{48:function(e,t,c){},49:function(e,t,c){},56:function(e,t,c){},59:function(e,t,c){},78:function(e,t,c){},79:function(e,t,c){"use strict";c.r(t);var s=c(0),n=c(1),a=c.n(n),r=c(21),i=c(9),l=c(4),o=(c(48),c(49),c.p+"static/media/Logo2.056c141d.svg"),j=c(5),d=c(26),b=c.n(d),u=c(39),h="AUTHORIZATION",O="PROHIBITION",p="REGISTRATION",m="GET_LOCATION",x="GET_COURSE",v="BET_WIN",f="BET_LOSE",g="CLOSE_CONGRATULATION";var N,y={prohibition:function(){return{type:O}}},w=Object(j.b)((function(e){return{auth:e.authReducer.auth}}),y)((function(e){var t=e.prohibition,c=e.auth;return Object(s.jsx)("div",{children:Object(s.jsxs)("header",{className:"header",children:[Object(s.jsx)("nav",{className:"navbar",children:Object(s.jsx)(i.b,{className:"navbar-brand",to:"/",children:Object(s.jsx)("img",{src:o,alt:"logo",height:"32",className:"d-inline-block align-top"})})}),Object(s.jsx)("h4",{style:c?{display:"block"}:{display:"none"},className:"text-center",children:"Bitcoin Live price"}),Object(s.jsx)("img",{className:"ava",style:c?{display:"block"}:{display:"none"},onClick:function(e){e.preventDefault(),t(),window.location.href="/",clearInterval()},src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACXSURBVHgBvZGNDUAwEIXvTMAGRrABmxgREzQ2sAEbsMG5xklO01Ka+JLXJtd7r38AHoioZBnWSgedrUEMYj6NmjUqRHYLYdx+9ATQTf6GiIUuZL4mCJO7BV/ABGEGeCL5EVVIp4wm2vw7l2/kYzY81axKVMrSIhpZPX/l9aGtUe4Zi+2tTnNL32mRh1kd9S2bDSBIIINEdk6rEyWrENhyAAAAAElFTkSuQmCC",alt:"icon"})]})})})),k=(c(56),c.p+"static/media/bitcoin.d0700d0f.svg"),C=c(14),A=c(15),S=c(17),R=c(16),F=c(40),I=c.n(F),E=new WebSocket("wss://bitcybets.com:8000/serv"),B=function(e,t,c){return N=new I.a(t,{type:"line",data:{labels:["","","","","","","","","","","","","","","",""],datasets:[{label:"Bitcoin Live price",backgroundColor:c,borderColor:"#FFFFFF",borderWidth:"1",data:e}]},options:{legend:{display:!1,labels:{fontColor:"transparent",border:"none",fontSize:0}},responsive:!0,maintainAspectRatio:!1,aspectRatio:.9,scales:{yAxes:[{ticks:{fontColor:"white",fontSize:12,stepSize:20,fontFamily:"roc-grotesk"},gridLines:{color:"rgba(255, 255, 255, 0.1)"}}],xAxes:[{ticks:{stepSize:.5,fontFamily:"roc-grotesk"},gridLines:{color:"rgba(255, 255, 255, 0.1)"}}]}}})},T=function(e){Object(S.a)(c,e);var t=Object(R.a)(c);function c(){return Object(C.a)(this,c),t.apply(this,arguments)}return Object(A.a)(c,[{key:"componentDidMount",value:function(){var e=this;1!==E.readyState&&(E=new WebSocket("wss://bitcybets.com:8000/serv")),E.onmessage=function(t){var c=document.getElementById("myChart").getContext("2d"),s=c.createLinearGradient(0,100,0,400);s.addColorStop(0,"rgba(141,217,252,0.6)"),s.addColorStop(1,"transparent");var n=t.data.slice(1,-1).split(","),a=n.slice(-17);e.props.bitcoinCourse(a),N&&N.config.data.datasets[0].data.length>0?(N.config.data.datasets[0].data.splice(0,1),N.config.data.datasets[0].data.push(n.pop()),N.update()):B(a,c,s)}}},{key:"componentWillUnmount",value:function(){E.close(),this.props.bitcoinCourse([]),N=""}},{key:"render",value:function(){return Object(s.jsx)("canvas",{id:"myChart"})}}]),c}(n.Component),L={bitcoinCourse:function(e){return function(t){t({type:x,payload:e})}}},W=Object(j.b)((function(e){return{course:e.courseReducer.course}}),L)(T),_=c(7),D=c.p+"static/media/deposit.1d680270.svg",P=c.p+"static/media/withdraw.2043f4fc.svg",G={geoposition:function(){var e="";return function(t){navigator.geolocation.getCurrentPosition(function(){var c=Object(u.a)(b.a.mark((function c(s){var n,a,r;return b.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return n=s.coords.latitude+","+s.coords.longitude,c.next=3,fetch("http://api.weatherapi.com/v1/current.json?key=abd620940ef44119b1f161639201704&q=".concat(n));case 3:return a=c.sent,c.next=6,a.json();case 6:r=c.sent,e=r.location.name,t({type:m,payload:e});case 9:case"end":return c.stop()}}),c)})));return function(e){return c.apply(this,arguments)}}())}}},U=Object(j.b)((function(e){return{geo:e.geoReducer.geoposition,balance:e.balanceReducer.balance,lastWin:e.balanceReducer.lastWin,predict:e.balanceReducer.predict,wins:e.balanceReducer.wins}}),G)((function(e){var t=e.geoposition,c=e.geo,a=e.balance,r=e.lastWin,i=e.wins,l=e.predict,o={color:"green"===l?"#32D74B":"red"===l?"#FF453A":"#FFFFFF"};Object(n.useEffect)((function(){t()}),[t]),Object(n.useEffect)((function(){var e=setInterval((function(){return u((new Date).toLocaleTimeString())}),1e3);return function(){return clearInterval(e)}}),[]);var j=Object(n.useState)((new Date).toLocaleTimeString()),d=Object(_.a)(j,2),b=d[0],u=d[1];return Object(s.jsxs)("div",{className:"right-sector",children:[Object(s.jsxs)("div",{className:"banner round-dark",children:[Object(s.jsx)("div",{className:"row img"}),Object(s.jsxs)("div",{className:"text",children:[Object(s.jsx)("h5",{children:"Ad banner"}),Object(s.jsx)("p",{children:"Your ad can be here"})]})]}),Object(s.jsxs)("div",{className:"score-wrap round-dark",children:[Object(s.jsx)("h2",{children:"Score"}),Object(s.jsx)("table",{children:Object(s.jsxs)("tbody",{children:[Object(s.jsxs)("tr",{children:[Object(s.jsxs)("td",{children:[Object(s.jsx)("div",{className:"label",children:"Name"}),Object(s.jsx)("div",{className:"score",id:"name",children:"Test"})]}),Object(s.jsxs)("td",{children:[Object(s.jsx)("div",{className:"label",children:"Wins"}),Object(s.jsx)("div",{className:"score",id:"wins",children:i})]})]}),Object(s.jsxs)("tr",{children:[Object(s.jsxs)("td",{children:[Object(s.jsx)("div",{className:"label",children:"Balance"}),Object(s.jsxs)("div",{style:o,className:"score",id:"balance",children:[a.toFixed(3)," BTC"]})]}),Object(s.jsxs)("td",{children:[Object(s.jsx)("div",{className:"label",children:"Last Win"}),Object(s.jsxs)("div",{className:"score",id:"lastWin",children:[r," BTC"]})]})]})]})}),Object(s.jsxs)("div",{children:[Object(s.jsxs)("button",{type:"btn",className:"btn money-btn green",children:["DEPOSIT",Object(s.jsx)("img",{src:D,alt:"deposit"})]}),Object(s.jsxs)("button",{type:"btn",className:"btn money-btn red",children:["WITHDRAW",Object(s.jsx)("img",{src:P,alt:"withdraw"})]})]})]}),Object(s.jsxs)("div",{className:"time round-dark",children:[Object(s.jsx)("div",{className:"label text-center",children:c||"Kyiv"}),Object(s.jsx)("h2",{className:"time-text",children:b.slice(0,5)})]})]})})),Y=c(2),H=c(13),q=c.p+"static/media/up.80efb8f0.svg",M=c.p+"static/media/person.c4327c37.svg",z=c.p+"static/media/down.43b4bccb.svg",V=c.p+"static/media/arrowUp.dbe56842.svg",J=c.p+"static/media/arrowDown.e8dc83bd.svg",Q=function(e){Object(S.a)(c,e);var t=Object(R.a)(c);function c(e){var s;return Object(C.a)(this,c),(s=t.call(this,e)).state={bet:.5,predict:!1,counter:10,rate:!1},s.setBet=s.setBet.bind(Object(H.a)(s)),s.predictSubmit=s.predictSubmit.bind(Object(H.a)(s)),s.setRate=s.setRate.bind(Object(H.a)(s)),s}return Object(A.a)(c,[{key:"setBet",value:function(e){this.setState((function(t){return Object(Y.a)(Object(Y.a)({},t),{bet:e.target.value})}))}},{key:"setRate",value:function(e){this.setState((function(t){return Object(Y.a)(Object(Y.a)({},t),{},{rate:e})}))}},{key:"predictSubmit",value:function(e){var t=this,c=setInterval((function(){t.setState((function(e){return Object(Y.a)(Object(Y.a)({},e),{},{counter:e.counter-1})}))}),1e3);return this.setState((function(e){return Object(Y.a)(Object(Y.a)({},e),{},{predict:!0})})),setTimeout((function(){clearInterval(c),t.setState((function(e){return Object(Y.a)(Object(Y.a)({},e),{},{predict:!1,counter:10})}));var e=t.props.currentCourse,s=t.props.course[t.props.course.length-1],n=t.state.bet;e>s?t.state.rate?t.props.betWin(n):t.props.betLose(n):e<s&&(t.state.rate?t.props.betLose(n):t.props.betWin(n))}),1e4)}},{key:"render",value:function(){var e=this,t=this.state,c=t.bet,n=t.predict,a=t.counter,r=this.props.balance;return Object(s.jsx)("div",{className:"round dashboard",children:Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{className:"col-xl-3 best",children:[Object(s.jsx)("h2",{className:"text-center",children:"Bets in progress"}),Object(s.jsx)("div",{className:"wrap-table",children:Object(s.jsx)("table",{className:"p-3 table-responsive",children:Object(s.jsxs)("tbody",{children:[Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{className:"text-center",children:Object(s.jsx)("img",{src:q,alt:"up"})}),Object(s.jsxs)("td",{className:"text-center",children:[Object(s.jsxs)("span",{children:[Object(s.jsx)("span",{children:"10"}),Object(s.jsx)("img",{src:M,alt:"up"})]}),Object(s.jsxs)("span",{children:[Object(s.jsx)("span",{children:"0.125"}),Object(s.jsx)("img",{width:"15",src:k,alt:"up"})]})]})]}),Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{className:"text-center",children:Object(s.jsx)("img",{src:z,alt:"up"})}),Object(s.jsxs)("td",{className:"text-center",children:[Object(s.jsxs)("span",{children:[Object(s.jsx)("span",{children:"20"}),Object(s.jsx)("img",{src:M,alt:"up"})]}),Object(s.jsxs)("span",{children:[Object(s.jsx)("span",{children:"0.185"}),Object(s.jsx)("img",{width:"15",src:k,alt:"up"})]})]})]})]})})})]}),Object(s.jsxs)("div",{className:"range col-xl-6",children:[Object(s.jsx)("h2",{className:"text-center",children:"Make your bet"}),Object(s.jsx)("form",{children:Object(s.jsxs)("div",{className:"form row",children:[Object(s.jsxs)("div",{className:"bet col-sm-8",children:[Object(s.jsxs)("label",{className:"form-label d-flex justify-content-between",children:[Object(s.jsx)("span",{children:"Bet"}),Object(s.jsxs)("span",{children:[Object(s.jsx)("span",{children:c}),Object(s.jsx)("img",{width:"15",src:k,alt:"up"})]})]}),Object(s.jsx)("input",{min:"0.001",max:"1",step:"0.001",type:"range",disabled:n,style:{backgroundImage:"linear-gradient(to right, ".concat(r-c>=0?"#32D74B":"#FF453A"," 0%, ").concat(r-c>=0?"#32D74B":"#FF453A"," ").concat(100*c,"%, #fff ").concat(100*c,"%, white 100%)")},onInput:this.setBet,className:r-c>=0?"green-range":"red-range",id:"range"})]}),r-c>=0?Object(s.jsx)(s.Fragment,{}):Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("p",{className:"btn bet-btn col-sm-4",children:Object(s.jsx)("span",{children:"Not enough"})}),Object(s.jsx)("div",{className:"wrap-btn",children:Object(s.jsxs)(i.b,{to:"/refill",className:"btn refill-btn",children:[Object(s.jsx)("span",{children:"Refill"}),Object(s.jsx)("img",{src:k,width:"15",height:"20",alt:"b"})]})})]}),r-c>=0?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("p",{style:{display:n?"block":"none"},className:"btn bet-btn col-sm-4",children:Object(s.jsxs)("span",{children:["00:",a>9?a:"0"+a]})}),Object(s.jsxs)("div",{className:"wrap-btn",children:[Object(s.jsxs)("button",{disabled:n,onClick:function(t){t.preventDefault(),e.predictSubmit(),e.setRate(!0)},className:"btn green predict-btn",children:["PREDICT UP",Object(s.jsx)("img",{src:V,width:"15",height:"20",alt:"b"})]}),Object(s.jsxs)("button",{disabled:n,onClick:function(t){t.preventDefault(),e.predictSubmit(),e.setRate(!1)},className:"btn red predict-btn",children:["PREDICT DOWN",Object(s.jsx)("img",{src:J,width:"15",height:"20",alt:"b"})]})]})]}):Object(s.jsx)(s.Fragment,{})]})})]})]})})}}]),c}(a.a.Component),X={betWin:function(e){return function(t){t({type:v,payload:e})}},betLose:function(e){return function(t){t({type:f,payload:e})}}},Z=Object(j.b)((function(e){return{balance:e.balanceReducer.balance,course:e.courseReducer.course,currentCourse:e.courseReducer.currentCourse,lastWin:e.balanceReducer.lastWin}}),X)(Q),K=[{type:"Hour",active:!0},{type:"Day",active:!1},{type:"Week",active:!1},{type:"Month",active:!1},{type:"6 month",active:!1},{type:"12 month",active:!1}],$=function(e){Object(S.a)(c,e);var t=Object(R.a)(c);function c(e){var s;return Object(C.a)(this,c),(s=t.call(this,e)).state={showSelectList:!1},s.toggleShow=s.toggleShow.bind(Object(H.a)(s)),s}return Object(A.a)(c,[{key:"toggleShow",value:function(e){this.setState((function(e){return{showSelectList:!e.showSelectList}})),K.forEach((function(t){t.active=t.type===e.target.textContent}))}},{key:"render",value:function(){var e=this;return this.state.showSelectList?Object(s.jsx)("div",{children:Object(s.jsx)("ul",{className:"select-list",children:K.map((function(t,c){return Object(s.jsx)("li",{onClick:e.toggleShow,className:t.active?"active":"",children:Object(s.jsx)("span",{children:t.type})},c)}))})}):Object(s.jsx)("div",{children:Object(s.jsx)("ul",{className:"select-list hide",children:K.filter((function(e){return!0===e.active})).map((function(t,c){return Object(s.jsx)("li",{onClick:e.toggleShow,className:t.active?"active down":"",children:Object(s.jsx)("span",{children:t.type})},c)}))})})}}]),c}(a.a.Component),ee={closeCongratulation:function(e){return function(e){e({type:g})}}},te=Object(j.b)((function(e){return{course:e.courseReducer.course,currentCourse:e.courseReducer.currentCourse,lastWin:e.balanceReducer.lastWin,congratulation:e.balanceReducer.congratulation}}),ee)((function(e){var t=e.course,c=e.lastWin,n=e.closeCongratulation,a=e.congratulation,r=e.currentCourse;return Object(s.jsxs)("div",{className:"main",children:[Object(s.jsx)("div",{style:{display:a?"block":"none"},className:"blur",children:Object(s.jsxs)("div",{className:"round-dark win",children:[Object(s.jsx)("h2",{children:"Congratulations"}),Object(s.jsxs)("div",{className:"text-center",children:["You won ",c," ",Object(s.jsx)("img",{src:k,width:"15",alt:"bit"})]}),Object(s.jsxs)("div",{className:"win-btn",children:[Object(s.jsx)("button",{onClick:n,className:"btn btn-primary",children:"Invest in my wallet"}),Object(s.jsx)("button",{onClick:n,className:"btn btn-primary",children:"Withdraw"})]})]})}),Object(s.jsx)("main",{children:Object(s.jsxs)("div",{className:"row main",children:[Object(s.jsxs)("div",{className:"left-sector",children:[Object(s.jsxs)("div",{className:"round globe",children:[t.length?Object(s.jsxs)("div",{children:[Object(s.jsxs)("h2",{className:"text-center",children:[Object(s.jsx)("img",{src:k,className:"m-2",alt:"course"}),r.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")," ",Object(s.jsx)("span",{children:"$"})]}),Object(s.jsx)("div",{children:Object(s.jsx)($,{})})]}):Object(s.jsx)("h1",{className:"text-center",children:"Loading..."}),Object(s.jsx)("div",{className:"graph-wrapper",children:Object(s.jsx)("div",{className:"graph",children:Object(s.jsx)(W,{})})})]}),Object(s.jsx)("div",{children:Object(s.jsx)(Z,{})})]}),Object(s.jsx)(U,{})]})})]})})),ce=(c(59),c(41)),se=c.n(ce).a.create({baseURL:"https://bitcybets.com/api"}),ne=function(){var e=localStorage.getItem("token");return e&&(se.defaults.headers.common.Authorization="Bearer ".concat(e)),se},ae=function(e){return ne().post("/register",e)},re={authorization:function(){return{type:h}},registration:function(){return{type:p}}},ie=Object(j.b)((function(e){return{reg:e.authReducer.reg}}),re)((function(e){var t=e.reg,c=e.authorization,a=e.registration,r=Object(n.useState)(!0),l=Object(_.a)(r,2),o=l[0],j=l[1],d=Object(n.useState)(!0),b=Object(_.a)(d,2),u=b[0],h=b[1],O=Object(n.useState)(""),p=Object(_.a)(O,2),m=p[0],x=p[1],v=Object(n.useState)(""),f=Object(_.a)(v,2),g=f[0],N=f[1],y=Object(n.useState)(""),w=Object(_.a)(y,2),k=w[0],C=w[1],A=Object(n.useState)(""),S=Object(_.a)(A,2),R=S[0],F=S[1],I=Object(n.useState)(""),E=Object(_.a)(I,2),B=E[0],T=E[1];return t?Object(s.jsxs)("div",{className:"round-dark auth",children:[Object(s.jsx)("span",{onClick:function(){a()},className:"back",children:"\u2190"}),Object(s.jsx)("h2",{className:"",children:"Registration"}),Object(s.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=JSON.stringify({name:m,phone:g,email:k,pass:R,confpass:B});ae(t).then((function(e){return e})).then((function(e){void 0!==e.data.data.accessToken&&localStorage.setItem("token",e.data.data.accessToken)})).catch((function(e){return console.log(e)}))},children:[Object(s.jsxs)("div",{className:"",children:[Object(s.jsx)("label",{htmlFor:"name",children:"Name"}),Object(s.jsx)("input",{onChange:function(e){return x(e.target.value)},value:m,id:"name",name:"name",type:"text",required:!0})]}),Object(s.jsxs)("div",{className:"",children:[Object(s.jsx)("label",{htmlFor:"phone",children:"Phone"}),Object(s.jsx)("input",{onChange:function(e){return N(e.target.value)},value:g,id:"phone",name:"phone",type:"tel",required:!0})]}),Object(s.jsxs)("div",{className:"",children:[Object(s.jsx)("label",{htmlFor:"email",children:"Email"}),Object(s.jsx)("input",{onChange:function(e){return C(e.target.value)},value:k,id:"email",name:"email",type:"email",required:!0})]}),Object(s.jsxs)("div",{className:o?"pass":"text",children:[Object(s.jsx)("span",{onClick:function(){return j(!o)},className:"eye"}),Object(s.jsx)("label",{htmlFor:"password",children:"Password"}),Object(s.jsx)("input",{onChange:function(e){return F(e.target.value)},value:R,id:"password",name:"password",type:o?"password":"text",required:!0})]}),Object(s.jsxs)("div",{className:u?"pass":"text",children:[Object(s.jsx)("span",{onClick:function(){return h(!u)},className:"eye"}),Object(s.jsx)("label",{htmlFor:"passwordConfirm",children:"Repeat password"}),Object(s.jsx)("input",{onChange:function(e){return T(e.target.value)},value:B,id:"passwordConfirm",name:"passwordConfirm",type:u?"password":"text",required:!0})]}),Object(s.jsx)("button",{children:"REGISTER"})]})]}):Object(s.jsxs)("div",{className:"round-dark auth",children:[Object(s.jsx)("h2",{children:"Welcome"}),Object(s.jsxs)("form",{onSubmit:function(e){e.preventDefault(),c()},children:[Object(s.jsxs)("div",{className:"",children:[Object(s.jsx)("label",{htmlFor:"phone",children:"Phone"}),Object(s.jsx)("input",{id:"phone",name:"phone",type:"tel",required:!0})]}),Object(s.jsxs)("div",{className:o?"pass":"text",children:[Object(s.jsx)("span",{onClick:function(){return j(!o)},className:"eye"}),Object(s.jsx)("label",{htmlFor:"password",children:"Password"}),Object(s.jsx)("input",{id:"password",name:"password",type:o?"password":"text",required:!0})]}),Object(s.jsx)(i.b,{to:"/restore",className:"forgot mb-3",children:"Forgot password?"}),Object(s.jsx)("button",{children:"SIGN IN"}),Object(s.jsx)("span",{children:"or"}),Object(s.jsx)("button",{onClick:function(e){e.preventDefault(),a()},children:"REGISTER"})]})]})})),le=Object(j.b)((function(e){return{auth:e.authReducer.auth}}),null)((function(e){var t=e.auth;return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)(w,{}),t?Object(s.jsx)(te,{}):Object(s.jsx)(ie,{})]})})),oe=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,80)).then((function(t){var c=t.getCLS,s=t.getFID,n=t.getFCP,a=t.getLCP,r=t.getTTFB;c(e),s(e),n(e),a(e),r(e)}))},je=c(18),de={auth:!1,reg:!1,geoposition:"",course:[],currentCourse:0,balance:.5},be={balance:1,lastWin:0,wins:0,congratulation:!1,predict:"white"},ue=Object(je.c)({authReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:return Object(Y.a)(Object(Y.a)({},e),{},{auth:!0});case O:return Object(Y.a)(Object(Y.a)({},e),{},{auth:!1});case p:return Object(Y.a)(Object(Y.a)({},e),{},{reg:!e.reg});default:return e}},geoReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m:return Object(Y.a)(Object(Y.a)({},e),{},{geoposition:t.payload});default:return e}},courseReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case x:return Object(Y.a)(Object(Y.a)({},e),{},{course:t.payload,currentCourse:t.payload.pop()});default:return e}},balanceReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:be,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case v:return Object(Y.a)(Object(Y.a)({},e),{},{balance:e.balance+parseFloat(t.payload),wins:e.wins+1,lastWin:t.payload,congratulation:!0,predict:"green"});case f:return Object(Y.a)(Object(Y.a)({},e),{},{balance:e.balance-parseFloat(t.payload),predict:"red"});case g:return Object(Y.a)(Object(Y.a)({},e),{},{congratulation:!1});default:return e}}}),he=c(42),Oe=Object(je.e)(ue,Object(je.d)(Object(je.a)(he.a))),pe=function(e){Object(S.a)(c,e);var t=Object(R.a)(c);function c(e){var s;return Object(C.a)(this,c),(s=t.call(this,e)).state={restore:!0,userEmail:""},s.toggleRestore=s.toggleRestore.bind(Object(H.a)(s)),s.inputHandler=s.inputHandler.bind(Object(H.a)(s)),s}return Object(A.a)(c,[{key:"toggleRestore",value:function(e){e.preventDefault(),this.setState((function(e){return Object(Y.a)(Object(Y.a)({},e),{restore:!1})}))}},{key:"inputHandler",value:function(e){this.setState((function(t){return Object(Y.a)(Object(Y.a)({},t),{userEmail:e.target.value})}))}},{key:"render",value:function(){return this.state.restore?Object(s.jsx)("div",{className:"round-dark restore auth col-3",children:Object(s.jsxs)("form",{onSubmit:this.toggleRestore,children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Forgot password?"}),Object(s.jsx)("label",{htmlFor:"phone",children:"E-mail"}),Object(s.jsx)("input",{onInput:this.inputHandler,placeholder:"lucky@mail.com",id:"phone",name:"phone",type:"email",required:!0})]}),Object(s.jsx)("button",{children:"Send reset link"})]})}):Object(s.jsx)("div",{className:"round-dark restore auth col-3",children:Object(s.jsxs)("form",{onSubmit:function(e){return e.preventDefault()},children:[Object(s.jsx)("h2",{children:"Link has been sent"}),Object(s.jsxs)("p",{children:["We have sent a reset link on your mail ",this.state.userEmail,". Please, check your email and press the link"]}),Object(s.jsx)(i.b,{className:"ok",to:"/",children:"Go to main"})]})})}}]),c}(n.Component),me=(c(78),c.p+"static/media/dollar.803c6eed.svg"),xe=c.p+"static/media/arrows.078eac96.svg",ve=c.p+"static/media/back.bdc92420.svg",fe=function(e){return Object(s.jsxs)("div",{className:"refill",children:[Object(s.jsx)("span",{onClick:function(){return e.history.goBack()},className:"back",children:Object(s.jsx)("img",{src:ve,alt:"back"})}),Object(s.jsxs)("div",{className:"round-dark",children:[Object(s.jsx)("h2",{children:"How to fulfill"}),Object(s.jsx)("p",{children:"We are glad that you are going to be with us"}),Object(s.jsx)("div",{className:"amount",children:"Amount"}),Object(s.jsx)("br",{}),Object(s.jsxs)("div",{className:"refill-input",children:[Object(s.jsxs)("div",{className:"input-wrap",children:[Object(s.jsx)("input",{placeholder:"0.000",type:"text"}),Object(s.jsx)("img",{className:"currency",src:k,width:"15",alt:"btc"})]}),Object(s.jsx)("img",{className:"arrows",src:xe,alt:"arrows"}),Object(s.jsxs)("div",{className:"input-wrap",children:[Object(s.jsx)("input",{placeholder:"0.000",type:"text"}),Object(s.jsx)("img",{className:"currency",src:me,width:"15",alt:"usd"})]})]}),Object(s.jsxs)("div",{className:"refill-btn",children:[Object(s.jsxs)(i.b,{to:"/refill/btc",className:"pay",children:[Object(s.jsx)("span",{children:"PAY"}),Object(s.jsx)("img",{src:k,width:"15",alt:"bit"})]}),Object(s.jsxs)(i.b,{to:"/refill/usd",className:"pay",children:[Object(s.jsx)("span",{children:"PAY"}),Object(s.jsx)("img",{src:me,width:"15",alt:"bit"})]})]})]})]})},ge=function(e){var t=Object(n.useState)(!1),c=Object(_.a)(t,2),a=c[0],r=c[1];return Object(s.jsxs)("div",{className:"refill btc",children:[Object(s.jsx)("span",{onClick:function(){return e.history.goBack()},className:"back",children:Object(s.jsx)("img",{src:ve,alt:"back"})}),Object(s.jsxs)("div",{className:"round-dark",children:[Object(s.jsx)("h2",{children:"Payment by BTC"}),Object(s.jsxs)("div",{className:"amount label-payment",children:[Object(s.jsx)("span",{className:"nowrap",children:"Our BTC address"}),Object(s.jsx)("span",{style:{display:a?"block":"none"},className:"green",children:"Link is copied"})]}),Object(s.jsx)("div",{className:"refill-input",children:Object(s.jsx)("div",{className:"input-wrap",children:Object(s.jsx)("input",{id:"link",className:"card-number",readOnly:!0,defaultValue:"1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",type:"text"})})}),Object(s.jsxs)("div",{className:"refill-btn",children:[Object(s.jsx)("button",{onClick:function(e){r(!0),document.getElementById("link").select(),document.execCommand("copy")},className:"pay",children:"COPY LINK"}),Object(s.jsx)("button",{onClick:function(){e.history.push("/")},className:"pay",children:"GO TO MAIN"})]})]})]})},Ne=c.p+"static/media/visa.e3c41444.svg",ye=c.p+"static/media/mastercard.5f717f5d.svg",we=function(e){var t=Object(n.useState)(!1),c=Object(_.a)(t,2),a=c[0],r=c[1];return a?Object(s.jsx)("div",{className:"refill done",children:Object(s.jsxs)("div",{className:"round-dark main-usd",children:[Object(s.jsx)("h2",{children:"Payment complete"}),Object(s.jsx)("p",{children:"Have a luck in your bets"}),Object(s.jsx)("div",{className:"refill-btn",children:Object(s.jsx)("button",{onClick:function(){return e.history.push("/")},className:"pay",children:"Go to bets"})})]})}):Object(s.jsxs)("div",{className:"refill false",children:[Object(s.jsx)("span",{onClick:function(){return e.history.goBack()},className:"back",children:Object(s.jsx)("img",{src:ve,alt:"back"})}),Object(s.jsxs)("div",{className:"round-dark main-usd",children:[Object(s.jsx)("h2",{children:"Payment by USD"}),Object(s.jsx)("p",{children:"Enter your bank card"}),Object(s.jsxs)("div",{className:"wrap-img",children:[Object(s.jsx)("img",{src:Ne,alt:"visa"}),Object(s.jsx)("img",{src:ye,alt:"master"})]}),Object(s.jsx)("div",{className:"amount label-payment",children:"Card number"}),Object(s.jsx)("div",{className:"refill-input mb-3",children:Object(s.jsx)("div",{className:"input-wrap",children:Object(s.jsx)("input",{className:"card-number",placeholder:"_ _ _ _ \u2013 _ _ _ _ \u2013 _ _ _ _ \u2013 _ _ _ _",type:"text"})})}),Object(s.jsxs)("div",{className:"amount",children:[Object(s.jsx)("span",{children:"Expiring"}),Object(s.jsx)("span",{className:"left",children:"CVC"})]}),Object(s.jsx)("br",{}),Object(s.jsxs)("div",{className:"refill-input",children:[Object(s.jsx)("div",{className:"input-wrap",children:Object(s.jsx)("input",{placeholder:"_ _ /_ _",type:"text"})}),Object(s.jsx)("div",{className:"input-wrap",children:Object(s.jsx)("input",{placeholder:"_ _ _",type:"text"})})]}),Object(s.jsx)("div",{className:"refill-btn",children:Object(s.jsxs)("button",{onClick:function(){return r(!0)},className:"pay",children:["PAY",Object(s.jsx)("img",{src:me,width:"15",alt:"bit"})]})})]})]})};Object(r.render)(Object(s.jsx)(j.a,{store:Oe,children:Object(s.jsxs)(i.a,{children:[Object(s.jsx)(l.a,{exact:!0,path:"/",component:le}),Object(s.jsx)(l.a,{path:"/restore",component:pe}),Object(s.jsx)(l.a,{exact:!0,path:"/refill",component:fe}),Object(s.jsx)(l.a,{exact:!0,path:"/refill/btc",component:ge}),Object(s.jsx)(l.a,{exact:!0,path:"/refill/usd",component:we})]})}),document.getElementById("root")),oe()}},[[79,1,2]]]);
//# sourceMappingURL=main.87cf4da4.chunk.js.map