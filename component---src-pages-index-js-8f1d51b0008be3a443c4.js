(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{145:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(156),u=t(154),i=t(148),c=t.n(i),s=(t(74),t(149)),l=t(146),d=t(175),m=t.n(d),f=(t(161),t(177)),g=t.n(f),p=t(178),v=t.n(p),h=function(){var e=g()(m.a.mark(function e(n,t){var r;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("url: ",n),e.next=3,v.a.get(n,{params:{token:t}}).then(function(e){return console.log("GET-response: ",e),e&&e.data}).catch(function(e){return console.log("GET-error: ",e),e});case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}},e)}));return function(n,t){return e.apply(this,arguments)}}(),b=function(){var e=g()(m.a.mark(function e(n,t,r){var a;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.post(n,t,{params:{token:r}}).then(function(e){return console.log("POST-response: ",e),e&&e.data&&e.data}).catch(function(e){return console.log("POST-error: ",e),e});case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}},e)}));return function(n,t,r){return e.apply(this,arguments)}}(),E=function(){var e=g()(m.a.mark(function e(n,t){var r;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.delete(n).then(function(e){return console.log("DELETE-response: ",e),e&&e.data&&e.data}).catch(function(e){return console.log("DELETE-error: ",e),e});case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}},e)}));return function(n,t){return e.apply(this,arguments)}}(),y="https://guarded-cove-61734.herokuapp.com";function w(){var e=c()(["\n  width: 100%;\n  min-width: 50vw;\n  padding: 0.5rem;\n  background-color: ",";\n  color: ",";\n  border: none;\n  border-bottom: 1px solid ",";\n  outline: none;\n  resize: none;\n"]);return w=function(){return e},e}var k=function(e){var n=e.value,t=e.setValue,r=e.rows,o=e.setRows;return a.a.createElement(S,{id:"ChatInput",placeholder:"Message...",rows:r,value:n,onChange:function(e){var n=e.target.rows;e.target.rows=1;var r=~~(e.target.scrollHeight/24);r===n&&(e.target.rows=r),r>=25&&(e.target.rows=25,e.target.scrollTop=e.target.scrollHeight),t(e.target.value),o(r<25?r:25)}})},S=s.a.textarea(w(),l.a.darkerGrey,l.a.white,l.a.white);function x(){var e=c()(["\n  padding: 0.6rem 0.6rem;\n  font-size: 1.5em;\n  border: none;\n  border-radius: 10rem;\n  background-color: ",";\n  color: ",";\n"]);return x=function(){return e},e}function U(){var e=c()(["\n  width: 100%;\n  min-width: 50vw;\n  padding: 0.5rem;\n  background-color: ",";\n  color: ",";\n  border: none;\n  border-bottom: 1px solid ",";\n  outline: none;\n  border: 1px solid red;\n  height: 100%;\n"]);return U=function(){return e},e}function j(){var e=c()(["\n  background-color: ",";\n  padding: 1rem;\n  display: flex;\n  justify-content: space-evenly;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n"]);return j=function(){return e},e}var O=function(e,n){setTimeout(function(){e(""),n(1),window.scrollTo(0,document.body.scrollHeight)},100)},C=function(e){var n=e.userId,t=e.setDbUpdate,o=e.dbUpdate,u=e.currentUser,i=Object(r.useState)(""),c=i[0],s=i[1],l=Object(r.useState)(1),d=l[0],m=l[1],f=Object(r.useState)(!1),g=f[0],p=f[1],v=function(e){var n=Object(r.useState)(!1),t=n[0],a=n[1];function o(n){n.key===e&&a(!0)}var u=function(n){n.key===e&&a(!1)};return Object(r.useEffect)(function(){return window.addEventListener("keydown",o),window.addEventListener("keyup",u),function(){window.removeEventListener("keydown",o),window.removeEventListener("keyup",u)}},[]),t}("Enter");return Object(r.useEffect)(function(){setTimeout(function(){return O(s,m)},200)},[]),v&&!g&&c&&(p(!0),b(y+"/messages",{text:c,user:n},u.username).then(function(e){console.log("userId: ",n),console.log("CHAT-CREATE-KEYPRESS-response: ",e),t(!o),document.getElementById("ChatInput").focus(),setTimeout(function(){return O(s,m)},200),setTimeout(function(){return p(!1)},1e3)})),a.a.createElement(a.a.Fragment,null,a.a.createElement(T,null,a.a.createElement(k,{id:"ChatInput",placeholder:"Message...",value:c,setValue:s,rows:d,setRows:m}),a.a.createElement(G,{onClick:function(){c&&!g&&(p(!0),b(y+"/messages",{text:c,user:n},u.username).then(function(e){console.log("userId: ",n),console.log("CHAT-CREATE-BUTTON-response: ",e),t(!o),document.getElementById("ChatInput").focus(),setTimeout(function(){return O(s,m)},200)}))}},"➣")))},T=s.a.div(j(),l.a.darkerGrey),G=(s.a.textarea(U(),l.a.darkerGrey,l.a.white,l.a.white),s.a.button(x(),l.a.white,l.a.darkGrey));function I(){var e=c()(["\n  width: ","rem;\n  height: ","rem;\n  border-radius: 5rem;\n  margin: ",";\n  visibility: ",";\n"]);return I=function(){return e},e}var V=function(e){var n=e.image,t=e.isVisible,r=e.size,o=e.margin;return a.a.createElement(L,{isVisible:n&&t,margin:o,src:n,size:r,alt:"Avatar"})},L=s.a.img(I(),function(e){return e.size},function(e){return e.size},function(e){return e.margin},function(e){return e.isVisible?"visible":"hidden"});function M(){var e=c()(["\n  background-color: ",";\n  color: ",";\n  border-radius: 1rem;\n  margin-left: 0.5rem;\n  padding: 0 0.3rem;\n  :hover {\n    color: ",";\n  }\n"]);return M=function(){return e},e}function A(){var e=c()(["\n  margin: 0.1rem 0.8rem;\n  padding: 0;\n  color: ",";\n"]);return A=function(){return e},e}function F(){var e=c()(["\n  margin: 0 1rem;\n  padding: 0;\n  color: ",";\n"]);return F=function(){return e},e}function R(){var e=c()(["\n  background-color: ",";\n  margin: 0 0.2rem;\n  padding: 0.5rem 0.7rem;\n  display: flex;\n  justify-content: ",";\n  align-items: flex-start;\n  border-radius: 1rem;\n  word-break: break-word;\n\n  :hover {\n    background-color: ",";\n    cursor: pointer;\n  }\n"]);return R=function(){return e},e}function z(){var e=c()(["\n  color: ",";\n  margin: 0;\n  padding: "," 0.5rem 0 0.5rem;\n  border-radius: 0.3rem;\n  display: flex;\n  flex-direction: ",";\n  max-width: 100%;\n  /* border: ","; */\n"]);return z=function(){return e},e}var q=function(e){var n=e.message,t=e.isFirstMessage,o=e.users,u=e.setDbUpdate,i=e.dbUpdate,c=e.isCurrentUser,s=e.currentUser,l=Object(r.useState)(!1),d=l[0],m=l[1],f=o&&o.find(function(e){return e._id===n.user});return a.a.createElement(a.a.Fragment,null,a.a.createElement(D,{isCurrentUser:c,isFirstMessage:t},a.a.createElement(V,{image:f&&f.image,isVisible:t,margin:(!c&&t?"1.6rem":c&&t?"-0.11rem":0)+" 0.5rem 0 0.3rem",size:2.5}),a.a.createElement("div",null,!c&&t&&a.a.createElement(H,null,f&&f.username),a.a.createElement(P,{empty:!n.text||!n.text.trim(),isCurrentUser:c,onClick:function(){return m(!d)}},n.text," ",c&&d&&a.a.createElement(_,{onClick:function(){E(y+"/messages/"+n._id,s.username).then(function(e){console.log("response: ",e),u(!i)})}},"✕")),d&&a.a.createElement(W,null,n.createdAt&&new Date(n.createdAt).toLocaleString()))))},D=s.a.div(z(),l.a.white,function(e){return e.isFirstMessage?"1rem":"0.3rem"},function(e){return e.isCurrentUser?"row-reverse":"row"},function(e){return e.isFirstMessage?"1px solid red":"1px solid green"}),P=s.a.p(R(),function(e){return e.isCurrentUser?l.a.darkishGrey:l.a.brightGrey},function(e){return e.empty?"flex-end":"space-between"},l.a.brightGrey),W=s.a.p(F(),l.a.brightGrey),H=s.a.p(A(),l.a.brightGrey),_=s.a.span(M(),l.a.brightGrey,l.a.white,l.a.white);function B(){var e=c()(["\n  min-height: 50vh;\n"]);return B=function(){return e},e}function J(){var e=c()(["\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  padding: 0.5rem 0.8rem 4rem;\n"]);return J=function(){return e},e}var Y=function(e){var n=e.users,t=e.currentUser,o=Object(r.useState)(void 0),u=o[0],i=o[1],c=Object(r.useState)(!1),s=c[0],l=c[1];return Object(r.useEffect)(function(){h(y+"/messages",t.username).then(function(e){console.log("messages: ",e),i(e)})},[s]),a.a.createElement(K,null,a.a.createElement(N,null,u&&Array.isArray(u)&&u.map(function(e,r){return a.a.createElement(q,{key:e._id,message:e,isFirstMessage:0===r||u[r-1].user!==e.user,users:n,setDbUpdate:l,dbUpdate:s,isCurrentUser:t._id===e.user,currentUser:t})}),a.a.createElement(C,{userId:t._id,messages:u,setMessages:i,setDbUpdate:l,dbUpdate:s,currentUser:t})))},K=s.a.div(J()),N=s.a.div(B());function Q(){var e=c()(["\n  display: flex;\n  background-color: ",";\n  border: none;\n  border-bottom: 1px solid ",";\n  outline: none;\n  color: ",";\n  margin: 1rem;\n  padding: 0.5rem;\n"]);return Q=function(){return e},e}var X=function(e){var n=e.placeholder,t=e.type,r=e.value,o=e.setValue;return a.a.createElement(Z,{placeholder:n,type:t,value:r,onChange:function(e){return o(e.target.value)}})},Z=s.a.input(Q(),l.a.darkerGrey,l.a.white,l.a.white);function $(){var e=c()(["\n  color: orange;\n\n  :hover {\n    color: white;\n    cursor: pointer;\n  }\n"]);return $=function(){return e},e}function ee(){var e=c()(["\n  background-color: ",";\n  color: ",";\n  padding: 0.5rem 3rem;\n  margin: 1rem;\n\n  :hover {\n    background-color: ",";\n    cursor: pointer;\n  }\n"]);return ee=function(){return e},e}function ne(){var e=c()(["\n  margin-top: 1rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  max-width: 20rem;\n  text-align: center;\n"]);return ne=function(){return e},e}var te=function(e){var n=e.setCurrentUser,t=e.setSignup,o=e.signUpSuccessful,u=Object(r.useState)(!1),i=u[0],c=u[1],s=Object(r.useState)(""),l=s[0],d=s[1],m=Object(r.useState)(""),f=m[0],g=m[1],p=Object(r.useState)(""),v=p[0],b=p[1],E=Object(r.useState)(0),w=E[0],k=E[1];return Object(r.useEffect)(function(){setTimeout(function(){return c(!0)},200)},[]),Object(r.useEffect)(function(){h(y+"/users").then(function(e){console.log("Login-users: ",e),b(e)})},[w]),a.a.createElement(re,null,i&&a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,"Login"),a.a.createElement(X,{placeholder:"Username",type:"text",value:l,setValue:d}),a.a.createElement(X,{placeholder:"Password",type:"password",value:f,setValue:g}),a.a.createElement(ae,{onClick:function(){k(w+1),ue(l,f,n,v)}},"Login"),w>0&&a.a.createElement("p",{style:{color:"red"}},"Invalid login (",w,")"),!o&&a.a.createElement("p",null,"Sign up ",a.a.createElement(oe,{onClick:function(){return t(!0)}},"here")),a.a.createElement("br",null),o&&a.a.createElement("p",null,"Sign up successful! You can now log in with your new username and password.")))},re=s.a.div(ne()),ae=s.a.button(ee(),l.a.darkerGrey,l.a.white,l.a.grey),oe=s.a.span($()),ue=function(e,n,t,r){localStorage.clear(),r&&r.find(function(t){return t.username===e&&t.password===n})?(localStorage.setItem("username",e),localStorage.setItem("password",n),t(e)):(t(void 0),console.log("Set loggedIn: false"))};function ie(){var e=c()(["\n  padding: 5rem;\n  text-align: center;\n"]);return ie=function(){return e},e}var ce=function(e){var n=e.currentUser;return a.a.createElement(se,null,a.a.createElement(V,{image:n.image,isVisible:!0,margin:"0 0.5rem 0 0",size:10}),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("h2",null,"Welcome ",n.username),a.a.createElement("p",null,"In the tabs above you can see other registered users, ",a.a.createElement("br",null),"use MyChat as well as sign out."))},se=s.a.div(ie());function le(){var e=c()(["\n  background-color: ",";\n  color: ",";\n  padding: 0.5rem 3rem;\n  margin: 1rem;\n\n  :hover {\n    background-color: ",";\n    cursor: pointer;\n  }\n"]);return le=function(){return e},e}function de(){var e=c()(["\n  text-align: center;\n"]);return de=function(){return e},e}var me=function(e){var n=e.setSignup,t=e.setSignUpSuccessful,o=Object(r.useState)(!1),u=o[0],i=o[1],c=Object(r.useState)(""),s=c[0],l=c[1],d=Object(r.useState)(""),m=d[0],f=d[1],g=Object(r.useState)(""),p=g[0],v=g[1],b=Object(r.useState)(""),E=b[0],w=b[1],k=Object(r.useState)(""),S=k[0],x=k[1],U=Object(r.useState)(""),j=U[0],O=U[1],C=Object(r.useState)(""),T=C[0],G=C[1],I=Object(r.useState)(""),V=I[0],L=I[1],M=Object(r.useState)(0),A=M[0],F=M[1];return Object(r.useEffect)(function(){setTimeout(function(){return i(!0)},200)},[]),Object(r.useEffect)(function(){h(y+"/users","Unauthorized").then(function(e){console.log("Signup-users: ",e),L(e)})},[A]),a.a.createElement(fe,null,u&&a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,"Sign Up"),a.a.createElement(X,{placeholder:"Username",type:"text",value:s,setValue:l}),a.a.createElement(X,{placeholder:"E-mail",type:"text",value:m,setValue:f}),a.a.createElement(X,{placeholder:"Password",type:"password",value:p,setValue:v}),a.a.createElement(X,{placeholder:"First name",type:"text",value:E,setValue:w}),a.a.createElement(X,{placeholder:"Last name",type:"text",value:S,setValue:x}),a.a.createElement(X,{placeholder:"Location",type:"text",value:j,setValue:O}),a.a.createElement(X,{placeholder:"Image url",type:"text",value:T,setValue:G}),a.a.createElement(ge,{onClick:function(){F(A+1),pe({username:s,email:m,password:p,firstname:E,lastname:S,location:j,image:T},V,t),localStorage.clear(),n(!1)}},"Sign Up"),A>0&&a.a.createElement("p",{style:{color:"red"}},"Invalid sign up (",A,")")))},fe=s.a.div(de()),ge=s.a.button(le(),l.a.darkerGrey,l.a.white,l.a.grey),pe=function(e,n,t){n&&n.find(function(n){return n.username===e.username||n.email===e.email})||(b(y+"/users",e,"Unauthorized").then(function(e){console.log("USER-CREATE-response: ",e)}),t(!0))};function ve(){var e=c()(["\n  height: 5rem;\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n"]);return ve=function(){return e},e}function he(){var e=c()(["\n  margin: 0.2rem 0;\n"]);return he=function(){return e},e}function be(){var e=c()(["\n  margin: 0;\n"]);return be=function(){return e},e}function Ee(){var e=c()(["\n  background-color: ",";\n  border-radius: 0.5rem;\n  padding: 1rem 1rem 2.5rem;\n  margin: 1rem;\n  border: ",";\n"]);return Ee=function(){return e},e}var ye=function(e){var n=e.user,t=e.isCurrentUser;return a.a.createElement(we,{isCurrentUser:t},a.a.createElement(xe,null,a.a.createElement(V,{image:n.image,isVisible:!0,margin:"0 0.5rem 0 0",size:5}),a.a.createElement(ke,null,n.username)),a.a.createElement(Se,null,"Full name: ",n.firstname," ",n.lastname),a.a.createElement(Se,null,"Location: ",n.location),a.a.createElement(Se,null,"Signed up: ",new Date(n.createdAt).toLocaleString()),a.a.createElement(Se,null,"Latest log in: ",new Date(n.createdAt).toLocaleString()))},we=s.a.div(Ee(),l.a.darkGrey,function(e){return e.isCurrentUser?"1px solid white":"none"}),ke=s.a.h2(be()),Se=s.a.p(he()),xe=s.a.div(ve()),Ue=function(e){var n=e.currentUser,t=e.users;return a.a.createElement("div",null,t&&Array.isArray(t)&&t.map(function(e){return a.a.createElement(ye,{isCurrentUser:n.username===e.username,user:e})}))};function je(){var e=c()(["\n  background-color: ",";\n  color: ",";\n  width: 100%;\n  padding: 0.8rem 0;\n  margin: 1rem 0.5rem;\n  border: none;\n\n  :hover {\n    background-color: ",";\n    cursor: pointer;\n  }\n"]);return je=function(){return e},e}function Oe(){var e=c()(["\n  display: flex;\n  justify-content: stretch;\n"]);return Oe=function(){return e},e}function Ce(){var e=c()(["\n  color: ",";\n  display: flex;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n"]);return Ce=function(){return e},e}var Te=function(){var e=Object(r.useState)("Welcome"),n=e[0],t=e[1],o=Object(r.useState)([]),u=o[0],i=o[1],c=Object(r.useState)(void 0),s=c[0],l=c[1],d=Object(r.useState)(!1),m=d[0],f=d[1],g=Object(r.useState)(!1),p=g[0],v=g[1],b=Object(r.useState)(!1),E=b[0],w=b[1];return Object(r.useEffect)(function(){v(!1),setTimeout(function(){v(!0)},400)},[]),Object(r.useEffect)(function(){h(y+"/users","Unauthorized").then(function(e){i(e),l(e.find(function(e){return e.username===localStorage.getItem("username")&&e.password===localStorage.getItem("password")}))})},[s]),p&&a.a.createElement(a.a.Fragment,null,!s&&!m&&a.a.createElement(Ge,null,a.a.createElement(te,{setSignup:f,signUpSuccessful:E,setCurrentUser:l})),!s&&m&&a.a.createElement(Ge,null,a.a.createElement(me,{setSignUpSuccessful:w,setCurrentUser:l,currentUser:s,setSignup:f})),s&&a.a.createElement(a.a.Fragment,null,a.a.createElement(Ie,null,a.a.createElement(Ve,{onClick:function(){return t("Users")}},"Users"),a.a.createElement(Ve,{onClick:function(){return t("Chat")}},"Chat"),a.a.createElement(Ve,{onClick:function(){localStorage.clear(),l(void 0)}},"Sign Out")),a.a.createElement(Ge,null,"Welcome"===n&&a.a.createElement(ce,{currentUser:s}),"Users"===n&&a.a.createElement(Ue,{currentUser:s,users:u}),"Chat"===n&&a.a.createElement(Y,{users:u,currentUser:s}))))},Ge=s.a.div(Ce(),l.a.white),Ie=s.a.div(Oe()),Ve=s.a.button(je(),l.a.darkGrey,l.a.white,l.a.grey);n.default=function(){return a.a.createElement(o.a,null,a.a.createElement(u.a,{title:"Home",keywords:["gatsby","application","react"]}),a.a.createElement(Te,null))}},146:function(e,n,t){"use strict";t.d(n,"a",function(){return r});var r={black:"#111",white:"#fff",darkerGrey:"#222",darkishGrey:"#333",darkGrey:"#3a3a3a",grey:"#444",brightGrey:"#666"}},150:function(e,n,t){"use strict";t.d(n,"b",function(){return l});var r=t(0),a=t.n(r),o=t(4),u=t.n(o),i=t(33),c=t.n(i);t.d(n,"a",function(){return c.a});t(151);var s=a.a.createContext({}),l=function(e){return a.a.createElement(s.Consumer,null,function(n){return e.data||n[e.query]&&n[e.query].data?(e.render||e.children)(e.data?e.data.data:n[e.query].data):a.a.createElement("div",null,"Loading (StaticQuery)")})};l.propTypes={data:u.a.object,query:u.a.string.isRequired,render:u.a.func,children:u.a.func}},151:function(e,n,t){var r;e.exports=(r=t(153))&&r.default||r},152:function(e){e.exports={data:{site:{siteMetadata:{title:"MyWebTools"}}}}},153:function(e,n,t){"use strict";t.r(n);t(34);var r=t(0),a=t.n(r),o=t(4),u=t.n(o),i=t(55),c=t(2),s=function(e){var n=e.location,t=c.default.getResourcesForPathnameSync(n.pathname);return a.a.createElement(i.a,Object.assign({location:n,pageResources:t},t.json))};s.propTypes={location:u.a.shape({pathname:u.a.string.isRequired}).isRequired},n.default=s},154:function(e,n,t){"use strict";var r=t(155),a=t(0),o=t.n(a),u=t(4),i=t.n(u),c=t(158),s=t.n(c);function l(e){var n=e.description,t=e.lang,a=e.meta,u=e.keywords,i=e.title,c=r.data.site,l=n||c.siteMetadata.description;return o.a.createElement(s.a,{htmlAttributes:{lang:t},title:i,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:l},{property:"og:title",content:i},{property:"og:description",content:l},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:l}].concat(u.length>0?{name:"keywords",content:u.join(", ")}:[]).concat(a)})}l.defaultProps={lang:"en",meta:[],keywords:[]},l.propTypes={description:i.a.string,lang:i.a.string,meta:i.a.array,keywords:i.a.arrayOf(i.a.string),title:i.a.string.isRequired},n.a=l},155:function(e){e.exports={data:{site:{siteMetadata:{title:"MyWebTools",description:"The modular web tools, started with a chat.",author:"@gatsbyjs"}}}}},156:function(e,n,t){"use strict";var r=t(152),a=t(0),o=t.n(a),u=t(4),i=t.n(u),c=t(150),s=t(146),l=function(e){var n=e.siteTitle;return o.a.createElement("header",{style:{background:s.a.black}},o.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"1.45rem 1.0875rem"}},o.a.createElement("h1",{style:{margin:0}},o.a.createElement(c.a,{to:"/",onClick:function(){return document.location.reload()},style:{color:s.a.white,textDecoration:"none"}},n))))};l.propTypes={siteTitle:i.a.string},l.defaultProps={siteTitle:""};var d=l,m=(t(157),function(e){var n=e.children;return o.a.createElement(c.b,{query:"755544856",render:function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement(d,{siteTitle:e.site.siteMetadata.title}),o.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0 0.2rem 1.45rem",paddingTop:0}},o.a.createElement("main",null,n),o.a.createElement("footer",null)))},data:r})});m.propTypes={children:i.a.node.isRequired};n.a=m}}]);
//# sourceMappingURL=component---src-pages-index-js-8f1d51b0008be3a443c4.js.map