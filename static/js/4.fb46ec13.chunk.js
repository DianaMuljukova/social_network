(this["webpackJsonpnew-app"]=this["webpackJsonpnew-app"]||[]).push([[4],{289:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__2Bsbr",dialogsItems:"Dialogs_dialogsItems__3q8XE",active:"Dialogs_active__u_O8W",dialog:"Dialogs_dialog__13ddY",messages:"Dialogs_messages___iH93",message:"Dialogs_message__2cyp0"}},294:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),i=t(124),r=t(289),o=t.n(r),c=t(20),l=function(e){return s.a.createElement("div",{className:o.a.dialog+" "+o.a.active},s.a.createElement(c.b,{to:"dialogs/".concat(e.id)},e.name))},m=function(e){return s.a.createElement("div",{className:o.a.message},e.message)},u=t(9),g=t(87),d=t(125),b=t(32),p=t(65),f=Object(p.a)(100),E=Object(d.a)({form:"dialogAddMessageForm"})((function(e){return s.a.createElement("form",{onSubmit:e.handleSubmit},s.a.createElement("div",null,s.a.createElement(g.a,{component:b.b,name:"newMessageBody",placeholder:"Enter your message",validate:[p.b,f]})),s.a.createElement("div",null,s.a.createElement("button",null,"Add message")))})),_=function(e){var a=e.dialogsPage,t=a.dialogs.map((function(e){return s.a.createElement(l,{name:e.name,id:e.id})})),n=a.messages.map((function(e){return s.a.createElement(m,{message:e.message})}));if(!e.isAuth)return s.a.createElement(u.a,{to:"/login"});return s.a.createElement("div",{className:o.a.dialogs},s.a.createElement("div",{className:o.a.dialogsItems},t),s.a.createElement("div",null,s.a.createElement("div",{className:o.a.messages},n),s.a.createElement(E,{onSubmit:function(a){e.sendMessage(a.newMessageBody)}})))},v=t(15),h=t(35),O=t(36),j=t(38),w=t(37),y=function(e){return{isAuth:e.auth.isAuth}},A=t(8);a.default=Object(A.d)(Object(v.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{sendMessage:function(a){e(Object(i.a)(a))}}})),(function(e){var a=function(a){Object(j.a)(n,a);var t=Object(w.a)(n);function n(){return Object(h.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"render",value:function(){return this.props.isAuth?s.a.createElement(e,this.props):s.a.createElement(u.a,{to:"/login"})}}]),n}(s.a.Component);return Object(v.b)(y)(a)}))(_)}}]);
//# sourceMappingURL=4.fb46ec13.chunk.js.map