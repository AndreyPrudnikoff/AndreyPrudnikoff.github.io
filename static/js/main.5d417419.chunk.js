(this.webpackJsonpbitcoin=this.webpackJsonpbitcoin||[]).push([[0],{16:function(e,t,c){},17:function(e,t,c){},18:function(e,t,c){},19:function(e,t,c){},22:function(e,t,c){"use strict";c.r(t);var s=c(0),n=c(1),a=c.n(n),i=c(9),r=(c(16),c(17),c(18),c.p+"static/media/logo.2c0c0f76.svg"),l=function(){return Object(s.jsx)("div",{children:Object(s.jsxs)("header",{className:"header",children:[Object(s.jsx)("nav",{className:"navbar",children:Object(s.jsxs)("a",{className:"navbar-brand",href:"https://google.com",children:[Object(s.jsx)("img",{src:r,alt:"",width:"32",height:"32",className:"d-inline-block align-top"}),"BITCY",Object(s.jsx)("span",{children:"BETS"})]})}),Object(s.jsx)("h4",{className:"text-center",children:"Bitcoin Live price"})]})})},j=(c(19),c.p+"static/media/bitcoin.d0700d0f.svg"),d=c(2),b=c(3),o=c(6),h=c(5),x=c(10),O=c.n(x),m=function(e){Object(o.a)(c,e);var t=Object(h.a)(c);function c(){return Object(d.a)(this,c),t.apply(this,arguments)}return Object(b.a)(c,[{key:"componentDidMount",value:function(){var e=document.getElementById("myChart").getContext("2d"),t=e.createLinearGradient(0,100,0,400);t.addColorStop(0,"rgba(141,217,252,0.7)"),t.addColorStop(1,"transparent"),new O.a(e,{type:"line",data:{labels:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],datasets:[{label:"Bitcoin Live price",backgroundColor:t,borderColor:"#FFFFFF",borderWidth:"1",data:[23556,23555,23558,23559,23560,23559,23556,23557,23558,23559,23562,23561,23556,23556,23558,23559,23560,23561]}]},options:{legend:{display:!1,labels:{fontColor:"transparent",border:"none",fontSize:0}},responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{fontColor:"white",fontSize:18},gridLines:{color:"rgba(255, 255, 255, 0.5)"}}],xAxes:[{gridLines:{color:"rgba(255, 255, 255, 0.5)"}}]}}})}},{key:"render",value:function(){return Object(s.jsx)("canvas",{id:"myChart",width:"400",height:"300"})}}]),c}(n.Component),u=c.p+"static/media/deposit.1d680270.svg",p=c.p+"static/media/withdraw.2043f4fc.svg",v=function(){return Object(s.jsxs)("div",{className:"col-md-3 right-sector",children:[Object(s.jsxs)("div",{className:"banner round-dark",children:[Object(s.jsx)("div",{className:"row img"}),Object(s.jsxs)("div",{className:"text",children:[Object(s.jsx)("h5",{children:"Ad banner"}),Object(s.jsx)("p",{children:"Your ad can be here"})]})]}),Object(s.jsxs)("div",{className:"score-wrap round-dark",children:[Object(s.jsx)("h2",{children:"Score"}),Object(s.jsx)("table",{children:Object(s.jsxs)("tbody",{children:[Object(s.jsxs)("tr",{children:[Object(s.jsxs)("td",{children:[Object(s.jsx)("div",{className:"label",children:"Name"}),Object(s.jsx)("div",{className:"score",id:"name",children:"Test"})]}),Object(s.jsxs)("td",{children:[Object(s.jsx)("div",{className:"label",children:"Wins"}),Object(s.jsx)("div",{className:"score",id:"wins",children:"2"})]})]}),Object(s.jsxs)("tr",{children:[Object(s.jsxs)("td",{children:[Object(s.jsx)("div",{className:"label",children:"Balance"}),Object(s.jsx)("div",{className:"score",id:"balance",children:"0.500 BTC"})]}),Object(s.jsxs)("td",{children:[Object(s.jsx)("div",{className:"label",children:"Last Win"}),Object(s.jsx)("div",{className:"score",id:"lastWin",children:"0.100 BTC"})]})]})]})}),Object(s.jsxs)("div",{children:[Object(s.jsxs)("button",{type:"btn",className:"btn money-btn green",children:["DEPOSIT",Object(s.jsx)("img",{src:u,alt:"deposit"})]}),Object(s.jsxs)("button",{type:"btn",className:"btn money-btn red",children:["WITHDRAW",Object(s.jsx)("img",{src:p,alt:"withdraw"})]})]})]}),Object(s.jsxs)("div",{className:"time round-dark",children:[Object(s.jsx)("div",{className:"label text-center",children:"Kyiv"}),Object(s.jsx)("h2",{className:"time-text",children:"10:42"})]})]})},g=c(8),N=c(4),f=c.p+"static/media/up.80efb8f0.svg",w=c.p+"static/media/person.c4327c37.svg",y=c.p+"static/media/down.43b4bccb.svg",C=c.p+"static/media/arrowUp.dbe56842.svg",S=c.p+"static/media/arrowDown.e8dc83bd.svg",k=function(e){Object(o.a)(c,e);var t=Object(h.a)(c);function c(e){var s;return Object(d.a)(this,c),(s=t.call(this,e)).state={bet:.5,balance:.5},s.setBet=s.setBet.bind(Object(N.a)(s)),s}return Object(b.a)(c,[{key:"setBet",value:function(e){var t={bet:e.target.value};this.setState((function(e){return Object(g.a)(Object(g.a)({},e),t)}))}},{key:"render",value:function(){var e=this.state,t=e.bet,c=e.balance;return Object(s.jsx)("div",{className:"round dashboard",children:Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{className:"col-xl-4 best",children:[Object(s.jsx)("h2",{className:"text-center",children:"Best in progress"}),Object(s.jsx)("div",{className:"wrap-table",children:Object(s.jsx)("table",{className:"p-3 table-responsive",children:Object(s.jsxs)("tbody",{children:[Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{className:"text-center",children:Object(s.jsx)("img",{src:f,alt:"up"})}),Object(s.jsxs)("td",{className:"text-center",children:[Object(s.jsxs)("span",{children:[Object(s.jsx)("span",{children:"10"}),Object(s.jsx)("img",{src:w,alt:"up"})]}),Object(s.jsxs)("span",{children:[Object(s.jsx)("span",{children:"0.125"}),Object(s.jsx)("img",{width:"15",src:j,alt:"up"})]})]})]}),Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{className:"text-center",children:Object(s.jsx)("img",{src:y,alt:"up"})}),Object(s.jsxs)("td",{className:"text-center",children:[Object(s.jsxs)("span",{children:[Object(s.jsx)("span",{children:"20"}),Object(s.jsx)("img",{src:w,alt:"up"})]}),Object(s.jsxs)("span",{children:[Object(s.jsx)("span",{children:"0.185"}),Object(s.jsx)("img",{width:"15",src:j,alt:"up"})]})]})]})]})})})]}),Object(s.jsxs)("div",{className:"range col-xl-7",children:[Object(s.jsx)("h2",{className:"text-center",children:"Make your bet"}),Object(s.jsxs)("form",{children:[Object(s.jsxs)("div",{className:"form row",children:[Object(s.jsxs)("div",{className:"bet col-sm-8",children:[Object(s.jsxs)("label",{className:"form-label d-flex justify-content-between",children:[Object(s.jsx)("span",{children:"Bet"}),Object(s.jsxs)("span",{children:[Object(s.jsx)("span",{children:t}),Object(s.jsx)("img",{width:"15",src:j,alt:"up"})]})]}),Object(s.jsx)("input",{min:"0",max:"1",step:"0.001",type:"range",onInput:this.setBet,className:"form-range",id:"range"})]}),c-t>=0?Object(s.jsx)(s.Fragment,{}):Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("input",{value:"Not enough",type:"button",className:"btn bet-btn col-sm-4"}),Object(s.jsxs)("button",{className:"btn refill-btn",children:["Refill",Object(s.jsx)("img",{src:j,width:"15",height:"20",alt:"b"})]})]})]}),c-t>=0?Object(s.jsxs)("div",{className:"wrap-btn",children:[Object(s.jsxs)("button",{className:"btn green predict-btn",children:["PREDICT UP",Object(s.jsx)("img",{src:C,width:"15",height:"20",alt:"b"})]}),Object(s.jsxs)("button",{className:"btn red predict-btn",children:["PREDICT DOWN",Object(s.jsx)("img",{src:S,width:"15",height:"20",alt:"b"})]})]}):Object(s.jsx)(s.Fragment,{})]})]})]})})}}]),c}(a.a.Component),B=[{type:"Hour",active:!0},{type:"Day",active:!1},{type:"Week",active:!1},{type:"Month",active:!1},{type:"6 month",active:!1},{type:"12 month",active:!1}],F=function(e){Object(o.a)(c,e);var t=Object(h.a)(c);function c(e){var s;return Object(d.a)(this,c),(s=t.call(this,e)).state={showSelectList:!1},s.toggleShow=s.toggleShow.bind(Object(N.a)(s)),s}return Object(b.a)(c,[{key:"toggleShow",value:function(e){this.setState((function(e){return{showSelectList:!e.showSelectList}})),B.forEach((function(t){t.active=t.type===e.target.textContent}))}},{key:"render",value:function(){var e=this;return this.state.showSelectList?Object(s.jsx)("div",{children:Object(s.jsx)("ul",{className:"select-list",children:B.map((function(t,c){return Object(s.jsx)("li",{onClick:e.toggleShow,className:t.active?"active":"",children:Object(s.jsx)("span",{children:t.type})},c)}))})}):Object(s.jsx)("div",{children:Object(s.jsx)("ul",{className:"select-list hide",children:B.filter((function(e){return!0===e.active})).map((function(t,c){return Object(s.jsx)("li",{onClick:e.toggleShow,className:t.active?"active down":"",children:Object(s.jsx)("span",{children:t.type})},c)}))})})}}]),c}(a.a.Component),L=function(){return Object(s.jsx)("div",{children:Object(s.jsx)("main",{children:Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{className:"col-md-9",children:[Object(s.jsxs)("div",{className:"round globe",children:[Object(s.jsxs)("div",{children:[Object(s.jsxs)("h2",{className:"text-center",children:[Object(s.jsx)("img",{src:j,className:"m-2",alt:"course"}),"23 552.86 ",Object(s.jsx)("span",{children:"$"})]}),Object(s.jsx)("div",{children:Object(s.jsx)(F,{})})]}),Object(s.jsx)("div",{className:"graph-wrapper",children:Object(s.jsx)("div",{className:"graph",children:Object(s.jsx)(m,{})})})]}),Object(s.jsx)("div",{children:Object(s.jsx)(k,{})})]}),Object(s.jsx)(v,{})]})})})};var T=function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)(l,{}),Object(s.jsx)(L,{})]})},D=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,23)).then((function(t){var c=t.getCLS,s=t.getFID,n=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),s(e),n(e),a(e),i(e)}))};Object(i.render)(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(T,{})}),document.getElementById("root")),D()}},[[22,1,2]]]);
//# sourceMappingURL=main.5d417419.chunk.js.map