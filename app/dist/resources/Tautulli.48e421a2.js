import{s as i}from"./service.541fc1e6.js";import{G as n}from"./Dashboard.4f77f1ad.js";import{_ as m,m as l,o as s,f as _,H as u,a as d,c as a,t as f,b as r}from"./index.f7b65c2a.js";const p={name:"Tautulli",mixins:[i],props:{item:Object},components:{Generic:n},data:()=>({stats:null,error:!1}),computed:{streams:function(){return this.stats?this.stats.stream_count:""}},created(){this.fetchStatus()},methods:{fetchStatus:async function(){try{const t=await this.fetch(`/api/v2?apikey=${this.item.apikey}&cmd=get_activity`);this.error=!1,this.stats=t.response.data}catch(t){this.error=!0,console.error(t)}}}},h={class:"notifs"},y=["title"],v={key:1,class:"notif error fa-solid fa-triangle-exclamation",title:"Unable to fetch current status"};function k(t,g,o,x,b,e){const c=l("Generic");return s(),_(c,{item:o.item},{indicator:u(()=>[d("div",h,[e.streams>0?(s(),a("strong",{key:0,class:"notif playing",title:`${e.streams} active stream${e.streams>1?"s":""}`},f(e.streams),9,y)):r("",!0),t.error?(s(),a("i",v)):r("",!0)])]),_:1},8,["item"])}const S=m(p,[["render",k],["__scopeId","data-v-7da71bac"]]);export{S as default};
