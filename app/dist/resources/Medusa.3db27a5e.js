import{s as a}from"./service.541fc1e6.js";import{G as c}from"./Dashboard.4f77f1ad.js";import{_ as f,m as l,o as n,f as m,H as d,a as g,c as s,t,b as o}from"./index.f7b65c2a.js";const u={name:"Medusa",mixins:[a],props:{item:Object},components:{Generic:c},data:()=>({config:null,serverError:!1}),created:function(){this.fetchConfig()},methods:{fetchConfig:function(){this.fetch("/api/v2/config",{headers:{"X-Api-Key":this.item.apikey}}).then(e=>{this.config=e}).catch(e=>{console.log(e),this.serverError=!0})}}},_={class:"notifs"},p={key:0,class:"notif news",title:"News"},h={key:1,class:"notif warnings",title:"Warning"},y={key:2,class:"notif errors",title:"Error"},k={key:3,class:"notif errors",title:"Connection error to Medusa API, check url and apikey in config.yml"};function v(e,E,r,w,C,B){const i=l("Generic");return n(),m(i,{item:r.item},{indicator:d(()=>[g("div",_,[e.config!==null&&e.config.system.news.unread>0?(n(),s("strong",p,t(e.config.system.news.unread),1)):o("",!0),e.config!==null&&e.config.main.logs.numWarnings>0?(n(),s("strong",h,t(e.config.main.logs.numWarnings),1)):o("",!0),e.config!==null&&e.config.main.logs.numErrors>0?(n(),s("strong",y,t(e.config.main.logs.numErrors),1)):o("",!0),e.serverError?(n(),s("strong",k,"?")):o("",!0)])]),_:1},8,["item"])}const W=f(u,[["render",v],["__scopeId","data-v-0ade670a"]]);export{W as default};
