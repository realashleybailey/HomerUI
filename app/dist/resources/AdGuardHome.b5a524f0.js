import{s as l}from"./service.541fc1e6.js";import{G as m}from"./Dashboard.4f77f1ad.js";import{_,m as h,o as n,f,H as i,a as c,t as s,c as o,F as r,p as d,b as p,n as b}from"./index.f7b65c2a.js";const g={name:"AdGuardHome",mixins:[l],props:{item:Object},components:{Generic:m},data:()=>({status:null,stats:null}),computed:{percentage:function(){return this.stats?(this.stats.num_blocked_filtering*100/this.stats.num_dns_queries).toFixed(2):""},protection:function(){return this.status?this.status.protection_enabled?"enabled":"disabled":"unknown"}},created:function(){this.fetchStatus(),this.item.subtitle||this.fetchStats()},methods:{fetchStatus:async function(){this.status=await this.fetch("/control/status").catch(t=>console.log(t))},fetchStats:async function(){this.stats=await this.fetch("/control/stats").catch(t=>console.log(t))}}},k={class:"title is-4"},x={class:"subtitle is-6"};function y(t,G,e,v,S,a){const u=h("Generic");return n(),f(u,{item:e.item},{content:i(()=>[c("p",k,s(e.item.name),1),c("p",x,[e.item.subtitle?(n(),o(r,{key:0},[d(s(e.item.subtitle),1)],64)):t.stats?(n(),o(r,{key:1},[d(s(a.percentage)+"% blocked ",1)],64)):p("",!0)])]),indicator:i(()=>[c("div",{class:b(["status",a.protection])},s(a.protection),3)]),_:1},8,["item"])}const H=_(g,[["render",y],["__scopeId","data-v-dcd042da"]]);export{H as default};
